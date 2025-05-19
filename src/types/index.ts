export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  publishDate: string;
  imageUrl?: string;
}

export type AnnotationType = 'general' | 'quote' | 'reference' | 'question';

export interface Annotation {
  id: string;
  episodeId: string;
  timestamp: number; // in seconds
  text: string;
  type: AnnotationType;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

export type PlayerState = 'playing' | 'paused' | 'loading';

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3;