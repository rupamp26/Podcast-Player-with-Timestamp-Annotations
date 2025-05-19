import React from 'react';
import { PlayerProvider } from './context/PlayerContext';
import { AnnotationProvider } from './context/AnnotationContext';
import PodcastPlayer from './components/PodcastPlayer';
import EpisodeList from './components/EpisodeList';
import { mockPodcast } from './data/mockData';
import { Podcast, Mic2, Search, Library, BookMarked } from 'lucide-react';

function App() {
  return (
    <PlayerProvider>
      <AnnotationProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-600 rounded-xl p-2 mr-3">
                    <Podcast size={24} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    PodNote
                  </h1>
                </div>
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                  <div className="relative w-full">
                    <input
                      type="search"
                      placeholder="Search podcasts..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <nav>
                  <ul className="flex items-center space-x-6">
                    <li>
                      <a href="#" className="flex items-center text-purple-600 font-medium">
                        <Library size={18} className="mr-2" />
                        <span className="hidden sm:inline">Library</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                        <BookMarked size={18} className="mr-2" />
                        <span className="hidden sm:inline">My Notes</span>
                      </a>
                    </li>
                    <li className="hidden sm:block">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center">
                        <Mic2 size={18} className="mr-2" />
                        Subscribe
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                <PodcastPlayer />
              </div>
              
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg shadow-purple-100 p-6 transform transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-x-4 mb-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                      <img 
                        src={mockPodcast.imageUrl}
                        alt={mockPodcast.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl text-gray-900">{mockPodcast.title}</h2>
                      <p className="text-sm text-gray-500">{mockPodcast.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-4">{mockPodcast.description}</p>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center group">
                    <Mic2 size={18} className="mr-2 transform group-hover:scale-110 transition-transform" />
                    Subscribe to Podcast
                  </button>
                </div>
                
                <EpisodeList episodes={mockPodcast.episodes} />
              </div>
            </div>
          </main>
        </div>
      </AnnotationProvider>
    </PlayerProvider>
  );
}

export default App;