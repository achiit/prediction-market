// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';

// function CreateMarket() {
//   const { contract } = useWeb3();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     question: '',
//     duration: '3600', // Default 1 hour
//     creatorFee: '100', // Default 1%
//     liquidity: '1', // Default 1 ETH liquidity
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!contract) return;

//     setIsLoading(true);
//     try {
//       console.log('Creating market with:', formData);
//       const tx = await contract.createMarket(
//         formData.question,
//         formData.duration,
//         formData.creatorFee,
//         {
//           value: ethers.utils.parseEther(formData.liquidity), // Initial liquidity
//         }
//       );
//       await tx.wait();

//       alert('Market created successfully!');
//       setFormData({
//         question: '',
//         duration: '3600',
//         creatorFee: '100',
//         liquidity: '1',
//       });
//     } catch (error) {
//       console.error('Error creating market:', error);
//       alert('Failed to create market.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-bold mb-4">Create Prediction Market</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Question
//           </label>
//           <input
//             type="text"
//             className="input-field"
//             placeholder="Will ETH reach $2,000 by Dec 2024?"
//             value={formData.question}
//             onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//             required
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Duration (seconds)
//             </label>
//             <input
//               type="number"
//               className="input-field"
//               value={formData.duration}
//               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//               min="60"
//               max="86400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Creator Fee (%)
//             </label>
//             <input
//               type="number"
//               className="input-field"
//               value={formData.creatorFee}
//               onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
//               min="0"
//               max="500"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Initial Liquidity (ETH)
//           </label>
//           <input
//             type="number"
//             className="input-field"
//             value={formData.liquidity}
//             onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
//             min="1"
//             step="0.1"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="btn-primary w-full"
//         >
//           {isLoading ? 'Creating Market...' : 'Create Market'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateMarket;
// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';
// import { motion, AnimatePresence } from 'framer-motion';
// import Anthropic from '@anthropic-ai/sdk';

// import { 
//   Clock, 
//   DollarSign, 
//   BrainCircuit, 
//   TrendingUp, 
//   ChevronDown, 
//   AlertCircle,
//   HelpCircle,
//   Coins,
//   Percent
// } from 'lucide-react';
// // import { Alert, AlertDescription } from '@/components/ui/alert';

// function CreateMarket() {
//   const { contract, account } = useWeb3();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAiLoading, setIsAiLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [formData, setFormData] = useState({
//     question: '',
//     duration: '86400', // Default: 24 hours
//     creatorFee: '100', // Default: 1%
//     liquidity: '1', // Default: 1 CHZ
//   });

//   const durationOptions = [
//     { value: '3600', label: '1 hour' },
//     { value: '7200', label: '2 hours' },
//     { value: '86400', label: '1 day' },
//     { value: '172800', label: '2 days' },
//     { value: '604800', label: '1 week' },
//   ];
// 
  
//   const getAiSuggestions = async (category = 'all') => {
//     setIsAiLoading(true);
//     try {
//         const data = await anthropic.messages.create({
//             model: "claude-3-5-sonnet-20241022",
//             max_tokens: 1024,
//             messages: [{ role: "user", content: 'Generate 3 yes/no prediction market questions about current real-world events in sports. Focus on upcoming events that will have clear outcomes. For sports, only include actual scheduled matches or tournaments.Format: Only return the questions, one per line. Example: "Will India win their next T20 World Cup match against Australia?"' }],
//           });
//           console.log(data);
//     //   const response = await fetch('your-claude-api-endpoint', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       // Add your API authentication headers here
//     //     },
//     //     body: JSON.stringify({
//         //   prompt: `Generate 3 yes/no prediction market questions about current real-world events in sports. 
//         //           Focus on upcoming events that will have clear outcomes. 
//         //           For sports, only include actual scheduled matches or tournaments.
//         //           Format: Only return the questions, one per line.
//         //           Example: "Will India win their next T20 World Cup match against Australia?"`,
//     //     }),
//     //   });

//     //   if (!response.ok) throw new Error('Failed to get AI suggestions');
      
//     //   const data = await response.json();
//       // Parse the response and split into individual questions
//       const questions = data.response.split('\n').filter(q => q.trim());
//       setSuggestions(questions);
//       setShowSuggestions(true);
//     } catch (error) {
//       console.error('Error getting AI suggestions:', error);
//       alert('Failed to get AI suggestions. Please try again.');
//     } finally {
//       setIsAiLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!contract || !account) {
//       alert('Please connect your wallet first');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const tx = await contract.createMarket(
//         formData.question,
//         formData.duration,
//         formData.creatorFee,
//         {
//           value: ethers.utils.parseEther(formData.liquidity),
//         }
//       );
//       await tx.wait();

