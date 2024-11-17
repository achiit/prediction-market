// import MarketList from '../components/MarketList';

// function Markets() {
//   return (
//     <div className="bg-gradient-to-b from-[#430e44] to-[#2e0d41] min-h-screen text-white py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8">Explore Active Markets</h1>
//         <p className="text-center mb-12 text-lg">
//           Place your bets and predict outcomes to win rewards!
//         </p>
//         <MarketList />
//       </div>
//     </div>
//   );
// }

// export default Markets;
import React from 'react';
import { motion } from 'framer-motion';
import MarketList from '../components/MarketList';

function Markets() {
  return (
    <motion.div 
      className="bg-gradient-to-b from-[#430e44] to-[#2e0d41] min-h-screen text-white py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold text-center mb-12 typewriter-font text-[#f51454]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Active Markets
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <MarketList />
        </motion.div>
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none typewriter-font"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#f51454] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Markets;