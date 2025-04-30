
// import React, { useState } from 'react';

// //INTERAL IMPORT
// import Header from "../components/header"; 
// import { useAuth } from '@/context/auth-context';
// import { useRouter } from 'next/navigation';

// interface Flashcard {
//   question: string;
//   answer?: boolean;
// }

// interface InterestCategory {
//   category: string;
//   questions: Flashcard[];
// }

// export default function Game() {
//   const {user} = useAuth();
//   const router = useRouter();

//   if (!user) {
//     return (
//       <div>
//         <h2>You need to log in to access this page.</h2>
//         <button
//           className="bg-green-500 border-r-5 font-serif hover:bg-green-300"
//           onClick={() => router.push("/auth/login")}
//         >
//           Return to Login
//         </button>
//       </div>
//     );
//   }



//   const [interests, setInterests] = useState<InterestCategory[]>([]);
//   const [currentFlashcards, setCurrentFlashcards] = useState<Flashcard[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
//   const [categoryName, setCategoryName] = useState<string>('');

//   const [inputCategory, setInputCategory] = useState('');
//   const [inputQuestions, setInputQuestions] = useState('');

//   const addInterestCategory = () => {
//     const trimmedCategory = inputCategory.trim();
//     const questionsArray = inputQuestions
//       .split(',')
//       .map((q) => q.trim())
//       .filter((q) => q);

//     if (trimmedCategory && questionsArray.length > 0) {
//       const newCategory: InterestCategory = {
//         category: trimmedCategory,
//         questions: questionsArray.map((q) => ({ question: q }))
//       };

//       setInterests([...interests, newCategory]);
//       alert('Category added!');
//       setInputCategory('');
//       setInputQuestions('');
//     } else {
//       alert('Please enter a valid category and questions.');
//     }
//   };

//   const startGame = () => {
//     if (interests.length === 0) {
//       alert('Please add some interests first.');
//       return;
//     }

//     const randomIndex = Math.floor(Math.random() * interests.length);
//     const selectedCategory = interests[randomIndex];

//     setCategoryName(selectedCategory.category);
//     setCurrentFlashcards(selectedCategory.questions);
//     setCurrentQuestionIndex(0);
//     setIsGameStarted(true);
//   };

//   const submitAnswer = (answer: boolean) => {
//     const updatedFlashcards = [...currentFlashcards];
//     updatedFlashcards[currentQuestionIndex].answer = answer;
//     setCurrentFlashcards(updatedFlashcards);

//     const nextIndex = currentQuestionIndex + 1;
//     if (nextIndex < currentFlashcards.length) {
//       setCurrentQuestionIndex(nextIndex);
//     } else {
//       alert('Game over!');
//       setIsGameStarted(false);
//     }
//   };

//   return (
//     <div>
//     <Header />
//     <main className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Welcome to the Flashcard Game!</h1>

//       {!isGameStarted ? (
//         <div id="start-screen" className="space-y-4">
//           <h2 className="text-xl font-semibold">Enter your interests and questions:</h2>

//           <div>
//             <label htmlFor="category" className="block font-medium">
//               Interest Category:
//             </label>
//             <input
//               type="text"
//               id="category"
//               className="w-full border p-2 rounded"
//               value={inputCategory}
//               onChange={(e) => setInputCategory(e.target.value)}
//               placeholder="e.g., Sports"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="questions" className="block font-medium">
//               Questions (comma separated):
//             </label>
//             <textarea
//               id="questions"
//               className="w-full border p-2 rounded"
//               value={inputQuestions}
//               onChange={(e) => setInputQuestions(e.target.value)}
//               placeholder="e.g., Do you like soccer?, Do you play basketball?"
//               required
//             ></textarea>
//           </div>

//           <div className="flex gap-4">
//             <button
//               className="btn bg-blue-600 text-white px-4 py-2 rounded"
//               onClick={addInterestCategory}
//             >
//               Add Category
//             </button>
//             <button
//               className="btn bg-green-600 text-white px-4 py-2 rounded"
//               onClick={startGame}
//             >
//               Start Game
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div id="game">
//           <h2 className="text-2xl font-semibold mb-4">
//             Category: <span>{categoryName}</span>
//           </h2>

//           <p className="text-lg mb-6">{currentFlashcards[currentQuestionIndex]?.question}</p>

//           <div className="flex gap-4 mb-4">
//             <button
//               className="btn bg-green-500 text-white px-4 py-2 rounded"
//               onClick={() => submitAnswer(true)}
//             >
//               Yes
//             </button>
//             <button
//               className="btn bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => submitAnswer(false)}
//             >
//               No
//             </button>
//           </div>

//           <p className="text-sm text-gray-600">
//             Question {currentQuestionIndex + 1} of {currentFlashcards.length}
//           </p>
//         </div>
//       )}
//     </main>
//     </div>
//   );
// }


'use client';
 