//       alert('Market created successfully!');
//       setFormData({
//         question: '',
//         duration: '86400',
//         creatorFee: '100',
//         liquidity: '1',
//       });
//     } catch (error) {
//       console.error('Error creating market:', error);
//       alert('Failed to create market.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#131720] py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-white mb-4">Create Prediction Market</h1>
//           <p className="text-gray-400 text-lg">
//             Launch your market and start earning fees from trades
//           </p>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-[#1c2237] rounded-2xl shadow-xl border border-gray-800">
//           <div className="p-8">
//             {/* Info Alert */}
//             {/* <Alert className="mb-8 bg-[#2a3347] border-[#f51454] text-gray-300">
//               <AlertCircle className="h-4 w-4 text-[#f51454]" />
//               <AlertDescription>
//                 You'll need to provide initial liquidity to create a market. This liquidity will be split 50/50 between Yes and No positions.
//               </AlertDescription>
//             </Alert> */}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Question Section */}
//               <div className="space-y-4">
//                 <label className="block">
//                   <span className="text-white font-medium mb-1 block">Market Question</span>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white 
//                                placeholder-gray-500 focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                       placeholder="Will ETH reach $2,000 by Dec 2024?"
//                       value={formData.question}
//                       onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => getAiSuggestions()}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 
//                                bg-[#f51454] text-white rounded-md flex items-center gap-2
//                                hover:bg-[#d11346] transition-colors"
//                     >
//                       {isAiLoading ? (
//                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"/>
//                       ) : (
//                         <>
//                           <BrainCircuit size={16} />
//                           Ask AI
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </label>

//                 {/* AI Suggestions */}
//                 <AnimatePresence>
//                   {showSuggestions && suggestions.length > 0 && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="bg-[#2a3347] rounded-lg p-4 space-y-2">
//                         <h4 className="text-white font-medium mb-3">AI Suggestions:</h4>
//                         {suggestions.map((suggestion, index) => (
//                           <button
//                             key={index}
//                             type="button"
//                             onClick={() => {
//                               setFormData({ ...formData, question: suggestion });
//                               setShowSuggestions(false);
//                             }}
//                             className="w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-[#3a4357] 
//                                      transition-colors flex items-center gap-2"
//                           >
//                             <span className="text-[#f51454]">→</span>
//                             {suggestion}
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Duration */}
//                 <div>
//                   <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                     Duration <Clock size={16} className="text-gray-400" />
//                   </label>
//                   <select
//                     className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                              focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     required
//                   >
//                     {durationOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Creator Fee */}
//                 <div>
//                   <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                     Creator Fee <Percent size={16} className="text-gray-400" />
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                                focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                       value={formData.creatorFee}
//                       onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
//                       min="0"
//                       max="500"
//                       required
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Liquidity */}
//               <div>
//                 <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                   Initial Liquidity <Coins size={16} className="text-gray-400" />
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                              focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                     value={formData.liquidity}
//                     onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
//                     min="1"
//                     step="0.1"
//                     required
//                   />
//                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">CHZ</span>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex flex-col gap-4">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-[#f51454] hover:bg-[#d11346] text-white py-4 rounded-lg font-medium
//                            transition-colors focus:outline-none focus:ring-2 focus:ring-[#f51454] focus:ring-offset-2
//                            focus:ring-offset-[#1c2237] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
//                       Creating Market...
//                     </span>
//                   ) : (
//                     'Create Market'
//                   )}
//                 </button>
                
//                 <p className="text-center text-gray-400 text-sm">
//                   By creating a market, you agree to our terms and conditions
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default CreateMarket;

// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { useWeb3 } from '../context/Web3Context';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Clock, 
//   DollarSign, 
//   Sparkles, 
//   TrendingUp, 
//   ChevronDown, 
//   AlertCircle,
//   HelpCircle,
//   Coins,
//   Percent,
//   Brain
// } from 'lucide-react';
// // import { Alert, AlertDescription } from '@/components/ui/alert';

// function CreateMarket() {
//   const { contract, account } = useWeb3();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAiLoading, setIsAiLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [formData, setFormData] = useState({
//     question: '',
//     duration: '86400', // Default: 24 hours
//     creatorFee: '100', // Default: 1%
//     liquidity: '1', // Default: 1 CHZ
//   });

//   const categories = [
//     { id: 'all', name: 'All Topics', icon: '🌎' },
//     { id: 'crypto', name: 'Crypto', icon: '₿' },
//     { id: 'sports', name: 'Sports', icon: '⚽' },
//     { id: 'politics', name: 'Politics', icon: '🗳' },
//   ];

//   const durationOptions = [
//     { value: '3600', label: '1 hour' },
//     { value: '7200', label: '2 hours' },
//     { value: '86400', label: '1 day' },
//     { value: '172800', label: '2 days' },
//     { value: '604800', label: '1 week' },
//   ];

