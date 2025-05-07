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

