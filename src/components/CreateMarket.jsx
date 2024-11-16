// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';

// function CreateMarket() {
//   const { contract } = useWeb3();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     question: '',
//     duration: '3600', // Default 1 hour
//     creatorFee: '100', // Default 1%
//     liquidity: '1', // Default 1 ETH liquidity
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!contract) return;

//     setIsLoading(true);
//     try {
//       console.log('Creating market with:', formData);
//       const tx = await contract.createMarket(
//         formData.question,
//         formData.duration,
//         formData.creatorFee,
//         {
//           value: ethers.utils.parseEther(formData.liquidity), // Initial liquidity
//         }
//       );
//       await tx.wait();

//       alert('Market created successfully!');
//       setFormData({
//         question: '',
//         duration: '3600',
//         creatorFee: '100',
//         liquidity: '1',
//       });
//     } catch (error) {
//       console.error('Error creating market:', error);
//       alert('Failed to create market.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-bold mb-4">Create Prediction Market</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Question
//           </label>
//           <input
//             type="text"
//             className="input-field"
//             placeholder="Will ETH reach $2,000 by Dec 2024?"
//             value={formData.question}
//             onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//             required
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Duration (seconds)
//             </label>
//             <input
//               type="number"
//               className="input-field"
//               value={formData.duration}
//               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//               min="60"
//               max="86400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Creator Fee (%)
//             </label>
//             <input
//               type="number"
//               className="input-field"
//               value={formData.creatorFee}
//               onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
//               min="0"
//               max="500"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Initial Liquidity (ETH)
//           </label>
//           <input
//             type="number"
//             className="input-field"
//             value={formData.liquidity}
//             onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
//             min="1"
//             step="0.1"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="btn-primary w-full"
//         >
//           {isLoading ? 'Creating Market...' : 'Create Market'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateMarket;
import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { motion } from 'framer-motion';

function CreateMarket() {
  const { contract } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    duration: '3600', // Default: 1 hour
    creatorFee: '100', // Default: 1%
    liquidity: '1', // Default: 1 ETH
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert('Contract not connected.');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.createMarket(
        formData.question,
        formData.duration,
        formData.creatorFee,
        {
          value: ethers.utils.parseEther(formData.liquidity), // Initial liquidity
        }
      );
      await tx.wait();

      alert('Market created successfully!');
      setFormData({
        question: '',
        duration: '3600',
        creatorFee: '100',
        liquidity: '1',
      });
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Failed to create market.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-[#2e0d41] mb-6">Create Market</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Market Question</label>
          <input
            type="text"
            className="input-field"
            placeholder="Will ETH reach $2,000 by Dec 2024?"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Duration (seconds)</label>
            <input
              type="number"
              className="input-field"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              min="60"
              max="86400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Creator Fee (%)</label>
            <input
              type="number"
              className="input-field"
              value={formData.creatorFee}
              onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
              min="0"
              max="500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Initial Liquidity (ETH)</label>
          <input
            type="number"
            className="input-field"
            value={formData.liquidity}
            onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
            min="1"
            step="0.1"
            required
          />
        </div>
        <button
          type="submit"
          className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Market...' : 'Create Market'}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateMarket;
