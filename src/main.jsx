import 'buffer' // Polyfill for buffer
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3Provider } from './context/Web3Context'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
)
