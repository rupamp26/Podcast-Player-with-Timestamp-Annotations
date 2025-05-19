import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PlayerState, PlaybackSpeed, Episode } from '../types';

interface PlayerContextType {
  currentEpisode: Episode | null;
  playerState: PlayerState;
  duration: number;
  currentTime: number;
  volume: number;
  playbackSpeed: PlaybackSpeed;
  isAnnotationPanelOpen: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  playEpisode: (episode: Episode) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  setVolume: (value: number) => void;
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;
  toggleAnnotationPanel: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('paused');
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeedState] = useState<PlaybackSpeed>(1);
  const [isAnnotationPanelOpen, setIsAnnotationPanelOpen] = useState<boolean>(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setPlayerState('playing');
    const handlePause = () => setPlayerState('paused');
    const handleEnded = () => {
      setPlayerState('paused');
      setCurrentTime(0);
    };
    const handleLoadStart = () => setPlayerState('loading');
    const handleCanPlay = () => {
      if (playerState === 'loading') {
        setPlayerState('paused');
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [playerState]);

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setPlayerState('loading');
    
    // Need to wait for the next render cycle for audioRef to update
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setPlayerState('playing'))
          .catch(error => {
            console.error('Error playing audio:', error);
            setPlayerState('paused');
          });
      }
    }, 0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (playerState === 'playing') {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(error => console.error('Error playing audio:', error));
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 15;
  };

  const setVolume = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value;
    setVolumeState(value);
  };

  const setPlaybackSpeed = (speed: PlaybackSpeed) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    setPlaybackSpeedState(speed);
  };

  const toggleAnnotationPanel = () => {
    setIsAnnotationPanelOpen(prev => !prev);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        playerState,
        duration,
        currentTime,
        volume,
        playbackSpeed,
        isAnnotationPanelOpen,
        audioRef,
        playEpisode,
        togglePlayPause,
        seek,
        skipForward,
        skipBackward,
        setVolume,
        setPlaybackSpeed,
        toggleAnnotationPanel
      }}
    >
      {children}
      <audio ref={audioRef} src={currentEpisode?.audioUrl} preload="metadata" />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};