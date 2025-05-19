import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useAnnotations } from '../context/AnnotationContext';
import Annotation from './Annotation';
import CreateAnnotation from './CreateAnnotation';
import { Plus, ChevronRight, ChevronLeft, Clock, FilterX } from 'lucide-react';

const AnnotationPanel: React.FC = () => {
  const { currentEpisode, isAnnotationPanelOpen, toggleAnnotationPanel } = usePlayer();
  const { annotations, selectedAnnotation } = useAnnotations();
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);

  if (!isAnnotationPanelOpen) {
    return (
      <button
        onClick={toggleAnnotationPanel}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-l-lg p-2 shadow-md hover:bg-gray-50"
        aria-label="Open annotation panel"
      >
        <ChevronLeft size={20} />
      </button>
    );
  }

  if (!currentEpisode) {
    return (
      <div className="flex flex-col h-full bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
          <button
            onClick={toggleAnnotationPanel}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close annotation panel"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <p className="text-gray-500 italic text-center my-8">Select an episode to start taking notes</p>
      </div>
    );
  }

  // Filter annotations for current episode
  const episodeAnnotations = annotations.filter(a => a.episodeId === currentEpisode.id);
  
  // Apply type filter if set
  const filteredAnnotations = filterType
    ? episodeAnnotations.filter(a => a.type === filterType)
    : episodeAnnotations;

  // Sort annotations by timestamp
  const sortedAnnotations = [...filteredAnnotations].sort((a, b) => a.timestamp - b.timestamp);

  const handleCreateAnnotation = () => {
    setIsCreating(true);
  };

  const handleCloseCreate = () => {
    setIsCreating(false);
  };

  const handleFilterChange = (type: string | null) => {
    setFilterType(prevType => prevType === type ? null : type);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
        <div className="flex items-center">
          <button
            onClick={handleCreateAnnotation}
            className="mr-2 text-white bg-purple-600 hover:bg-purple-700 rounded-full p-1.5 transition-colors"
            aria-label="Add annotation"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={toggleAnnotationPanel}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close annotation panel"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {isCreating ? (
        <div className="p-4">
          <CreateAnnotation onClose={handleCloseCreate} />
        </div>
      ) : (
        <>
          {episodeAnnotations.length > 0 && (
            <div className="px-4 py-2 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Filter by type:</span>
                <button
                  onClick={() => setFilterType(null)}
                  className={`text-xs text-gray-500 hover:text-gray-700 ${!filterType ? 'hidden' : ''}`}
                >
                  <FilterX size={14} className="inline mr-1" />
                  Clear
                </button>
              </div>
              <div className="flex gap-x-2 mt-2 overflow-x-auto pb-1">
                <button
                  onClick={() => handleFilterChange('general')}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filterType === 'general' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => handleFilterChange('quote')}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filterType === 'quote' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  Quote
                </button>
                <button
                  onClick={() => handleFilterChange('reference')}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filterType === 'reference' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Reference
                </button>
                <button
                  onClick={() => handleFilterChange('question')}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filterType === 'question' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                >
                  Question
                </button>
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto p-4">
            {sortedAnnotations.length > 0 ? (
              sortedAnnotations.map(annotation => (
                <Annotation 
                  key={annotation.id} 
                  annotation={annotation} 
                  isSelected={selectedAnnotation?.id === annotation.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="text-gray-400 mb-2">
                  <Clock size={32} className="mx-auto mb-2" />
                </div>
                <p className="text-gray-500 mb-2">No notes yet</p>
                <p className="text-xs text-gray-400 mb-4">
                  {episodeAnnotations.length > 0 
                    ? 'No notes match your current filter' 
                    : 'Create your first note by clicking the + button'}
                </p>
                {episodeAnnotations.length === 0 && (
                  <button
                    onClick={handleCreateAnnotation}
                    className="text-sm px-3 py-1.5 text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                  >
                    Add a note
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AnnotationPanel;