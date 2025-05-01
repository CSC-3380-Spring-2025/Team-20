'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';

const MultiplayerGame = ({ gameId }) => {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id || 'anonymous';

  const [game, setGame] = useState(null);
  const [questionInput, setQuestionInput] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [opponentContact, setOpponentContact] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'games', gameId), async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setGame(data);

        if (!userRole) {
          const role =
            data.players.player1 === currentUserId
              ? 'player1'
              : data.players.player2 === currentUserId
              ? 'player2'
              : null;
          setUserRole(role);
        }

        if (data.contactShare?.player1 && data.contactShare?.player2) {
          const opponentId =
            userRole === 'player1'
              ? data.players.player2
              : data.players.player1;
          const userSnap = await getDoc(doc(db, 'users', opponentId));
          setOpponentContact(userSnap.exists() ? userSnap.data().socialAccounts : []);
        }
      }
    });

    return () => unsub();
  }, [gameId, userRole]);

  if (!game || !userRole) return <div className="text-white p-6">Loading...</div>;

  const submitQuestion = async () => {
    if (!questionInput.trim()) return;
    await updateDoc(doc(db, 'games', gameId), {
      currentQuestion: questionInput.trim(),
      answers: { player1: null, player2: null }
    });
    setQuestionInput('');
  };

  const submitAnswer = async (answer) => {
    await updateDoc(doc(db, 'games', gameId), {
      [`answers.${userRole}`]: answer
    });
  };

  const proceedToNextQuestion = async () => {
    const newHistory = [
      ...game.history,
      {
        question: game.currentQuestion,
        player1: game.answers.player1,
        player2: game.answers.player2
      }
    ];

    const isLast = newHistory.length >= 20;
    await updateDoc(doc(db, 'games', gameId), {
      history: newHistory,
      currentQuestion: null,
      answers: { player1: null, player2: null },
      gameOver: isLast
    });
  };

  const sendContactRequest = async () => {
    await updateDoc(doc(db, 'games', gameId), {
      [`contactShare.${userRole}`]: true
    });
  };

  const bothAnswered = game.answers.player1 && game.answers.player2;

  return (
    <div className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">🎮 Multiplayer 20 Questions</h1>

      {!game.currentQuestion && !game.gameOver && game.currentTurn === userRole && (
        <div>
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Type your yes/no question..."
            className="text-black p-2 rounded w-full mb-4"
          />
          <button
            onClick={submitQuestion}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Ask
          </button>
        </div>
      )}

      {game.currentQuestion && !game.gameOver && (
        <div>
          <p className="mb-4 text-xl">❓ {game.currentQuestion}</p>
          {!game.answers[userRole] && (
            <div className="space-x-4">
              <button
                onClick={() => submitAnswer('Yes')}
                className="bg-green-500 px-4 py-2 rounded"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => submitAnswer('No')}
                className="bg-red-500 px-4 py-2 rounded"
              >
                ❌ No
              </button>
            </div>
          )}

          {bothAnswered && game.currentTurn === userRole && (
            <button
              onClick={proceedToNextQuestion}
              className="bg-yellow-500 px-4 py-2 rounded mt-4"
            >
              🔄 Next Question
            </button>
          )}
        </div>
      )}

      {game.gameOver && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">🎉 Game Over!</h2>
          <p className="mb-4">Would you like to share contact info with your opponent?</p>
          {!game.contactShare?.[userRole] ? (
            <button
              onClick={sendContactRequest}
              className="bg-purple-600 px-4 py-2 rounded"
            >
              🤝 Yes, share my contact info
            </button>
          ) : (
            <p>✅ You've opted in. Waiting for the other player...</p>
          )}

          {opponentContact && (
            <div className="mt-4 bg-white text-black p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">📇 Their contact info:</h3>
              <ul className="list-disc list-inside">
                {opponentContact.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">📜 History</h3>
        <ul className="space-y-2">
          {game.history.map((entry, i) => (
            <li
              key={i}
              className="bg-white text-black p-2 rounded"
            >
              Q{i + 1}: {entry.question} — 👤 P1: {entry.player1} | 👤 P2: {entry.player2}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiplayerGame;