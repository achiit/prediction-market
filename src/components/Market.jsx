// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';

// function Market({ marketId, marketData }) {
//   const { contract, account } = useWeb3();
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const [betAmount, setBetAmount] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const [question, endTime, totalLiquidity, yesPool, noPool, creator, resolved, cancelled] = marketData;

//   const updateTimeRemaining = () => {
//     const now = Math.floor(Date.now() / 1000);
//     setTimeRemaining(Math.max(0, endTime - now));
//   };

//   useEffect(() => {
//     updateTimeRemaining();
//     const interval = setInterval(updateTimeRemaining, 1000);
//     return () => clearInterval(interval);
//   }, [endTime]);

//   const handleTakePosition = async (isYes) => {
//     if (!betAmount || Number(betAmount) <= 0) {
//       alert('Enter a valid bet amount.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const tx = await contract.takePosition(marketId, isYes, {
//         value: ethers.utils.parseEther(betAmount),
//       });
//       await tx.wait();
//       alert(`Successfully placed ${isYes ? 'Yes' : 'No'} bet.`);
//     } catch (error) {
//       console.error(`Error placing ${isYes ? 'Yes' : 'No'} bet:`, error);
//       alert('Failed to place bet.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResolveMarket = async (outcome) => {
//     if (account.toLowerCase() !== creator.toLowerCase()) {
//       alert('Only the creator can resolve this market.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const tx = await contract.resolveMarket(marketId, outcome);
//       await tx.wait();
//       alert('Market resolved successfully!');
//     } catch (error) {
//       console.error('Error resolving market:', error);
//       alert('Failed to resolve market.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClaimPayout = async () => {
//     setIsLoading(true);
//     try {
//       const tx = await contract.claimPayout(marketId);
//       await tx.wait();
//       alert('Payout claimed successfully!');
//     } catch (error) {
//       console.error('Error claiming payout:', error);
//       alert('Failed to claim payout.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6 space-y-4">
//       <h3 className="text-lg font-bold">{question}</h3>
//       <p>Total Liquidity: {ethers.utils.formatEther(totalLiquidity)} ETH</p>
//       <p>Yes Pool: {ethers.utils.formatEther(yesPool)} ETH</p>
//       <p>No Pool: {ethers.utils.formatEther(noPool)} ETH</p>
//       <p>
//         Ends in: {timeRemaining > 0 ? `${timeRemaining} seconds` : 'Expired'}
//       </p>

//       {!resolved && !cancelled && timeRemaining > 0 ? (
//         <div className="space-y-4">
//           <input
//             type="number"
//             className="input-field"
//             placeholder="Bet Amount (ETH)"
//             value={betAmount}
//             onChange={(e) => setBetAmount(e.target.value)}
//           />
//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleTakePosition(true)}
//               disabled={isLoading}
//               className="btn-success"
//             >
//               Bet Yes
//             </button>
//             <button
//               onClick={() => handleTakePosition(false)}
//               disabled={isLoading}
//               className="btn-danger"
//             >
//               Bet No
//             </button>
//           </div>
//         </div>
//       ) : resolved ? (
//         <button
//           onClick={handleClaimPayout}
//           disabled={isLoading}
//           className="btn-primary"
//         >
//           Claim Payout
//         </button>
//       ) : timeRemaining === 0 && account.toLowerCase() === creator.toLowerCase() ? (
//         <div className="space-x-4">
//           <button
//             onClick={() => handleResolveMarket(true)}
//             disabled={isLoading}
//             className="btn-success"
//           >
//             Resolve Yes
//           </button>
//           <button
//             onClick={() => handleResolveMarket(false)}
//             disabled={isLoading}
//             className="btn-danger"
//           >
//             Resolve No
//           </button>
//         </div>
//       ) : (
//         <p>Market not yet ready for resolution.</p>
//       )}
//     </div>
//   );
// }

// export default Market;
// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';
// import { Wallet, TrendingUp, Clock, DollarSign } from 'lucide-react';

// const Market = ({ marketId, marketData }) => {
//   const { contract, account } = useWeb3();
//   const [betAmount, setBetAmount] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [question, endTime, yesPool, noPool, creator, resolved] = marketData;

//   const totalPool = parseFloat(ethers.utils.formatEther(yesPool)) + 
//                    parseFloat(ethers.utils.formatEther(noPool));
//   const yesPercentage = (parseFloat(ethers.utils.formatEther(yesPool)) / totalPool * 100) || 0;
//   const noPercentage = (parseFloat(ethers.utils.formatEther(noPool)) / totalPool * 100) || 0;

