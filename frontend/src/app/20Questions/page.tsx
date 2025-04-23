'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const GAME_ID = 'default-game';

const TwoPlayerYesNoGame = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [player1Answer, setPlayer1Answer] = useState(null);
  const [player2Answer, setPlayer2Answer] = useState(null);
  const [history, setHistory] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const isGameOver = history.length >= 20;

  useEffect(() => {
    const id = uuidv4();
    setPlayerId(id);

    const gameRef = doc(db, 'games', GAME_ID);

    const joinGame = async () => {
      const gameSnap = await getDoc(gameRef);
      const data = gameSnap.data();
      const currentPlayers = data?.players || [];

      if (!currentPlayers.includes(id)) {
        const newPlayers = [...currentPlayers, id];
        await updateDoc(gameRef, {
          players: newPlayers,
        }).catch(() => {
          setDoc(gameRef, {
            players: [id],
            history: [],
          });
        });
      }
    };

    joinGame();

    const unsub = onSnapshot(gameRef, (docSnap) => {
      const data = docSnap.data();
      if (data) {
        setCurrentQuestion(data.currentQuestion || null);
        setPlayer1Answer(data.player1Answer || null);
        setPlayer2Answer(data.player2Answer || null);
        setHistory(data.history || []);
        setPlayers(data.players || []);
      }
    });

    return () => unsub();
  }, []);

  const submitQuestion = async () => {
    if (questionInput.trim() === '') return;
    if (history.length >= 20) {
      alert("You've reached the maximum of 20 questions!");
      return;
    }

    await updateDoc(doc(db, 'games', GAME_ID), {
      currentQuestion: questionInput.trim(),
      player1Answer: null,
      player2Answer: null,
    });
    setQuestionInput('');
  };

  const submitAnswer = async (player, answer) => {
    const key = player === 1 ? 'player1Answer' : 'player2Answer';
    await updateDoc(doc(db, 'games', GAME_ID), {
      [key]: answer,
    });
  };

  const nextQuestion = async () => {
    if (currentQuestion && player1Answer && player2Answer) {
      const newEntry = {
        question: currentQuestion,
        player1: player1Answer,
        player2: player2Answer,
      };

      await updateDoc(doc(db, 'games', GAME_ID), {
        history: arrayUnion(newEntry),
        currentQuestion: null,
        player1Answer: null,
        player2Answer: null,
      });
    }
  };

  const role = history.length % 2 === 0 ? 1 : 2;

  if (players.length < 2) {
   /* return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-8">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">⏳ Waiting for other players...</h2>
        <p className="text-lg text-gray-700 mb-6">Share this game link with a friend to start playing.</p>
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Players Connected:</h3>
          <ul className="text-sm text-gray-800">
            {players.map((p, i) => (
              <li key={i} className="mb-1">
                👤 Player {i + 1}: <code className="bg-gray-100 px-2 py-1 rounded">{p.slice(0, 8)}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ); */
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-yellow-300 via-pink-400 to-indigo-500 rounded-3xl shadow-2xl text-center border-4 border-dashed border-indigo-300">
      <div className="flex justify-center items-center mb-6">
        <span className="text-5xl mr-2">🧠</span>
        <h1 className="text-4xl font-extrabold text-indigo-800">20 Questions: Multiplayer</h1>
      </div>

      {!currentQuestion && !isGameOver && role === 1 ? (
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
          {currentQuestion && (
            <>
              <p className="text-lg mb-6 text-gray-800 font-medium">
                Question: <span className="italic">{currentQuestion}</span>
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <PlayerAnswerBox
                  label="Player 1"
                  player={1}
                  current={player1Answer}
                  onSubmit={submitAnswer}
                />
                <PlayerAnswerBox
                  label="Player 2"
                  player={2}
                  current={player2Answer}
                  onSubmit={submitAnswer}
                />
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
        </>
      )}

      {history.length > 0 && (
        <div className="mt-10 text-left">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">📜 Question History</h2>
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
                  👤 <strong>Player 1:</strong>{' '}
                  <span className="text-green-700">{entry.player1}</span> | 👤{' '}
                  <strong>Player 2:</strong>{' '}
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

const PlayerAnswerBox = ({ label, player, current, onSubmit }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border-2">
    <p className="mb-4 font-bold text-lg">👤 {label}</p>
    <div className="space-x-3">
      <button
        onClick={() => onSubmit(player, 'Yes')}
        className={`px-6 py-2 rounded-full font-bold text-lg ${
          current === 'Yes'
            ? 'bg-green-500 text-white scale-105'
            : 'bg-green-100 text-green-800 hover:bg-green-200'
        }`}
      >
        ✅ Yes
      </button>
      <button
        onClick={() => onSubmit(player, 'No')}
        className={`px-6 py-2 rounded-full font-bold text-lg ${
          current === 'No'
            ? 'bg-red-500 text-white scale-105'
            : 'bg-red-100 text-red-800 hover:bg-red-200'
        }`}
      >
        ❌ No
      </button>
    </div>
  </div>
);

export default TwoPlayerYesNoGame;