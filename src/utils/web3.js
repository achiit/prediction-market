import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_ID } from '../constants/contract'

export const switchToChiliz = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
    })
  } catch (switchError) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${CHAIN_ID.toString(16)}`,
          chainName: 'Chiliz Spicy Testnet',
          nativeCurrency: {
            name: 'CHZ',
            symbol: 'CHZ',
            decimals: 18
          },
          rpcUrls: ['https://chiliz-spicy.publicnode.com'],
          blockExplorerUrls: ['https://spicy-explorer.chiliz.com/']
        }]
      })
    }
  }
}

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner)
}

export const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}