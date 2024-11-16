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
import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';

function Market({ marketId, marketData }) {
  const { contract, account } = useWeb3();
  const [betAmount, setBetAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [question, endTime, yesPool, noPool, creator, resolved] = marketData;

  const handleBet = async (isYes) => {
    if (!contract) return;
    if (!betAmount || Number(betAmount) <= 0) {
      alert('Enter a valid bet amount.');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.takePosition(marketId, isYes, {
        value: ethers.utils.parseEther(betAmount),
      });
      await tx.wait();
      alert(`Successfully placed ${isYes ? 'Yes' : 'No'} bet.`);
    } catch (error) {
      console.error(`Error placing ${isYes ? 'Yes' : 'No'} bet:`, error);
      alert('Failed to place bet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
      <h3 className="text-xl font-bold">{question}</h3>
      <p>
        <strong>Yes Pool:</strong> {ethers.utils.formatEther(yesPool)} ETH
      </p>
      <p>
        <strong>No Pool:</strong> {ethers.utils.formatEther(noPool)} ETH
      </p>
      <div className="space-y-4">
        <input
          type="number"
          className="input-field"
          placeholder="Enter Bet Amount (ETH)"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            onClick={() => handleBet(true)}
            disabled={isLoading}
            className="btn-success w-full"
          >
            Bet Yes
          </button>
          <button
            onClick={() => handleBet(false)}
            disabled={isLoading}
            className="btn-danger w-full"
          >
            Bet No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Market;