//   const handleGetSuggestions = async () => {
//     setIsAiLoading(true);
//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           messages: [{
//             role: "user",
//             content: `Generate 3 yes/no prediction market questions about current real-world events in ${selectedCategory}. 
//                       Focus on upcoming events that will have clear outcomes within the next week to month. 
//                       For sports, only include actual scheduled matches or tournaments.
//                       For crypto, focus on price predictions or major protocol updates.
//                       For politics, focus on upcoming elections or policy decisions.
//                       Return only the questions, each on a new line.
//                       Each question must have a clear yes/no outcome that can be verified.`
//           }],
//           temperature: 0.7,
//           max_tokens: 200
//         })
//       });

//       if (!response.ok) throw new Error('Failed to get suggestions');
      
//       const data = await response.json();
//       const questions = data.choices[0].message.content.split('\n').filter(q => q.trim());
//       setSuggestions(questions);
//       setShowSuggestions(true);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to get suggestions. Please try again.');
//     } finally {
//       setIsAiLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!contract || !account) {
//       alert('Please connect your wallet first');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const tx = await contract.createMarket(
//         formData.question,
//         formData.duration,
//         formData.creatorFee,
//         {
//           value: ethers.utils.parseEther(formData.liquidity),
//         }
//       );
//       await tx.wait();
//       alert('Market created successfully!');
//       setFormData({
//         question: '',
//         duration: '86400',
//         creatorFee: '100',
//         liquidity: '1',
//       });
//     } catch (error) {
//       console.error('Error creating market:', error);
//       alert('Failed to create market.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#131720] py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-white mb-4">Create Prediction Market</h1>
//           <p className="text-gray-400 text-lg">
//             Launch your market and start earning fees from trades
//           </p>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-[#1c2237] rounded-2xl shadow-xl border border-gray-800">
//           <div className="p-8">
//             {/* <Alert className="mb-8 bg-[#2a3347] border-[#f51454] text-gray-300">
//               <AlertCircle className="h-4 w-4 text-[#f51454]" />
//               <AlertDescription>
//                 Initial liquidity will be split 50/50 between Yes and No positions.
//               </AlertDescription>
//             </Alert> */}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Question Section */}
//               <div className="space-y-4">
//                 <label className="block">
//                   <span className="text-white font-medium mb-1 block">Market Question</span>
//                   <span className="text-gray-400 text-sm mb-2 block">
//                     Make it clear and verifiable with a Yes/No outcome
//                   </span>
                  
//                   {/* Category Selection */}
//                   <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
//                     {categories.map(category => (
//                       <button
//                         key={category.id}
//                         type="button"
//                         onClick={() => setSelectedCategory(category.id)}
//                         className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 
//                                 ${selectedCategory === category.id
//                                   ? 'bg-[#f51454] text-white'
//                                   : 'bg-[#2a3347] text-gray-400 hover:text-white'}`}
//                       >
//                         <span>{category.icon}</span>
//                         {category.name}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Question Input */}
//                   <div className="relative">
//                     <input
//                       type="text"
//                       className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white 
//                                placeholder-gray-500 focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                       placeholder="Enter your market question..."
//                       value={formData.question}
//                       onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={handleGetSuggestions}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5
//                                bg-[#f51454] text-white rounded-md flex items-center gap-2
//                                hover:bg-[#d11346] transition-colors"
//                     >
//                       {isAiLoading ? (
//                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"/>
//                       ) : (
//                         <>
//                           <Sparkles size={16} />
//                           Get Ideas
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </label>

//                 {/* AI Suggestions */}
//                 <AnimatePresence>
//                   {showSuggestions && suggestions.length > 0 && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="bg-[#2a3347] rounded-lg p-4 space-y-2">
//                         <div className="flex items-center gap-2 mb-3">
//                           <Brain size={16} className="text-[#f51454]" />
//                           <h4 className="text-white font-medium">AI Suggestions</h4>
//                         </div>
//                         {suggestions.map((suggestion, index) => (
//                           <button
//                             key={index}
//                             type="button"
//                             onClick={() => {
//                               setFormData({ ...formData, question: suggestion });
//                               setShowSuggestions(false);
//                             }}
//                             className="w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-[#3a4357] 
//                                      transition-colors flex items-center gap-2 group"
//                           >
//                             <span className="text-[#f51454] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
//                             {suggestion}
//                           </button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Duration and Fee */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                     Duration <Clock size={16} className="text-gray-400" />
//                   </label>
//                   <select
//                     className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                              focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     required
//                   >
//                     {durationOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                     Creator Fee <Percent size={16} className="text-gray-400" />
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                                focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                       value={formData.creatorFee}
//                       onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
//                       min="0"
//                       max="500"
//                       required
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Liquidity */}
//               <div>
//                 <label className="block text-white font-medium mb-1 flex items-center gap-2">
//                   Initial Liquidity <Coins size={16} className="text-gray-400" />
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white
//                              focus:border-[#f51454] focus:ring-1 focus:ring-[#f51454]"
//                     value={formData.liquidity}
//                     onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
//                     min="1"
//                     step="0.1"
//                     required
//                   />
//                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">CHZ</span>
//                 </div>
//                 <span className="text-sm text-gray-400 mt-1 block">
//                   Minimum 1 CHZ required
//                 </span>
//               </div>

