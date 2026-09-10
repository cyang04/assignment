export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
  lastReviewed: string | null;
  lastAnsweredStatus: 'CORRECT' | 'PARTIAL' | 'WRONG' | null;
}
