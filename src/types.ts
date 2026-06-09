export interface User {
  id: string;
  username: string;
  email: string;
  password: string
  avatarUrl: string;
  joinedAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export type Category = 'All' | 'Science' | 'Math' | 'Tech' | 'History' | 'Fun';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: Category;
  questions: Question[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  plays: number;
  isFeatured?: boolean;
  image?: string;
  createdAt: string;
}

export interface Attempt {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  quizCategory: Category;
  score: number;
  totalQuestions: number;
  selectedAnswers: { [questionId: string]: number }; 
  timeSpentSeconds: number;
  completedAt: string;
}
