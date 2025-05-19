import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatDate } from '../utils/formatters';

const PodcastInfo: React.FC = () => {
  const { currentEpisode } = usePlayer();

  if (!currentEpisode) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
        <p className="text-gray-500 italic">Select an episode to start listening</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={currentEpisode.imageUrl || 'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={currentEpisode.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{currentEpisode.title}</h2>
      <p className="text-sm text-gray-500 mb-3">{formatDate(currentEpisode.publishDate)}</p>
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">{currentEpisode.description}</p>
    </div>
  );
};

export default PodcastInfo;