export interface Flashcard {
  id: number;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
  lastAnsweredAt: string | null;
  lastAnsweredStatus: 'CORRECT' | 'PARTIAL' | 'WRONG' | null;
}

export interface CategorySummary {
  name: string;
  count: number;
}