//   const handleBet = async (isYes) => {
//     if (!contract || !account) {
//       alert('Please connect your wallet first');
//       return;
//     }
//     if (!betAmount || Number(betAmount) <= 0) {
//       alert('Please enter a valid bet amount');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const tx = await contract.takePosition(marketId, isYes, {
//         value: ethers.utils.parseEther(betAmount),
//       });
//       await tx.wait();
//       alert(`Successfully placed ${isYes ? 'Yes' : 'No'} bet!`);
//       setBetAmount('');
//     } catch (error) {
//       console.error('Error placing bet:', error);
//       alert('Failed to place bet. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#1c2237] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-800">
//       <div className="p-6">
//         <div className="flex items-start justify-between gap-4 mb-4">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-white mb-2">{question}</h3>
//             <div className="flex items-center gap-2 text-gray-400 text-sm">
//               <Clock size={16} />
//               <span>Ends {new Date(endTime * 1000).toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative h-4 bg-gray-700 rounded-full mb-6">
//           <div
//             className="absolute left-0 h-full bg-green-500 rounded-l-full"
//             style={{ width: `${yesPercentage}%` }}
//           />
//           <div
//             className="absolute right-0 h-full bg-red-500 rounded-r-full"
//             style={{ width: `${noPercentage}%` }}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="bg-[#2a3347] p-4 rounded-lg">
//             <div className="text-green-500 font-bold mb-1">Yes</div>
//             <div className="text-white text-lg font-bold">{yesPercentage.toFixed(1)}%</div>
//             <div className="text-gray-400 text-sm">
//               {parseFloat(ethers.utils.formatEther(yesPool)).toFixed(3)} ETH
//             </div>
//           </div>
//           <div className="bg-[#2a3347] p-4 rounded-lg">
//             <div className="text-red-500 font-bold mb-1">No</div>
//             <div className="text-white text-lg font-bold">{noPercentage.toFixed(1)}%</div>
//             <div className="text-gray-400 text-sm">
//               {parseFloat(ethers.utils.formatEther(noPool)).toFixed(3)} ETH
//             </div>
//           </div>
//         </div>

//         {isExpanded && (
//           <div className="space-y-4 mt-4">
//             <div className="flex items-center gap-2 bg-[#2a3347] p-3 rounded-lg">
//               <DollarSign size={20} className="text-gray-400" />
//               <input
//                 type="number"
//                 className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0"
//                 placeholder="Enter bet amount (ETH)"
//                 value={betAmount}
//                 onChange={(e) => setBetAmount(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => handleBet(true)}
//                 disabled={isLoading}
//                 className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors"
//               >
//                 Bet Yes
//               </button>
//               <button
//                 onClick={() => handleBet(false)}
//                 disabled={isLoading}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
//               >
//                 Bet No
//               </button>
//             </div>
//           </div>
//         )}

//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
//         >
//           {isExpanded ? '← Close' : 'Trade →'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Market;


// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';

// function Market({ marketId, marketData }) {
//   const { contract } = useWeb3();
//   const [betAmount, setBetAmount] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     question,
//     endTime,
//     totalLiquidity,
//     yesPool,
//     noPool,
//     creator,
//     resolved,
//     cancelled,
//   } = marketData;

//   // Convert Wei values to readable CHZ format
//   const formatToCHZ = (weiValue) => `${ethers.utils.formatEther(weiValue)} CHZ`;

//   const placeBet = async (isYes) => {
//     if (!betAmount || Number(betAmount) <= 0) {
//       alert('Enter a valid bet amount');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const tx = await contract.takePosition(marketId, isYes, {
//         value: ethers.utils.parseEther(betAmount),
//       });
//       await tx.wait();
//       alert('Bet placed successfully');
//     } catch (error) {
//       console.error('Error placing bet:', error);
//       alert('Failed to place bet');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-[#1c2237] rounded-lg shadow-lg">
//       <h3 className="text-xl font-bold text-white mb-2">{question}</h3>
//       <p className="text-gray-400 mb-4">
//         End Time: {new Date(endTime * 1000).toLocaleString()}
//       </p>
//       <p className="text-gray-400 mb-4">
//         Liquidity: {formatToCHZ(totalLiquidity)}
//       </p>
//       <div className="flex justify-between mb-4">
//         <div className="text-green-400">Yes: {formatToCHZ(yesPool)}</div>
//         <div className="text-red-400">No: {formatToCHZ(noPool)}</div>
//       </div>

