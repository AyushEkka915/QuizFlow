import { User, Attempt, Quiz } from './types';


const USERS_KEY = 'quizflow_users';
const SESSION_KEY = 'quizflow_session';
const ATTEMPTS_KEY = 'quizflow_attempts';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}


const QUIZZES_KEY = "custom_quizzes";

export const getSavedQuizzes = (): Quiz[] => {
  const data = localStorage.getItem(QUIZZES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveQuizzes = (quizzes: Quiz[]) => {
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
};

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredUsers(): User[] {
  return readJson<User[]>(USERS_KEY, []);
}

export function getUserByEmail(email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return getStoredUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function saveUser(user: User): void {
  const users = getStoredUsers().filter((u) => u.id !== user.id);
  writeJson(USERS_KEY, [...users, user]);
}

export function getSessionUser(): User | null {
  const sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) return null;
  return getStoredUsers().find((u) => u.id === sessionId) ?? null;
}

export function setSessionUser(user: User | null): void {
  if (user) {
    localStorage.setItem(SESSION_KEY, user.id);
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getAttemptsForUser(userId: string): Attempt[] {
  return readJson<Attempt[]>(ATTEMPTS_KEY, []).filter((a) => a.userId === userId);
}

export function saveAttempt(attempt: Attempt): void {
  const attempts = readJson<Attempt[]>(ATTEMPTS_KEY, []);
  writeJson(ATTEMPTS_KEY, [...attempts, attempt]);
}
