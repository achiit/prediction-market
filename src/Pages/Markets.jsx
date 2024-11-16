// import MarketList from '../components/MarketList';

// function Markets() {
//   return (
//     <div className="bg-gradient-to-b from-[#430e44] to-[#2e0d41] min-h-screen text-white py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8">Explore Active Markets</h1>
//         <p className="text-center mb-12 text-lg">
//           Place your bets and predict outcomes to win rewards!
//         </p>
//         <MarketList />
//       </div>
//     </div>
//   );
// }

// export default Markets;
import MarketList from '../components/MarketList';

function Markets() {
  return (
    <div className="bg-gradient-to-b from-[#430e44] to-[#2e0d41] min-h-screen text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Active Markets</h1>
        <MarketList />
      </div>
    </div>
  );
}

export default Markets;
