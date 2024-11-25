import { motion } from 'framer-motion';
import { Film, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import GradientBackground from '../components/GradientBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <Background3D />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Film className="w-12 h-12 text-white" />
            <Heart className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
            CinematicHearts
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto text-shadow">
            Find your perfect match through the magic of movies. Swipe, match, and fall in love with someone who shares your cinematic taste.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
            >
              Create Account
            </Link>
            
            <Link
              to="/login"
              className="px-8 py-3 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 font-semibold hover:bg-white/30 transition-all transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}