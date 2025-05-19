import { Podcast, Episode, Annotation } from '../types';

export const mockPodcast: Podcast = {
  id: '1',
  title: 'The Knowledge Project',
  author: 'Shane Parrish',
  description: "Interviews with the world's top performers in business, sports, and more.",
  imageUrl: 'https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=600',
  episodes: [
    {
      id: '101',
      podcastId: '1',
      title: '#163 James Clear: Building Better Habits',
      description: 'James Clear discusses his research on habits, decision making, and continuous improvement.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: 3725, // 1:02:05
      publishDate: '2023-02-15',
      imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '102',
      podcastId: '1',
      title: '#164 Adam Grant: Think Again',
      description: 'Organizational psychologist Adam Grant discusses the value of rethinking and mental flexibility.',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      duration: 4512, // 1:15:12
      publishDate: '2023-03-01',
      imageUrl: 'https://images.pexels.com/photos/3183159/pexels-photo-3183159.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]
};

export const mockAnnotations: Annotation[] = [
  {
    id: 'a1',
    episodeId: '101',
    timestamp: 435, // 7:15
    text: 'James explains the importance of small habits and how they compound over time.',
    type: 'general',
    createdAt: '2023-02-15T15:30:00Z',
    updatedAt: '2023-02-15T15:30:00Z',
    isPrivate: false
  },
  {
    id: 'a2',
    episodeId: '101',
    timestamp: 1256, // 20:56
    text: '"The quality of your life depends on the quality of your habits." - James Clear',
    type: 'quote',
    createdAt: '2023-02-15T15:45:00Z',
    updatedAt: '2023-02-15T15:45:00Z',
    isPrivate: false
  },
  {
    id: 'a3',
    episodeId: '101',
    timestamp: 2105, // 35:05
    text: 'Research mentioned: University of London study on habit formation and the average 66 days to form a habit.',
    type: 'reference',
    createdAt: '2023-02-15T16:10:00Z',
    updatedAt: '2023-02-15T16:12:00Z',
    isPrivate: true
  },
  {
    id: 'a4',
    episodeId: '101',
    timestamp: 3100, // 51:40
    text: 'How does habit stacking compare to traditional methods of behavior change?',
    type: 'question',
    createdAt: '2023-02-15T16:30:00Z',
    updatedAt: '2023-02-15T16:30:00Z',
    isPrivate: false
  }
];