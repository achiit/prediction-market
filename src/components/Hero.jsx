'use client'

import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

// Import images
import footballImage from '../assets/football.jpg';
import tennisImage from '../assets/tennis.jpg';
import baseballImage from '../assets/baseball.jpg';

export default function Hero() {
  const [currentSport, setCurrentSport] = useState(0);
  const sports = ['Football', 'Tennis', 'Baseball'];
  const sportImages = [
    footballImage,
    tennisImage,
    baseballImage
  ];

  const floatingIcons = [
    { Icon: TrendingUp, delay: 0 },
    { Icon: Award, delay: 0.5 },
    { Icon: Zap, delay: 1 },
    { Icon: DollarSign, delay: 1.5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSport((prevSport) => (prevSport + 1) % sports.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#2e0d41] to-[#430e44] text-white text-center py-32 pt-40">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(245, 20, 84, 0.1) 2px, rgba(245, 20, 84, 0.1) 3px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 typewriter-font">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-6 text-[#f51454] typewriter-font"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Sports Prediction World
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-gray-200 typewriter-font"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Predict sports outcomes, place your bets, and win big rewards. Be the underdog!
        </motion.p>
        <motion.a
          href="/markets"
          className="px-8 py-3 bg-[#f51454] rounded-full text-white shadow-lg inline-block typewriter-font"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(245, 20, 84, 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          Explore Sports Markets
        </motion.a>

        <div className="mt-16 relative">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {floatingIcons.map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{ x: -100, y: Math.random() * 100 - 50, opacity: 0 }}
                animate={{ 
                  x: ['0%', '100%'],
                  y: [
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                  ],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  x: { duration: 20, repeat: Infinity, repeatType: 'loop' },
                  y: { duration: 10, repeat: Infinity, repeatType: 'reverse' },
                  opacity: { duration: 20, repeat: Infinity, repeatType: 'loop' },
                  delay: delay
                }}
              >
                <Icon size={48} className="text-[#f51454]" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {[
              { title: 'Predict', description: 'Use your sports knowledge to forecast outcomes' },
              { title: 'Bet', description: 'Place bets on your favorite teams and athletes' },
              { title: 'Win', description: 'Earn rewards for accurate sports predictions' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#2e0d41] p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2 text-[#f51454]">{item.title}</h2>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 relative overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.img
            src={sportImages[currentSport]}
            alt={sports[currentSport]}
            className="w-full h-64 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <motion.h2
            className="absolute bottom-4 left-4 text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {sports[currentSport]}
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}