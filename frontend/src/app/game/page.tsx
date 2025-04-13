"use client";

import React, { useState } from 'react';

//INTERAL IMPORT
import Header from "../components/header"; 
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

interface Flashcard {
  question: string;
  answer?: boolean;
}

interface InterestCategory {
  category: string;
  questions: Flashcard[];
}

export default function Game() {
  const {user} = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-green-500 border-r-5 font-serif hover:bg-green-300"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }



  const [interests, setInterests] = useState<InterestCategory[]>([]);
  const [currentFlashcards, setCurrentFlashcards] = useState<Flashcard[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const [inputCategory, setInputCategory] = useState('');
  const [inputQuestions, setInputQuestions] = useState('');

  const addInterestCategory = () => {
    const trimmedCategory = inputCategory.trim();
    const questionsArray = inputQuestions
      .split(',')
      .map((q) => q.trim())
      .filter((q) => q);

    if (trimmedCategory && questionsArray.length > 0) {
      const newCategory: InterestCategory = {
        category: trimmedCategory,
        questions: questionsArray.map((q) => ({ question: q }))
      };

      setInterests([...interests, newCategory]);
      alert('Category added!');
      setInputCategory('');
      setInputQuestions('');
    } else {
      alert('Please enter a valid category and questions.');
    }
  };

  const startGame = () => {
    if (interests.length === 0) {
      alert('Please add some interests first.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * interests.length);
    const selectedCategory = interests[randomIndex];

    setCategoryName(selectedCategory.category);
    setCurrentFlashcards(selectedCategory.questions);
    setCurrentQuestionIndex(0);
    setIsGameStarted(true);
  };

  const submitAnswer = (answer: boolean) => {
    const updatedFlashcards = [...currentFlashcards];
    updatedFlashcards[currentQuestionIndex].answer = answer;
    setCurrentFlashcards(updatedFlashcards);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentFlashcards.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      alert('Game over!');
      setIsGameStarted(false);
    }
  };

  return (
    <div>
    <Header />
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Flashcard Game!</h1>

      {!isGameStarted ? (
        <div id="start-screen" className="space-y-4">
          <h2 className="text-xl font-semibold">Enter your interests and questions:</h2>

          <div>
            <label htmlFor="category" className="block font-medium">
              Interest Category:
            </label>
            <input
              type="text"
              id="category"
              className="w-full border p-2 rounded"
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
              placeholder="e.g., Sports"
              required
            />
          </div>

          <div>
            <label htmlFor="questions" className="block font-medium">
              Questions (comma separated):
            </label>
            <textarea
              id="questions"
              className="w-full border p-2 rounded"
              value={inputQuestions}
              onChange={(e) => setInputQuestions(e.target.value)}
              placeholder="e.g., Do you like soccer?, Do you play basketball?"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              className="btn bg-blue-600 text-white px-4 py-2 rounded"
              onClick={addInterestCategory}
            >
              Add Category
            </button>
            <button
              className="btn bg-green-600 text-white px-4 py-2 rounded"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div id="game">
          <h2 className="text-2xl font-semibold mb-4">
            Category: <span>{categoryName}</span>
          </h2>

          <p className="text-lg mb-6">{currentFlashcards[currentQuestionIndex]?.question}</p>

          <div className="flex gap-4 mb-4">
            <button
              className="btn bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => submitAnswer(true)}
            >
              Yes
            </button>
            <button
              className="btn bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => submitAnswer(false)}
            >
              No
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {currentFlashcards.length}
          </p>
        </div>
      )}
    </main>
    </div>
  );
}