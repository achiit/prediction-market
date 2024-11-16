import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import Market from '../components/Market';

function MyMarkets() {
  const { contract, account } = useWeb3();
  const [myMarkets, setMyMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resolving, setResolving] = useState({}); // Track resolving state per market

  useEffect(() => {
    const fetchMyMarkets = async () => {
      if (!contract || !account) return;

      try {
        console.log(`Connected account: ${account}`);
        const marketCount = await contract.marketCount();
        console.log(`Total markets: ${marketCount.toString()}`);

        const marketPromises = [];
        for (let i = 0; i < marketCount; i++) {
          marketPromises.push(contract.getMarketDetails(i));
        }

        const marketData = await Promise.all(marketPromises);

        // Debug log: all markets with their creators
        marketData.forEach((market, index) => {
          console.log(`Market ${index} created by: ${market.creator}`);
        });

        // Filter markets created by the connected user
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
    if (!contract) return;
    setResolving((prev) => ({ ...prev, [marketId]: true }));

    try {
      const tx = await contract.resolveMarket(marketId, true); // Assuming true outcome for example
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (myMarkets.length === 0) {
    return (
      <p className="text-center text-gray-400">
        You have not created any markets.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        My Markets
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMarkets.map(({ marketId, data }, index) => (
          <div
            key={index}
            className="bg-[#1c2237] rounded-xl shadow-lg border border-gray-800 p-6 relative"
          >
            <Market marketId={marketId} marketData={data} />
            {isMarketResolvable({ marketId, data }) && (
              <button
                onClick={() => handleResolve(marketId)}
                disabled={resolving[marketId]}
                className="absolute bottom-4 left-4 right-4 bg-[#f51454] text-white py-2 px-4 rounded-lg font-medium
                  hover:bg-[#e01348] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resolving[marketId] ? 'Resolving...' : 'Resolve Market'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyMarkets;
