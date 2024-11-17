// function Footer() {
//     return (
//       <footer className="bg-[#2e0d41] text-white py-6 text-center">
//         <p>
//           © {new Date().getFullYear()} Prediction World. All rights reserved.
//         </p>
//       </footer>
//     );
//   }
  
//   export default Footer;
import { motion } from 'framer-motion';

export default function Component() {
  return (
    <motion.footer
      className="bg-[#2e0d41] text-white py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.p
          className="text-gray-300 typewriter-font"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          © {new Date().getFullYear()} Prediction World. All rights reserved.
        </motion.p>
        <motion.div
          className="mt-4 flex justify-center space-x-6 typewriter-font"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="#" className="text-gray-300 hover:text-[#f51454] transition-colors duration-300 typewriter-font">
            Terms of Service
          </a>
          <a href="#" className="text-gray-300 hover:text-[#f51454] transition-colors duration-300 typewriter-font">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-300 hover:text-[#f51454] transition-colors duration-300 typewriter-font">
            Contact Us
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
}