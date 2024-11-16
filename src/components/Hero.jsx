import { motion } from 'framer-motion';

function Hero() {
  return (
    <div className="bg-gradient-to-b from-[#2e0d41] to-[#430e44] text-white text-center py-20">
      <motion.h1
        className="text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Prediction World
      </motion.h1>
      <p className="text-xl mb-8">
        Predict the future, place your bets, and win rewards.
      </p>
      <motion.a
        href="/markets"
        className="px-8 py-3 bg-[#f51454] rounded-full text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        Explore Markets
      </motion.a>
    </div>
  );
}

export default Hero;
