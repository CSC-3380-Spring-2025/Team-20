'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const WaitingRoom = ({ currentUserId }) => {
  const [waitingPlayers, setWaitingPlayers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'waitingRoom'), async (snapshot) => {
      const others = await Promise.all(
        snapshot.docs
          .map((doc) => doc.data().uid)
          .filter((uid) => uid !== currentUserId)
          .map(async (uid) => {
            const userSnap = await getDoc(doc(db, 'users', uid));
            return {
              uid,
              name: userSnap.exists() ? userSnap.data().displayName || uid : uid,
            };
          })
      );
      setWaitingPlayers(others);
    });

    const addSelfToWaitingRoom = async () => {
      await setDoc(doc(db, 'waitingRoom', currentUserId), {
        uid: currentUserId,
        joinedAt: new Date(),
      });
    };

    addSelfToWaitingRoom();

    return async () => {
      await deleteDoc(doc(db, 'waitingRoom', currentUserId));
      unsub();
    };
  }, [currentUserId]);

  const startGameWith = async (otherPlayerId) => {
    const gameId = uuidv4();
    await setDoc(doc(db, 'games', gameId), {
      players: {
        player1: currentUserId,
        player2: otherPlayerId,
      },
      currentTurn: 'player1',
      currentQuestion: null,
      answers: {
        player1: null,
        player2: null,
      },
      history: [],
      gameOver: false,
      finalMessage: {
        player1: '',
        player2: '',
      },
    });

    await deleteDoc(doc(db, 'waitingRoom', currentUserId));
    await deleteDoc(doc(db, 'waitingRoom', otherPlayerId));

    router.push(`/game/${gameId}`);
  };

  return (
    <div className="p-6 text-center text-white">
      <h2 className="text-2xl mb-4">Waiting Room</h2>
      {waitingPlayers.length === 0 && <p>No one is waiting yet...</p>}
      {waitingPlayers.map((player) => (
        <button
          key={player.uid}
          onClick={() => startGameWith(player.uid)}
          className="bg-blue-600 px-4 py-2 rounded m-2 hover:bg-blue-700"
        >
          Play with {player.name}
        </button>
      ))}
    </div>
  );
};

export default WaitingRoom;
