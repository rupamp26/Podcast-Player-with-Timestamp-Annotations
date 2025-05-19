import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useAnnotations } from '../context/AnnotationContext';
import { AnnotationType } from '../types';
import { formatTime } from '../utils/formatters';
import { MessageSquarePlus, X } from 'lucide-react';

interface CreateAnnotationProps {
  onClose: () => void;
}

const CreateAnnotation: React.FC<CreateAnnotationProps> = ({ onClose }) => {
  const { currentEpisode, currentTime, seek } = usePlayer();
  const { addAnnotation } = useAnnotations();
  const [text, setText] = useState('');
  const [type, setType] = useState<AnnotationType>('general');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!currentEpisode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    addAnnotation(
      currentEpisode.id,
      currentTime,
      text,
      type
    );
    
    // Reset form
    setText('');
    setType('general');
    setIsPrivate(false);
    
    onClose();
  };

  const annotationTypes: { value: AnnotationType; label: string }[] = [
    { value: 'general', label: 'General' },
    { value: 'quote', label: 'Quote' },
    { value: 'reference', label: 'Reference' },
    { value: 'question', label: 'Question' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">New Annotation</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex items-center gap-x-2 mb-4 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
        <span className="font-medium">Timestamp:</span>
        <span>{formatTime(currentTime)}</span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="annotation-type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="annotation-type"
            value={type}
            onChange={(e) => setType(e.target.value as AnnotationType)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {annotationTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="annotation-text" className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            id="annotation-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add your note here..."
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="is-private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="is-private" className="ml-2 block text-sm text-gray-700">
            Private note (only visible to you)
          </label>
        </div>
        
        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-x-1"
          >
            <MessageSquarePlus size={16} />
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnotation;