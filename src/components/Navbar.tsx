import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 w-full px-6 py-4 flex justify-between items-center z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <Film className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold text-white">CinematicHearts</span>
      </div>
      <button className="px-6 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all">
        Login
      </button>
    </motion.nav>
  );
}