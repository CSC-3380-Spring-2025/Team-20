interface Flashcard {
    question: string;
    answer?: boolean;
  }
  
  interface InterestCategory {
    category: string;
    questions: Flashcard[];
  }
  
  class FlashcardGame {
    private interests: InterestCategory[] = [];
    private currentFlashcards: Flashcard[] = [];
    private currentQuestionIndex: number = 0;
  
    // Add an interest and related questions
    addInterestCategory(category: string, questions: string[]): void {
      const flashcards: Flashcard[] = questions.map((question) => ({
        question,
        answer: undefined,
      }));
      const interestCategory: InterestCategory = {
        category,
        questions: flashcards,
      };
      this.interests.push(interestCategory);
    }
  
    // Start the game by selecting a random interest category
    startGame(): void {
      if (this.interests.length === 0) {
        alert("Please add some interests first.");
        return;
      }
  
      const randomCategory = this.getRandomInterestCategory();
      this.currentFlashcards = randomCategory.questions;
      this.currentQuestionIndex = 0;
  
      this.updateGameUI(randomCategory.category);
      this.askQuestion();
    }
  
    // Ask a question from the current flashcards
    askQuestion(): void {
      if (this.currentQuestionIndex < this.currentFlashcards.length) {
        const flashcard = this.currentFlashcards[this.currentQuestionIndex];
        this.updateQuestionUI(flashcard.question);
      } else {
        this.endGame();
      }
    }
  
    // Submit an answer for the current question
    submitAnswer(answer: boolean): void {
      if (this.currentQuestionIndex < this.currentFlashcards.length) {
        this.currentFlashcards[this.currentQuestionIndex].answer = answer;
        this.currentQuestionIndex++;
        this.askQuestion();
      }
    }
  
    // Get a random interest category
    private getRandomInterestCategory(): InterestCategory {
      const randomIndex = Math.floor(Math.random() * this.interests.length);
      return this.interests[randomIndex];
    }
  
    // Update the Game UI for Category Name and Question
    private updateGameUI(category: string): void {
      document.getElementById('game')!.style.display = 'block';
      document.getElementById('start-screen')!.style.display = 'none';
      document.getElementById('category-name')!.textContent = category;
      document.getElementById('total-questions')!.textContent = this.currentFlashcards.length.toString();
      document.getElementById('current-question-index')!.textContent = (this.currentQuestionIndex + 1).toString();
    }
  
    private updateQuestionUI(question: string): void {
      document.getElementById('question')!.textContent = question;
      document.getElementById('current-question-index')!.textContent = (this.currentQuestionIndex + 1).toString();
    }
  
    private endGame(): void {
      alert("Game over!");
      document.getElementById('game')!.style.display = 'none';
      document.getElementById('start-screen')!.style.display = 'block';
    }
  }
  
  // UI Elements
  const game = new FlashcardGame();
  const startGameButton = document.getElementById('start-game') as HTMLButtonElement;
  const addCategoryButton = document.getElementById('add-category') as HTMLButtonElement;
  const yesButton = document.getElementById('yes-btn') as HTMLButtonElement;
  const noButton = document.getElementById('no-btn') as HTMLButtonElement;
  
  startGameButton.addEventListener('click', () => game.startGame());
  
  addCategoryButton.addEventListener('click', () => {
    const categoryInput = document.getElementById('category') as HTMLInputElement;
    const questionsInput = document.getElementById('questions') as HTMLTextAreaElement;
  
    const category = categoryInput.value.trim();
    const questions = questionsInput.value.split(',').map((q) => q.trim());
  
    if (category && questions.length > 0) {
      game.addInterestCategory(category, questions);
      alert('Category added!');
      categoryInput.value = '';
      questionsInput.value = '';
    } else {
      alert('Please enter a valid category and questions.');
    }
  });
  
  // Yes and No buttons
  yesButton.addEventListener('click', () => game.submitAnswer(true));
  noButton.addEventListener('click', () => game.submitAnswer(false));
  