import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import GradientBackground from '../components/GradientBackground';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { updateProfile, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    favoriteGenres: [] as string[],
    bio: ''
  });

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate('/swipe');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Complete Your Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-4">Favorite Movie Genres</label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.favoriteGenres.includes(genre)
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 h-32 resize-none"
                placeholder="Tell us about yourself and your movie preferences..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-white/90 transition-all"
            >
              {loading ? 'Saving...' : 'Complete Profile'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}