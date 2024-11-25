import { motion } from 'framer-motion';
import AuthForm from '../components/auth/AuthForm';
import GradientBackground from '../components/GradientBackground';

export default function Register() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AuthForm type="register" />
        </motion.div>
      </div>
    </div>
  );
}