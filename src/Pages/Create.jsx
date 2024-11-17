// import CreateMarket from '../components/CreateMarket';

// function Create() {
//   return (
//     <div className="bg-gradient-to-b from-[#2e0d41] to-[#430e44] min-h-screen text-white py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8">
//           Create Your Prediction Market
//         </h1>
//         <p className="text-center mb-12 text-lg">
//           Enter the details below to start a prediction market and engage with participants!
//         </p>
//         <CreateMarket />
//       </div>
//     </div>
//   );
// }

// export default Create;
import CreateMarket from '../components/CreateMarket'

export default function Create() {
  return (
    <div className="min-h-screen bg-[#1c1c2f] pt-20">
      <CreateMarket />
    </div>
  )
}