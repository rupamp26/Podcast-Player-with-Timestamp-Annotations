import React, { createContext, useContext, useState, useCallback } from 'react';
import { Annotation, AnnotationType } from '../types';
import { mockAnnotations } from '../data/mockData';

interface AnnotationContextType {
  annotations: Annotation[];
  selectedAnnotation: Annotation | null;
  addAnnotation: (episodeId: string, timestamp: number, text: string, type: AnnotationType) => void;
  updateAnnotation: (id: string, updates: Partial<Omit<Annotation, 'id' | 'episodeId' | 'createdAt'>>) => void;
  deleteAnnotation: (id: string) => void;
  selectAnnotation: (id: string | null) => void;
  getAnnotationsForTimestamp: (episodeId: string, timestamp: number, rangeInSeconds: number) => Annotation[];
}

const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

export const AnnotationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>(mockAnnotations);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);

  const addAnnotation = useCallback((episodeId: string, timestamp: number, text: string, type: AnnotationType) => {
    const newAnnotation: Annotation = {
      id: `a${Date.now()}`,
      episodeId,
      timestamp,
      text,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPrivate: false
    };

    setAnnotations(prev => [...prev, newAnnotation]);
    return newAnnotation;
  }, []);

  const updateAnnotation = useCallback((id: string, updates: Partial<Omit<Annotation, 'id' | 'episodeId' | 'createdAt'>>) => {
    setAnnotations(prev => 
      prev.map(annotation => 
        annotation.id === id 
          ? { 
              ...annotation, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : annotation
      )
    );
  }, []);

  const deleteAnnotation = useCallback((id: string) => {
    setAnnotations(prev => prev.filter(annotation => annotation.id !== id));
    if (selectedAnnotation?.id === id) {
      setSelectedAnnotation(null);
    }
  }, [selectedAnnotation]);

  const selectAnnotation = useCallback((id: string | null) => {
    if (id === null) {
      setSelectedAnnotation(null);
      return;
    }
    
    const annotation = annotations.find(a => a.id === id) || null;
    setSelectedAnnotation(annotation);
  }, [annotations]);

  const getAnnotationsForTimestamp = useCallback(
    (episodeId: string, timestamp: number, rangeInSeconds: number = 0) => {
      return annotations.filter(
        a => 
          a.episodeId === episodeId && 
          (rangeInSeconds === 0 
            ? a.timestamp === timestamp
            : Math.abs(a.timestamp - timestamp) <= rangeInSeconds)
      );
    }, 
    [annotations]
  );

  return (
    <AnnotationContext.Provider
      value={{
        annotations,
        selectedAnnotation,
        addAnnotation,
        updateAnnotation,
        deleteAnnotation,
        selectAnnotation,
        getAnnotationsForTimestamp
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotations = () => {
  const context = useContext(AnnotationContext);
  if (context === undefined) {
    throw new Error('useAnnotations must be used within an AnnotationProvider');
  }
  return context;
};