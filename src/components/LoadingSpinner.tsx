import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}