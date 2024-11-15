import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';

function CreateMarket() {
  const { contract } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    duration: '3600',
    creatorFee: '100',
    minBet: '0.001', // Default minBet
    maxBet: '0.01',  // Default maxBet
    liquidity: '0.002' // Default liquidity
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return;

    // Validate liquidity
    const minLiquidity = Number(formData.minBet) * 2;
    if (Number(formData.liquidity) < minLiquidity) {
      alert(`Liquidity must be at least ${minLiquidity} CHZ (minBet * 2).`);
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.createMarket(
        formData.question,
        formData.duration,
        formData.creatorFee,
        ethers.utils.parseEther(formData.minBet),
        ethers.utils.parseEther(formData.maxBet),
        {
          value: ethers.utils.parseEther(formData.liquidity),
          gasLimit: 500000
        }
      );

      await tx.wait();

      // Reset form data
      setFormData({
        question: '',
        duration: '3600',
        creatorFee: '100',
        minBet: '0.001',
        maxBet: '0.01',
        liquidity: '0.002'
      });

      alert('Market created successfully!');
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Error creating market. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Create Prediction Market</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Will BTC reach $100k by end of 2024?"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              className="input-field"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option value="300">5 minutes</option>
              <option value="3600">1 hour</option>
              <option value="86400">1 day</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Creator Fee (%)
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.creatorFee}
              onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
              min="0"
              max="500"
              step="1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Bet (CHZ)
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.minBet}
              onChange={(e) => {
                const minBet = e.target.value;
                setFormData({
                  ...formData,
                  minBet,
                  liquidity: (Number(minBet) * 2).toFixed(3) // Auto-update liquidity
                });
              }}
              min="0.001"
              step="0.001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Bet (CHZ)
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.maxBet}
              onChange={(e) => setFormData({ ...formData, maxBet: e.target.value })}
              min="0.001"
              step="0.001"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Liquidity (CHZ)
          </label>
          <input
            type="number"
            className="input-field"
            value={formData.liquidity}
            onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
            min={(Number(formData.minBet) * 2).toFixed(3)} // Dynamic minimum liquidity
            step="0.001"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Liquidity must be at least twice the Min Bet (Min: {(Number(formData.minBet) * 2).toFixed(3)} CHZ).
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !contract}
          className="btn-primary w-full"
        >
          {isLoading ? 'Creating Market...' : 'Create Market'}
        </button>
      </form>
    </div>
  );
}

export default CreateMarket;