import { SetStateAction, useState } from "react";
 
 const TwoPlayerYesNoGame = () => {
   const [questionInput, setQuestionInput] = useState("");
   const [currentQuestion, setCurrentQuestion] = useState(null);
   const [player1Answer, setPlayer1Answer] = useState(null);
   const [player2Answer, setPlayer2Answer] = useState(null);
   const [history, setHistory] = useState([]);
   const isGameOver = history.length >= 20;
 
   const submitQuestion = () => {
     if (questionInput.trim() === "") return;
     if (history.length >= 20) {
       alert("You've reached the maximum of 20 questions!");
       return;
     }
     setCurrentQuestion(questionInput.trim());
     setQuestionInput("");
     setPlayer1Answer(null);
     setPlayer2Answer(null);
   };  
 
   const submitAnswer = (player: number, answer: string | SetStateAction<null>) => {
     if (player === 1) setPlayer1Answer(answer);
     if (player === 2) setPlayer2Answer(answer);
   };
 
   const nextQuestion = () => {
     if (currentQuestion && player1Answer && player2Answer) {
       setHistory([
         ...history,
         {
           question: currentQuestion,
           player1: player1Answer,
           player2: player2Answer,
         },
       ]);
     }
   
     setCurrentQuestion(null);
     setPlayer1Answer(null);
     setPlayer2Answer(null);
   };  
 
   return (
<div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 rounded-3xl shadow-2xl text-center border-4 border-dashed border-yellow-200">
<div className="flex justify-center items-center mb-6">
         <span className="text-5xl mr-2">🧠</span>
         <h1 className="text-4xl font-extrabold text-yellow-400">20 Questions: Get To Know Me!</h1>
       </div>
 
       {!currentQuestion && !isGameOver ? (
   <>
     <input
       type="text"
       value={questionInput}
       onChange={(e) => setQuestionInput(e.target.value)}
       placeholder="Type your yes/no question here..."
       className="w-full px-4 py-2 border rounded mb-4 text-black"
     />
     <button
       onClick={submitQuestion}
       className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
     >
             🎤 Ask Question
           </button>
         </>
       ) : (
         <>
           {history.length === 19 && currentQuestion && (
   <div className="mb-4 text-xl font-bold text-red-600 animate-pulse">
     🎯 This is the LAST question!
   </div>
 )}
 
 <p className="text-lg mb-6 text-gray-800 font-medium">
   Question: <span className="italic">{currentQuestion}</span>
 </p>
 
           <div className="grid grid-cols-2 gap-6 mb-6">
             <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-indigo-200">
               <p className="mb-4 font-bold text-yellow-400 text-lg">👤 Player 1</p>
               <div className="space-x-3">
                 <button
                   onClick={() => submitAnswer(1, "Yes")}
                   className={`px-6 py-2 rounded-full font-bold text-lg ${
                     player1Answer === "Yes"
                       ? "bg-green-500 text-white scale-105"
                       : "bg-green-100 text-green-800 hover:bg-green-200"
                   }`}
                 >
                   ✅ Yes
                 </button>
                 <button
                   onClick={() => submitAnswer(1, "No")}
                   className={`px-6 py-2 rounded-full font-bold text-lg ${
                     player1Answer === "No"
                       ? "bg-red-500 text-white scale-105"
                       : "bg-red-100 text-red-800 hover:bg-red-200"
                   }`}
                 >
                   ❌ No
                 </button>
               </div>
             </div>
 
             <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-pink-200">
               <p className="mb-4 font-bold text-purple-800 text-lg">👤 Player 2</p>
               <div className="space-x-3">
                 <button
                   onClick={() => submitAnswer(2, "Yes")}
                   className={`px-6 py-2 rounded-full font-bold text-lg ${
                     player2Answer === "Yes"
                       ? "bg-green-500 text-white scale-105"
                       : "bg-green-100 text-green-800 hover:bg-green-200"
                   }`}
                 >
                   ✅ Yes
                 </button>
                 <button
                   onClick={() => submitAnswer(2, "No")}
                   className={`px-6 py-2 rounded-full font-bold text-lg ${
                     player2Answer === "No"
                       ? "bg-red-500 text-white scale-105"
                       : "bg-red-100 text-red-800 hover:bg-red-200"
                   }`}
                 >
                   ❌ No
                 </button>
               </div>
             </div>
           </div>
 
           {player1Answer && player2Answer && (
             <button
               onClick={nextQuestion}
               className="bg-yellow-400 text-indigo-900 font-extrabold px-6 py-3 rounded-full hover:bg-yellow-500 transition shadow-lg"
             >
               🔄 Next Question
             </button>
           )}
         </>
       )}
 
       {history.length > 0 && (
         <div className="mt-10 text-left">
           <h2 className="text-2xl font-bold mb-4 text-yellow-400">📜 Question History</h2>
           <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
             {history.map((entry, i) => (
               <div
                 key={i}
                 className="bg-white p-4 rounded-xl shadow border-l-8 border-purple-300"
               >
                 <p className="font-semibold text-gray-800">
                   Q{i + 1}: <span className="italic">{entry.question}</span>
                 </p>
                 <p className="mt-1 text-sm text-gray-700">
                   👤 <strong>Player 1:</strong>{" "}
                   <span className="text-green-700">{entry.player1}</span> | 👤{" "}
                   <strong>Player 2:</strong>{" "}
                   <span className="text-pink-700">{entry.player2}</span>
                 </p>
               </div>
             ))}
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default TwoPlayerYesNoGame;