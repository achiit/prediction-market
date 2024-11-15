// src/components/MarketList.jsx
import { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import Market from './Market'

function MarketList() {
  const { contract } = useWeb3()
  const [markets, setMarkets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkets = async () => {
      if (!contract) return
      
      try {
        setIsLoading(true)
        setError(null)

        const count = await contract.marketCount()
        const marketPromises = []
        
        for (let i = 0; i < count; i++) {
          marketPromises.push(contract.getMarketDetails(i))
        }
        
        const marketData = await Promise.all(marketPromises)
        setMarkets(marketData)
      } catch (error) {
        console.error('Error loading markets:', error)
        setError('Failed to load markets')
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkets()

    // Optional: Set up event listener for new markets
    if (contract) {
      const filter = contract.filters.MarketCreated()
      contract.on(filter, () => {
        loadMarkets()
      })

      return () => {
        contract.off(filter)
      }
    }
  }, [contract])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading markets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Active Markets</h2>
        <span className="text-sm text-gray-500">
          {markets.length} market{markets.length !== 1 ? 's' : ''}
        </span>
      </div>

      {markets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No markets available</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {markets.map((market, index) => (
            <Market
              key={index}
              marketId={index}
              marketData={market}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MarketList