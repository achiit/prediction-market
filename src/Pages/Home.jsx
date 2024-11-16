
// import Hero from '../components/Hero';

// function Home() {
//   return (
//     <div>
//       <Hero />
//       <div className="bg-[#430e44] text-white py-20">
//         <div className="max-w-5xl mx-auto text-center space-y-8">
//           <h2 className="text-4xl font-bold">Why Choose Prediction World?</h2>
//           <p className="text-lg">
//             Our platform offers fair, transparent, and exciting prediction markets powered by blockchain.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Decentralized</h3>
//               <p>All markets are secured by smart contracts.</p>
//             </div>
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Profitable</h3>
//               <p>Earn big with accurate predictions.</p>
//             </div>
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Fair</h3>
//               <p>No hidden fees, no middlemen.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import { motion } from 'framer-motion';
import Hero from '../components/Hero';

export default function Component() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#2e0d41] via-[#430e44] to-[#2e0d41]"
    >
      <Hero />
      <motion.div
        className="max-w-7xl mx-auto px-4 py-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-[#f51454] mb-8 typewriter-font">Featured Markets</h2>
        {/* Add your featured markets content here */}
      </motion.div>
    </motion.div>
  );
}