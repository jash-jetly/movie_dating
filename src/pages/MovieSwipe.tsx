import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { searchMovies, getMovieDetails } from '../lib/omdb';
import GradientBackground from '../components/GradientBackground';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot?: string;
  Genre?: string;
}

export default function MovieSwipe() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await searchMovies('popular');
        const moviesWithDetails = await Promise.all(
          result.Search.slice(0, 10).map(async (movie: Movie) => {
            const details = await getMovieDetails(movie.imdbID);
            return { ...movie, Plot: details.Plot, Genre: details.Genre };
          })
        );
        setMovies(moviesWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    // Here you would typically handle the swipe logic with your backend
    setCurrentIndex(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        No more movies to show!
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.imdbID}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          >
            <img
              src={currentMovie.Poster}
              alt={currentMovie.Title}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentMovie.Title} ({currentMovie.Year})
              </h2>
              <p className="text-white/80 mb-4">{currentMovie.Plot}</p>
              <p className="text-white/60">{currentMovie.Genre}</p>
              
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleSwipe('left')}
                  className="p-4 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="p-4 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-all"
                >
                  <Heart className="w-8 h-8" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}