import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import logo from '../assets/finallogo.png';

export default function Navbar() {
  const { connectWallet, account } = useWeb3();
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        controls.start({ y: '-100%' });
      } else {
        controls.start({ y: 0 });
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, controls]);

  return (
    <motion.nav
      className="fixed w-full z-10 bg-gradient-to-r from-[#2e0d41] to-[#430e44]"
      initial={{ y: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        
        .typewriter-font {
          font-family: 'Special Elite', cursive;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
            <motion.img
                src={logo}
                alt="Logo"
                className="h-10"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/markets">Sports Markets</NavLink>
            <NavLink to="/create">Create Prediction</NavLink>
            <NavLink to="/my-markets">My Predictions</NavLink>
            {account ? (
              <motion.span
                className="text-sm bg-[#430e44] px-4 py-2 rounded-full typewriter-font"
                whileHover={{ scale: 1.05 }}
              >
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </motion.span>
            ) : (
              <motion.button
                onClick={connectWallet}
                className="px-4 py-2 bg-[#f51454] rounded-full text-white typewriter-font"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(245, 20, 84, 0.3)' }}
              >
                Connect Wallet
              </motion.button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#f51454] focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#2e0d41]`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/markets">Sports Markets</MobileNavLink>
          <MobileNavLink to="/create">Create Prediction</MobileNavLink>
          <MobileNavLink to="/my-markets">My Predictions</MobileNavLink>
          {account ? (
            <span className="text-sm block px-3 py-2 rounded-md text-white bg-[#430e44] typewriter-font">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full text-left block px-3 py-2 rounded-md text-white bg-[#f51454] typewriter-font"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-200 hover:text-[#f51454] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 typewriter-font"
    >
      <motion.span whileHover={{ scale: 1.05 }}>{children}</motion.span>
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-200 hover:text-[#f51454] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 typewriter-font"
    >
      {children}
    </Link>
  );
}




// import { useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useWeb3 } from '../context/Web3Context';
// import logo from '../assets/finallogo.png';
// export default function Navbar() {
//   const { connectWallet, account } = useWeb3();
//   const [isOpen, setIsOpen] = useState(false);
//   const controls = useAnimation();
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY) {
//         controls.start({ y: '-100%' });
//       } else {
//         controls.start({ y: 0 });
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY, controls]);

//   return (
//     <motion.nav
//       className="fixed w-full z-10 bg-gradient-to-r from-[#2e0d41] to-[#430e44]"
//       initial={{ y: 0 }}
//       animate={controls}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0">
//               <motion.img
//                 src={logo}
//                 alt="Logo"
//                 className="h-10"
//                 whileHover={{ scale: 1.05 }}
//               />
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center space-x-6">
//             <NavLink to="/markets">Sports Markets</NavLink>
//             <NavLink to="/create">Create Prediction</NavLink>
//             <NavLink to="/my-markets">My Predictions</NavLink>
//             {account ? (
//               <motion.span
//                 className="text-sm bg-[#430e44] px-4 py-2 rounded-full typewriter-font"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Connected: {account.slice(0, 6)}...{account.slice(-4)}
//               </motion.span>
//             ) : (
//               <motion.button
//                 onClick={connectWallet}
//                 className="px-4 py-2 bg-[#f51454] rounded-full text-white typewriter-font"
//                 whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(245, 20, 84, 0.3)' }}
//               >
//                 Connect Wallet
//               </motion.button>
//             )}
//           </div>
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#f51454] focus:outline-none"
//             >
//               <svg
//                 className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               <svg
//                 className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       <motion.div
//         className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#2e0d41]`}
//         initial={{ opacity: 0, height: 0 }}
//         animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <MobileNavLink to="/markets">Sports Markets</MobileNavLink>
//           <MobileNavLink to="/create">Create Prediction</MobileNavLink>
//           <MobileNavLink to="/my-markets">My Predictions</MobileNavLink>
//           {account ? (
//             <span className="text-sm block px-3 py-2 rounded-md text-white bg-[#430e44] typewriter-font">
//               Connected: {account.slice(0, 6)}...{account.slice(-4)}
//             </span>
//           ) : (
//             <button
//               onClick={connectWallet}
//               className="w-full text-left block px-3 py-2 rounded-md text-white bg-[#f51454] typewriter-font"
//             >
//               Connect Wallet
//             </button>
//           )}
//         </div>
//       </motion.div>
//     </motion.nav>
//   );
// }

// function NavLink({ to, children }) {
//   return (
//     <Link
//       to={to}
//       className="text-gray-200 hover:text-[#f51454] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 typewriter-font"
//     >
//       <motion.span whileHover={{ scale: 1.05 }}>{children}</motion.span>
//     </Link>
//   );
// }

// function MobileNavLink({ to, children }) {
//   return (
//     <Link
//       to={to}
//       className="text-gray-200 hover:text-[#f51454] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 typewriter-font"
//     >
//       {children}
//     </Link>
//   );
// }
