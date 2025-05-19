import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import Controls from './Controls';
import Timeline from './Timeline';
import PodcastInfo from './PodcastInfo';
import AnnotationPanel from './AnnotationPanel';
import { Headphones } from 'lucide-react';

const PodcastPlayer: React.FC = () => {
  const { currentEpisode, isAnnotationPanelOpen } = usePlayer();
  
  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      <div className={`flex flex-col ${isAnnotationPanelOpen ? 'md:w-2/3' : 'w-full'}`}>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {!currentEpisode ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Headphones size={64} className="text-purple-200 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to listen</h2>
              <p className="text-gray-500 text-center">
                Select an episode from the list below to start playing
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <PodcastInfo />
              </div>
              <div className="mb-4">
                <Timeline />
              </div>
              <Controls />
            </>
          )}
        </div>
      </div>
      
      {isAnnotationPanelOpen && (
        <div className="md:w-1/3">
          <AnnotationPanel />
        </div>
      )}
    </div>
  );
};

export default PodcastPlayer;