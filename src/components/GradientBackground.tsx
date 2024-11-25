import { motion } from 'framer-motion';

export default function GradientBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFB7B2] via-[#A2D8B6] to-[#FFDAC1]">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FF6F61]/30 to-transparent" />
      </div>
    </motion.div>
  );
}