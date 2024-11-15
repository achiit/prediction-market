import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CHAIN_ID } from '../constants'

export function useMetaMask() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    try {
      await connect()
      if (chain?.id !== Number(CHAIN_ID)) {
        await switchNetwork?.(Number(CHAIN_ID))
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  useEffect(() => {
    if (isConnected && chain?.id !== Number(CHAIN_ID)) {
      switchNetwork?.(Number(CHAIN_ID))
    }
  }, [isConnected, chain, switchNetwork])

  return { account: address, isConnected, connectWallet, disconnect }
}