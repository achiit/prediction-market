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
import { Search, TrendingUp } from 'lucide-react';

function MarketList() {
  const { contract } = useWeb3();
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Markets' },
    { id: 'trending', name: 'Trending' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'politics', name: 'Politics' },
    { id: 'sports', name: 'Sports' },
  ];

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

  const filteredMarkets = markets.filter(market => 
    market[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search markets..."
            className="w-full pl-10 pr-4 py-2 bg-[#2a3347] text-white rounded-lg border border-gray-700 focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[#f51454] text-white'
                  : 'bg-[#2a3347] text-gray-400 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No markets found</h3>
          <p className="text-gray-400">Try adjusting your search or create a new market</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMarkets.map((market, index) => (
            <Market key={index} marketId={index} marketData={market} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default MarketList;