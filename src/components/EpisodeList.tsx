import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Episode } from '../types';
import { formatTime, formatDate } from '../utils/formatters';
import { Clock, PlayCircle } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  const { playEpisode, currentEpisode, playerState } = usePlayer();
  
  const handlePlayEpisode = (episode: Episode) => {
    playEpisode(episode);
  };

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg text-gray-900 mb-3">Episodes</h2>
      {episodes.length === 0 ? (
        <p className="text-gray-500 italic">No episodes available</p>
      ) : (
        episodes.map(episode => (
          <div 
            key={episode.id}
            className={`flex gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
              currentEpisode?.id === episode.id
                ? 'bg-purple-50 border-purple-200'
                : 'bg-white border-gray-200 hover:border-purple-200'
            }`}
            onClick={() => handlePlayEpisode(episode)}
          >
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <img 
                src={episode.imageUrl || 'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                alt={episode.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{episode.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{formatDate(episode.publishDate)}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                <span>{formatTime(episode.duration)}</span>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className={`flex items-center justify-center ${
                  currentEpisode?.id === episode.id && playerState === 'playing'
                    ? 'text-purple-600'
                    : 'text-gray-400 hover:text-purple-600'
                }`}
                aria-label={`Play ${episode.title}`}
              >
                <PlayCircle size={28} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EpisodeList;