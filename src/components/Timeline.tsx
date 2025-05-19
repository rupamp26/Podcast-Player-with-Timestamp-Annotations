import React, { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useAnnotations } from '../context/AnnotationContext';
import { Annotation } from '../types';
import { formatTime } from '../utils/formatters';

const Timeline: React.FC = () => {
  const { currentEpisode, currentTime, duration, seek } = usePlayer();
  const { annotations, selectAnnotation } = useAnnotations();
  const progressRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);
  const [tooltipTime, setTooltipTime] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  // Filter annotations for current episode
  const episodeAnnotations = currentEpisode 
    ? annotations.filter(a => a.episodeId === currentEpisode.id)
    : [];

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration * clickPosition, duration));
    
    seek(newTime);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(position, 1));
    
    setTooltipPosition(clampedPosition);
    setTooltipTime(duration * clampedPosition);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setTooltipPosition(null);
    }
  };

  const handleAnnotationClick = (annotation: Annotation, e: React.MouseEvent) => {
    e.stopPropagation();
    selectAnnotation(annotation.id);
    seek(annotation.timestamp);
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Calculate positions for annotations
  const getAnnotationStyle = (timestamp: number) => {
    if (!duration) return { left: '0%' };
    const position = (timestamp / duration) * 100;
    return { left: `${position}%` };
  };

  // Group annotations by type to assign colors
  const getAnnotationColor = (type: string) => {
    switch (type) {
      case 'quote': return 'bg-blue-500';
      case 'reference': return 'bg-green-500';
      case 'question': return 'bg-orange-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="w-full my-2">
      <div 
        ref={progressRef}
        className="relative h-10 bg-gray-100 rounded-full cursor-pointer group"
        onClick={handleProgressClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress bar */}
        <div 
          className="absolute h-full bg-purple-200 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Current position indicator */}
        <div 
          className="absolute top-0 h-full w-1 bg-purple-600 rounded-full transform -translate-x-1/2 z-10"
          style={{ left: `${progressPercentage}%` }}
        />
        
        {/* Annotations markers */}
        {episodeAnnotations.map(annotation => (
          <div
            key={annotation.id}
            className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white z-20 cursor-pointer hover:scale-125 transition-transform ${getAnnotationColor(annotation.type)}`}
            style={getAnnotationStyle(annotation.timestamp)}
            onClick={(e) => handleAnnotationClick(annotation, e)}
            title={annotation.text.substring(0, 40) + (annotation.text.length > 40 ? '...' : '')}
          />
        ))}
        
        {/* Tooltip */}
        {tooltipPosition !== null && (
          <div 
            className="absolute bottom-full mb-2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            style={{ left: `${tooltipPosition * 100}%` }}
          >
            {formatTime(tooltipTime)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;