import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import Market from '../components/Market';
import { Trophy, Loader, AlertCircle } from 'lucide-react';

export default function MyMarkets() {
  const { contract, account } = useWeb3();
  const [myMarkets, setMyMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resolving, setResolving] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState({});

  useEffect(() => {
    const fetchMyMarkets = async () => {
      if (!contract || !account) return;

      try {
        const marketCount = await contract.marketCount();
        const marketPromises = [];
        for (let i = 0; i < marketCount; i++) {
          marketPromises.push(contract.getMarketDetails(i));
        }

        const marketData = await Promise.all(marketPromises);

        const userMarkets = marketData
          .map((market, index) => ({
            marketId: index,
            data: market,
          }))
          .filter(
            (market) => market.data.creator.toLowerCase() === account.toLowerCase()
          );

        setMyMarkets(userMarkets);
      } catch (error) {
        console.error('Error fetching user markets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyMarkets();
  }, [contract, account]);

  const handleResolve = async (marketId) => {
    if (!contract || selectedOutcome[marketId] === undefined) {
      alert('Please select an outcome before resolving.');
      return;
    }

    setResolving((prev) => ({ ...prev, [marketId]: true }));

    try {
      const tx = await contract.resolveMarket(marketId, selectedOutcome[marketId]);
      await tx.wait();
      alert('Market resolved successfully!');
    } catch (error) {
      console.error('Error resolving market:', error);
      alert('Failed to resolve the market. Check console for details.');
    } finally {
      setResolving((prev) => ({ ...prev, [marketId]: false }));
    }
  };

  const isMarketResolvable = (market) => {
    const now = Math.floor(Date.now() / 1000);
    return now >= market.data.endTime && !market.data.resolved && !market.data.cancelled;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a0b2e] to-[#2e0d41]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-t-4 border-[#f51454] border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] to-[#2e0d41] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Trophy size={40} className="text-[#f51454]" />
          <h1 className="text-5xl font-bold text-white typewriter-font">My Markets</h1>
        </motion.div>

        {myMarkets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center p-8 bg-[#2a1c3d] rounded-xl shadow-lg border border-[#f51454]"
          >
            <AlertCircle size={48} className="text-[#f51454] mx-auto mb-4" />
            <p className="text-xl text-gray-300">You have not created any markets yet.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {myMarkets.map(({ marketId, data }, index) => (
                <motion.div
                  key={marketId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#2e0d41] to-[#1a0b2e] rounded-xl shadow-lg border border-[#f51454] p-6 relative overflow-hidden"
                >
                  <Market marketId={marketId} marketData={data} />
                  {isMarketResolvable({ marketId, data }) && (
                    <div className="mt-4">
                      <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2 text-white">
                          <input
                            type="radio"
                            name={`outcome-${marketId}`}
                            value="true"
                            checked={selectedOutcome[marketId] === true}
                            onChange={() =>
                              setSelectedOutcome((prev) => ({ ...prev, [marketId]: true }))
                            }
                            className="form-radio text-[#f51454]"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-white">
                          <input
                            type="radio"
                            name={`outcome-${marketId}`}
                            value="false"
                            checked={selectedOutcome[marketId] === false}
                            onChange={() =>
                              setSelectedOutcome((prev) => ({ ...prev, [marketId]: false }))
                            }
                            className="form-radio text-[#f51454]"
                          />
                          No
                        </label>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResolve(marketId)}
                        disabled={resolving[marketId]}
                        className="w-full bg-gradient-to-r from-[#f51454] to-[#ff8f00] text-white py-3 rounded-lg font-medium text-lg
                          hover:from-[#e01348] hover:to-[#f08200] disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        {resolving[marketId] ? (
                          <span className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2" size={20} />
                            Resolving...
                          </span>
                        ) : (
                          'Resolve Market'
                        )}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