//               {/* Submit Button */}
//               <div className="flex flex-col gap-4">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-[#f51454] hover:bg-[#d11346] text-white py-4 rounded-lg font-medium
//                            transition-colors focus:outline-none focus:ring-2 focus:ring-[#f51454] focus:ring-offset-2
//                            focus:ring-offset-[#1c2237] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
//                       Creating Market...
//                     </span>
//                   ) : (
//                     'Create Market'
//                   )}
//                 </button>
                
//                 <p className="text-center text-gray-400 text-sm">
//                   By creating a market, you agree to our terms and conditions
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default CreateMarket;

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  DollarSign, 
  Sparkles, 
  Coins, 
  Percent, 
  Trophy 
} from 'lucide-react';

function CreateMarket() {
  const { contract, account } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    duration: '3600', // Default: 1 hour
    creatorFee: '100', // Default: 1%
    liquidity: '1', // Default: 1 CHZ
  });

  const durationOptions = [
    { value: '3600', label: '1 hour' },
    { value: '7200', label: '2 hours' },
    { value: '14400', label: '4 hours' },
    { value: '43200', label: '12 hours' },
    { value: '86400', label: '24 hours' },
  ];

  const openaiKey = import.meta.env.VITE_OPENAI_KEY || ''; // Ensure fallback in case it's undefined

  const handleGetSuggestions = async () => {
    if (!openaiKey) {
      alert('OpenAI API key is not defined');
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `
                Generate 3 yes/no prediction market questions about current live or upcoming sports events.
                Example format:
                "Will Manchester United win against Arsenal?"
                "Will LeBron James score over 30 points tonight?"
                "Will Max Verstappen secure pole position in today's F1 qualifying?"
              `,
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      const questions = data.choices[0]?.message?.content?.split('\n').filter((q) => q.trim());
      setSuggestions(questions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      alert('Failed to get suggestions. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract || !account) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.createMarket(
        formData.question,
        formData.duration,
        formData.creatorFee,
        {
          value: ethers.utils.parseEther(formData.liquidity),
        }
      );
      await tx.wait();
      alert('Market created successfully!');
      setFormData({
        question: '',
        duration: '3600',
        creatorFee: '100',
        liquidity: '1',
      });
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Failed to create market.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131720] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={32} className="text-[#f51454]" />
            <h1 className="text-4xl font-bold text-white">Create a Sports Market</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Create prediction markets for live sports events and earn fees!
          </p>
        </div>

        <div className="bg-[#1c2237] rounded-2xl shadow-xl border border-gray-800">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-white font-medium mb-1 block">Market Question</span>
                  <span className="text-gray-400 text-sm mb-2 block">
                    Ask a question about a live or upcoming sports event
                  </span>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                      placeholder="Will Team A win their next match?"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleGetSuggestions}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#f51454] text-white rounded-md flex items-center"
                    >
                      {isAiLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Suggestions
                        </>
                      )}
                    </button>
                  </div>
                </label>

                {showSuggestions && suggestions.length > 0 && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-[#2a3347] rounded-lg p-4 space-y-2"
                    >
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setFormData({ ...formData, question: suggestion })}
                          className="block text-left w-full text-gray-300 hover:bg-[#3a4357] px-3 py-2 rounded-lg"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-1 flex items-center gap-2">
                    Duration <Clock size={16} className="text-gray-400" />
                  </label>
                  <select
                    className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-1 flex items-center gap-2">
                    Creator Fee <Percent size={16} className="text-gray-400" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white"
                      value={formData.creatorFee}
                      onChange={(e) => setFormData({ ...formData, creatorFee: e.target.value })}
                      min="0"
                      max="500"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-1 flex items-center gap-2">
                  Initial Liquidity <Coins size={16} className="text-gray-400" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-[#2a3347] border border-gray-700 rounded-lg px-4 py-3 text-white"
                    value={formData.liquidity}
                    onChange={(e) => setFormData({ ...formData, liquidity: e.target.value })}
                    min="1"
                    step="0.1"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">CHZ</span>
                </div>
                <span className="text-sm text-gray-400 mt-1 block">
                  Minimum 1 CHZ required
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f51454] text-white py-3 rounded-lg font-medium disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Market'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateMarket;
