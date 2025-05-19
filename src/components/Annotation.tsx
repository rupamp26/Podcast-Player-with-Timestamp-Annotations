import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useAnnotations } from '../context/AnnotationContext';
import { Annotation as AnnotationType } from '../types';
import { formatTime } from '../utils/formatters';
import { Clock, Edit2, Trash2, Share2, Eye, EyeOff, Check, X } from 'lucide-react';

interface AnnotationProps {
  annotation: AnnotationType;
  isSelected: boolean;
}

const Annotation: React.FC<AnnotationProps> = ({ annotation, isSelected }) => {
  const { seek } = usePlayer();
  const { updateAnnotation, deleteAnnotation } = useAnnotations();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(annotation.text);
  const [editType, setEditType] = useState(annotation.type);
  const [editIsPrivate, setEditIsPrivate] = useState(annotation.isPrivate);

  const handleGoToTimestamp = () => {
    seek(annotation.timestamp);
  };

  const handleEdit = () => {
    setEditText(annotation.text);
    setEditType(annotation.type);
    setEditIsPrivate(annotation.isPrivate);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this annotation?')) {
      deleteAnnotation(annotation.id);
    }
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    alert(`Shareable link for this timestamp: example.com/podcast/${annotation.episodeId}?t=${annotation.timestamp}`);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateAnnotation(annotation.id, {
        text: editText,
        type: editType,
        isPrivate: editIsPrivate
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const getTypeStyle = () => {
    switch (annotation.type) {
      case 'quote':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reference':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'question':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const annotationTypes = [
    { value: 'general', label: 'General' },
    { value: 'quote', label: 'Quote' },
    { value: 'reference', label: 'Reference' },
    { value: 'question', label: 'Question' }
  ];

  return (
    <div 
      className={`p-3 rounded-lg mb-3 transition-colors ${
        isSelected 
          ? 'bg-purple-50 border-2 border-purple-400' 
          : 'bg-white border border-gray-200 hover:border-purple-200'
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value as any)}
              className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {annotationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Note</label>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`private-${annotation.id}`}
              checked={editIsPrivate}
              onChange={(e) => setEditIsPrivate(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor={`private-${annotation.id}`} className="ml-2 block text-xs text-gray-700">
              Private note
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancelEdit}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              <X size={14} className="mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              <Check size={14} className="mr-1" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyle()}`}>
                {annotation.type.charAt(0).toUpperCase() + annotation.type.slice(1)}
              </span>
              {annotation.isPrivate && (
                <span className="ml-2 flex items-center text-xs text-gray-500">
                  <EyeOff size={12} className="mr-1" />
                  Private
                </span>
              )}
            </div>
            <button
              onClick={handleGoToTimestamp}
              className="flex items-center text-xs text-gray-500 hover:text-purple-600"
            >
              <Clock size={12} className="mr-1" />
              {formatTime(annotation.timestamp)}
            </button>
          </div>
          
          <p className="text-sm text-gray-800 mb-3">{annotation.text}</p>
          
          <div className="flex justify-end gap-x-2">
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Edit annotation"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-600"
              aria-label="Delete annotation"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-blue-600"
              aria-label="Share annotation"
            >
              <Share2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Annotation;