// import { useWeb3 } from './context/Web3Context'
// import { formatAddress } from './utils/web3'
// import CreateMarket from './components/CreateMarket'
// import MarketList from './components/MarketList'

// function App() {
//   const { account, connectWallet, isLoading } = useWeb3()

//   console.log('App state:', { account, isLoading })

//   if (isLoading) {
//     console.log('App is loading...')
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-xl font-bold">Prediction Markets</h1>
//             {!account ? (
//               <button onClick={connectWallet} className="btn-primary">
//                 Connect Wallet
//               </button>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">{formatAddress(account)}</span>
//                 <div className="h-2 w-2 rounded-full bg-green-500"></div>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 px-4">
//         {!account ? (
//           <div className="text-center py-12">
//             <h2 className="text-xl text-gray-600">
//               Please connect your wallet to continue
//             </h2>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <CreateMarket />
//             <MarketList />
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default App
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { Outlet } from 'react-router-dom';

// function App() {
//   return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow">
//           <Outlet/>
//         </main>
//         <Footer />
//       </div>
//   );
// }

// export default App;
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Markets from './Pages/Markets';
import Create from './Pages/Create';
import MyMarkets from './Pages/MyMarkets';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/create" element={<Create />} />
            <Route path="/my-markets" element={<MyMarkets />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
