import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import Market from './Market';

function MarketList() {
  const { contract } = useWeb3();
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      if (!contract) return;

      try {
        const marketCount = await contract.marketCount();
        const marketPromises = [];
        for (let i = 0; i < marketCount; i++) {
          marketPromises.push(contract.getMarketDetails(i));
        }
        const marketData = await Promise.all(marketPromises);

        setMarkets(marketData.map((market, index) => ({ ...market, index })));
      } catch (error) {
        console.error('Error fetching markets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, [contract]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-t-4 border-[#f51454] border-solid rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (markets.length === 0) {
    return (
      <motion.p
        className="text-center text-[#f51454] text-xl typewriter-font"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        No markets available.
      </motion.p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {markets.map((market, index) => (
        <Market key={index} marketId={index} marketData={market} />
      ))}
    </motion.div>
  );
}

export default MarketList;