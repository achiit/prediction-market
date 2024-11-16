import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
  const { connectWallet, account } = useWeb3();

  return (
    <nav className="bg-[#2e0d41] text-white shadow fixed w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link to="/" className="text-2xl font-bold">
          🧠 Prediction World
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/markets" className="hover:text-[#f51454]">
            Markets
          </Link>
          <Link to="/create" className="hover:text-[#f51454]">
            Create Market
          </Link>
          {account ? (
            <span className="text-sm">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-[#f51454] rounded text-white"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