//       {!resolved && !cancelled && (
//         <div>
//           <input
//             type="number"
//             placeholder="Enter bet amount (CHZ)"
//             value={betAmount}
//             onChange={(e) => setBetAmount(e.target.value)}
//             className="input-field"
//           />
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={() => placeBet(true)}
//               className="btn-primary"
//               disabled={isLoading}
//             >
//               Bet Yes
//             </button>
//             <button
//               onClick={() => placeBet(false)}
//               className="btn-primary"
//               disabled={isLoading}
//             >
//               Bet No
//             </button>
//           </div>
//         </div>
//       )}

//       {resolved && <p className="text-green-400 mt-4">Market Resolved</p>}
//       {cancelled && <p className="text-red-400 mt-4">Market Cancelled</p>}
//     </div>
//   );
// }

// export default Market;


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { motion } from 'framer-motion';

function Market({ marketId, marketData }) {
  const { contract, account } = useWeb3();
  const [betAmount, setBetAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);

  const {
    question,
    endTime,
    totalLiquidity,
    yesPool,
    noPool,
    creator,
    resolved,
    cancelled,
  } = marketData;

  const formatToCHZ = (weiValue) => `${ethers.utils.formatEther(weiValue)} CHZ`;

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        setTimeLeft('Market Closed');
      } else {
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const placeBet = async (isYes) => {
    if (!betAmount || Number(betAmount) <= 0) {
      alert('Enter a valid bet amount');
      return;
    }

    try {
      setIsLoading(true);
      const tx = await contract.takePosition(marketId, isYes, {
        value: ethers.utils.parseEther(betAmount),
      });
      await tx.wait();
      alert('Bet placed successfully');
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet');
    } finally {
      setIsLoading(false);
    }
  };

  const claimPoints = async () => {
    try {
      setIsClaiming(true);
      const tx = await contract.claimPayout(marketId);
      await tx.wait();
      alert('Payout claimed successfully!');
    } catch (error) {
      console.error('Error claiming payout:', error);
      alert('Failed to claim payout');
    } finally {
      setIsClaiming(false);
    }
  };

  const isMarketActive = !resolved && !cancelled && timeLeft !== 'Market Closed';

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-[#2e0d41] to-[#430e44] rounded-lg shadow-lg border border-[#f51454] overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#f51454] transform rotate-45 translate-x-8 -translate-y-8"></div>
      <h3 className="text-xl font-bold text-[#f51454] mb-2 typewriter-font">{question}</h3>
      <p className="text-gray-300 mb-2 typewriter-font">End Time: {new Date(endTime * 1000).toLocaleString()}</p>
      <p className="text-gray-300 mb-2 typewriter-font">Liquidity: {formatToCHZ(totalLiquidity)}</p>
      <div className="flex justify-between mb-4">
        <div className="text-green-400 typewriter-font">Yes: {formatToCHZ(yesPool)}</div>
        <div className="text-red-400 typewriter-font">No: {formatToCHZ(noPool)}</div>
      </div>

      <p className="text-sm text-[#f51454] mb-4 typewriter-font">Time Left: {timeLeft}</p>

      {isMarketActive && (
        <div>
          <input
            type="number"
            placeholder="Enter bet amount (CHZ)"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full p-2 mb-4 bg-[#1c2237] border border-[#f51454] rounded text-white typewriter-font focus:outline-none focus:ring-2 focus:ring-[#f51454]"
          />
          <div className="flex gap-4 mt-4">
            <motion.button
              onClick={() => placeBet(true)}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded typewriter-font transition-colors duration-300 hover:bg-green-600"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bet Yes
            </motion.button>
            <motion.button
              onClick={() => placeBet(false)}
              className="flex-1 py-2 px-4 bg-red-500 text-white rounded typewriter-font transition-colors duration-300 hover:bg-red-600"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bet No
            </motion.button>
          </div>
        </div>
      )}

      {!isMarketActive && resolved && (
        <motion.button
          onClick={claimPoints}
          className="w-full mt-4 py-2 px-4 bg-[#f51454] text-white rounded typewriter-font transition-colors duration-300 hover:bg-[#d01346]"
          disabled={isClaiming}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isClaiming ? 'Claiming...' : 'Claim Payout'}
        </motion.button>
      )}

      {resolved && <p className="text-green-400 mt-4 typewriter-font">Market Resolved</p>}
      {cancelled && <p className="text-red-400 mt-4 typewriter-font">Market Cancelled</p>}
    </motion.div>
  );
}

export default Market;