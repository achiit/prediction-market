// import { useState, useEffect } from 'react';
// import { useWeb3 } from '../context/Web3Context';
// import Market from './Market';

// function MarketList() {
//   const { contract } = useWeb3();
//   const [markets, setMarkets] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMarkets = async () => {
//       try {
//         const marketCount = await contract.marketCount();
//         const marketPromises = [];

//         for (let i = 0; i < marketCount; i++) {
//           marketPromises.push(contract.getMarketDetails(i));
//         }

//         const marketData = await Promise.all(marketPromises);
//         setMarkets(marketData);
//       } catch (error) {
//         console.error('Error fetching markets:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMarkets();
//   }, [contract]);

//   if (isLoading) {
//     return <div>Loading markets...</div>;
//   }

//   return (
//     <div className="space-y-4">
//       {markets.length === 0 ? (
//         <p>No markets available.</p>
//       ) : (
//         markets.map((market, index) => (
//           <Market key={index} marketId={index} marketData={market} />
//         ))
//       )}
//     </div>
//   );
// }

// export default MarketList;
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Market from './Market';
import { motion } from 'framer-motion';

function MarketList() {
  const { contract } = useWeb3();
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        if (!contract) return;
        const marketCount = await contract.marketCount();
        const marketPromises = [];
        for (let i = 0; i < marketCount; i++) {
          marketPromises.push(contract.getMarketDetails(i));
        }
        const marketData = await Promise.all(marketPromises);
        setMarkets(marketData);
      } catch (error) {
        console.error('Error fetching markets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, [contract]);

  if (isLoading) {
    return <div className="text-center text-lg py-8">Loading markets...</div>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {markets.length === 0 ? (
        <p className="text-center text-lg">No markets available yet.</p>
      ) : (
        markets.map((market, index) => <Market key={index} marketId={index} marketData={market} />)
      )}
    </motion.div>
  );
}

export default MarketList;
