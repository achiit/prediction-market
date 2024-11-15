// src/components/Market.jsx
import { useState } from 'react'
import { ethers } from 'ethers'
import moment from 'moment'
import { useWeb3 } from '../context/Web3Context'
import { formatAddress } from '../utils/web3'

function Market({ marketId, marketData }) {
  const { contract, account } = useWeb3()
  const [betAmount, setBetAmount] = useState('0.001')
  const [isLoading, setIsLoading] = useState(false)

  const [question, endTime, resolved, yesPool, noPool, creator] = marketData

  const isExpired = Number(endTime) < Math.floor(Date.now() / 1000)
  const isCreator = creator.toLowerCase() === account?.toLowerCase()

  const takePosition = async (isYes) => {
    if (!contract) return

    setIsLoading(true)
    try {
      const tx = await contract.takePosition(
        marketId,
        isYes,
        {
          value: ethers.utils.parseEther(betAmount),
          gasLimit: 300000
        }
      )

      await tx.wait()
      alert('Position taken successfully!')
    } catch (error) {
      console.error('Error taking position:', error)
      alert('Error taking position')
    } finally {
      setIsLoading(false)
    }
  }

  const resolveMarket = async (outcome) => {
    if (!contract || !isCreator) return

    setIsLoading(true)
    try {
      const tx = await contract.resolveMarket(marketId, outcome)
      await tx.wait()
      alert('Market resolved successfully!')
    } catch (error) {
      console.error('Error resolving market:', error)
      alert('Error resolving market')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{question}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Created by: {formatAddress(creator)}
          </p>
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-500">
            {isExpired ? 'Ended' : `Ends ${moment.unix(Number(endTime)).fromNow()}`}
          </p>
          <p className="text-gray-500">
            {moment.unix(Number(endTime)).format('MMM D, YYYY h:mm A')}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-sm font-medium text-green-700">Yes Pool</p>
          <p className="text-lg font-semibold text-green-800">
            {ethers.utils.formatEther(yesPool)} CHZ
          </p>
        </div>

        <div className="bg-red-50 p-3 rounded-md">
          <p className="text-sm font-medium text-red-700">No Pool</p>
          <p className="text-lg font-semibold text-red-800">
            {ethers.utils.formatEther(noPool)} CHZ
          </p>
        </div>
      </div>

      {!resolved && !isExpired && (
        <div className="mt-4">
          <div className="flex space-x-4 items-center mb-4">
            <input
              type="number"
              className="input-field w-32"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0.001"
              step="0.001"
            />
            <span className="text-sm text-gray-500">CHZ</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => takePosition(true)}
              disabled={isLoading}
              className="btn-success"
            >
              Bet Yes
            </button>
            <button
              onClick={() => takePosition(false)}
              disabled={isLoading}
              className="btn-danger"
            >
              Bet No
            </button>
          </div>
        </div>
      )}

      {isCreator && !resolved && isExpired && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            onClick={() => resolveMarket(true)}
            disabled={isLoading}
            className="btn-success"
          >
            Resolve Yes
          </button>
          <button
            onClick={() => resolveMarket(false)}
            disabled={isLoading}
            className="btn-danger"
          >
            Resolve No
          </button>
        </div>
      )}

      {resolved && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md text-center">
          <p className="text-gray-600">Market Resolved</p>
        </div>
      )}
    </div>
  )
}

export default Market