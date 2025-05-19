import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Settings } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { PlaybackSpeed } from '../types';
import { formatTime } from '../utils/formatters';

const Controls: React.FC = () => {
  const { 
    playerState, 
    togglePlayPause, 
    skipBackward, 
    skipForward, 
    currentTime, 
    duration,
    volume,
    setVolume,
    playbackSpeed,
    setPlaybackSpeed
  } = usePlayer();

  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  
  const playbackSpeeds: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

  const toggleSpeedMenu = () => {
    setShowSpeedMenu(!showSpeedMenu);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">{formatTime(currentTime)}</div>
        <div className="flex items-center gap-x-6">
          <button 
            className="text-gray-700 hover:text-purple-600 transition-colors"
            onClick={skipBackward}
            aria-label="Skip backward 15 seconds"
          >
            <SkipBack size={24} />
          </button>
          
          <button
            className={`rounded-full p-2 ${
              playerState === 'playing' 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            } transition-all`}
            onClick={togglePlayPause}
            aria-label={playerState === 'playing' ? 'Pause' : 'Play'}
          >
            {playerState === 'playing' ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            className="text-gray-700 hover:text-purple-600 transition-colors"
            onClick={skipForward}
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward size={24} />
          </button>
        </div>
        <div className="text-xs text-gray-500">{formatTime(duration)}</div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        {/* Volume control */}
        <div className="flex items-center gap-x-2 w-1/3">
          <button className="text-gray-600">{getVolumeIcon()}</button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            aria-label="Volume"
          />
        </div>
        
        {/* Playback speed */}
        <div className="relative">
          <button 
            onClick={toggleSpeedMenu}
            className="text-xs font-medium px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors flex items-center gap-x-1"
            aria-label="Playback speed"
            aria-expanded={showSpeedMenu}
          >
            <Settings size={14} />
            {playbackSpeed}x
          </button>
          
          {showSpeedMenu && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-md py-1 z-10 w-24">
              {playbackSpeeds.map(speed => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    setShowSpeedMenu(false);
                  }}
                  className={`w-full text-left px-4 py-1 text-xs ${
                    speed === playbackSpeed ? 'text-purple-600 font-medium' : 'text-gray-700'
                  } hover:bg-gray-100`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;