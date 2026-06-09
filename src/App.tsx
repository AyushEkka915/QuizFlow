import React, { useState } from 'react';
import { User, Quiz, Attempt, Category } from './types';
import { DEFAULT_QUIZZES } from './data/defaultQuizzes';
import {
  getSessionUser,
  setSessionUser,
  saveUser,
  getAttemptsForUser,
  saveAttempt,
  getSavedQuizzes,
  saveQuizzes,
} from './storage';

// Layout and Modular components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import BrowseView from './components/BrowseView';
import CreateQuizView from './components/CreateQuizView';
import TakeQuizView from './components/TakeQuizView';
import ResultsView from './components/ResultsView';
import AuthView from './components/AuthView';
import DashboardView from './components/DashboardView';


import { BookOpen, Users, ArrowRight } from 'lucide-react';

export default function App() {
  
  const [currentView, setCurrentView] = useState<string>('home');
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => getSessionUser());
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = getSavedQuizzes();
    return [...saved, ...DEFAULT_QUIZZES];
  });
  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const user = getSessionUser();
    return user ? getAttemptsForUser(user.id) : [];
  });

  
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [activeAttempt, setActiveAttempt] = useState<Attempt | null>(null);
  const [pendingView, setPendingView] = useState<string | null>(null);
  const [authPrompt, setAuthPrompt] = useState<string | null>(null);

  const SIGN_IN_PROMPTS: Record<string, string> = {
    create: 'You\'ll need an account to create and save your own quizzes.',
    stats: 'Sign in to see your scores and quiz history.',
  };

  const requireSignIn = (view: string): boolean => {
    if (currentUser) return true;

    const prompt = SIGN_IN_PROMPTS[view];
    if (prompt) {
      setAuthPrompt(prompt);
      setPendingView(view);
      setCurrentView('auth');
      return false;
    }

    return true;
  };

  const handleAuthSuccess = (user: User) => {
    saveUser(user);
    setSessionUser(user);
    setCurrentUser(user);
    setAttempts(getAttemptsForUser(user.id));
    setQuizzes([ ...getSavedQuizzes(), ...DEFAULT_QUIZZES,]);

    const destination = pendingView ?? 'home';
    setPendingView(null);
    setAuthPrompt(null);
    setCurrentView(destination);
  };

  const handleAuthCancel = () => {
    setPendingView(null);
    setAuthPrompt(null);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setSessionUser(null);
    setCurrentUser(null);
    setAttempts([]);
    setQuizzes([...getSavedQuizzes(),...DEFAULT_QUIZZES,]);
    setCurrentView('home');
  };

  // Quiz Select Handler
  const handleSelectQuiz = (quizId: string) => {
    const q = quizzes.find((quiz) => quiz.id === quizId);
    if (q) {
      setSelectedQuiz(q);
      setCurrentView('playing');
    }
  };

  // Completion Handler
  const handleFinishQuiz = (selectedAnswers: { [questionId: string]: number }, timeSpentSeconds: number) => {
    if (!selectedQuiz) return;

    // Calculate score
    let score = 0;
    selectedQuiz.questions.forEach((q) => {
      const correctIndex = q.correctAnswerIndex;
      const userSelectedIndex = selectedAnswers[q.id];
      if (userSelectedIndex === correctIndex) {
        score++;
      }
    });

    const newAttempt: Attempt = {
      id: `attempt_${Date.now()}`,
      userId: currentUser?.id || 'guest',
      quizId: selectedQuiz.id,
      quizTitle: selectedQuiz.title,
      quizCategory: selectedQuiz.category,
      score,
      totalQuestions: selectedQuiz.questions.length,
      selectedAnswers,
      timeSpentSeconds,
      completedAt: new Date().toISOString()
    };

    if (currentUser) {
      saveAttempt(newAttempt);
      setAttempts((prev) => [...prev, newAttempt]);
    }
    
    // Update increment plays rate
    setQuizzes((prev) =>
      prev.map((q) => (q.id === selectedQuiz.id ? { ...q, plays: q.plays + 1 } : q))
    );

    setActiveAttempt(newAttempt);
    setCurrentView('results');
  };

  // Handle Save Quiz back from Builder custom form 
  const handleSaveQuiz = (draft: Partial<Quiz>) => {
    const newQuiz: Quiz = {
      id: `quiz_${Date.now()}`,
      title: draft.title || 'Untitled quiz',
      description: draft.description || 'No description yet.',
      category: draft.category || 'Science',
      questions: draft.questions || [],
      authorId: draft.authorId || currentUser?.id || 'guest',
      authorName: draft.authorName || currentUser?.username || 'Guest',
      authorAvatar: draft.authorAvatar || currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=60',
      plays: 0,
      isFeatured: false,
      image: draft.image,
      createdAt: new Date().toISOString()
    };

    setQuizzes((prev) => {
      const updated = [newQuiz, ...prev];
      // Save only user-created quizzes
      saveQuizzes(updated.filter(q => q.authorId !== "system"));
      return updated;
    });
    setCurrentView('browse');
  };

  const handleNavigate = (view: string) => {
    if (!requireSignIn(view)) return;
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5fd]">
      {/* 
        Hide normal header during quiz gameplay workspace 
        to ensure full concentration / focus mode.
      */}
      {currentView !== 'playing' && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Main Orchestrator Panels */}
      <main className="flex-1 w-full flex flex-col">
        {currentView === 'home' && (
          <div className="flex flex-col w-full animate-fade-in">
            {/* Elegant Hero Callout */}
            <Hero
              onGetStarted={() => setCurrentView('browse')}
              onBrowse={() => setCurrentView('browse')}
            />

            {/* CURATED POPULAR SELECTION FOR IMMEDIATE TRIAL */}
            <section className="bg-white border-t border-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                      🔥 Popular right now
                    </span>
                    <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-slate-900 mt-3 tracking-tight">
                      Quizzes to try first
                    </h2>
                  </div>
                  <button
                    onClick={() => setCurrentView('browse')}
                    className="text-[#3525cd] hover:text-indigo-900 font-extrabold text-xs flex items-center gap-1 group/btn cursor-pointer py-1"
                  >
                    <span>View all quizzes</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quizzes.slice(0, 4).map((quiz) => (
                    <article
                      key={quiz.id}
                      onClick={() => handleSelectQuiz(quiz.id)}
                      className="group bg-slate-50 hover:bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-slate-100/50 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={quiz.image}
                          alt={quiz.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="bg-white/90 backdrop-blur-xs text-slate-800 font-black px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                            {quiz.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-sm font-black text-slate-800 line-clamp-1 mb-1 leading-snug group-hover:text-[#3525cd] transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed mb-4 flex-1">
                          {quiz.description}
                        </p>

                        <div className="flex justify-between items-center bg-slate-100/40 p-2 rounded-xl border border-slate-100/30">
                          <span className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#3525cd]" />
                            <span>{quiz.questions.length} Qs</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{quiz.plays} Plays</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Steps explanations */}
            <HowItWorks />
          </div>
        )}

        {currentView === 'browse' && (
          <BrowseView
            quizzes={quizzes}
            onSelectQuiz={handleSelectQuiz}
            onCreateQuizClick={() => handleNavigate('create')}
          />
        )}

        {currentView === 'create' && (
          <CreateQuizView
            onSave={handleSaveQuiz}
            onCancel={() => setCurrentView('browse')}
            authorName={currentUser?.username || 'Guest'}
            authorAvatar={currentUser?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoN8rxPFw1CDpWURm-0UpqxUjAmw-8NE1P84qX1taHCRuLjBcerSyNr3ODvumjL7QCU1BBaysnqVHgRZif48U1HYTuMfhCDpf9oQuzlQZW6Meo8617jEl7nZsrAx-Crjk-L6dHG3ck5-CirlIU2OsXPSMCADk1UeLTo480WIrp5Y8vOGGeFvnpfFwRmlkP4-Y_V_AnNKCLETmP0JRvm5LVTwUPiVQjZys0O59Yus7v8yRWUymueGsbIQlvV6Azr2O2kIAyDv9Ihqjy'}
          />
        )}

        {currentView === 'playing' && selectedQuiz && (
          <TakeQuizView
            quiz={selectedQuiz}
            onFinish={handleFinishQuiz}
            onExit={() => setCurrentView('browse')}
          />
        )}

        {currentView === 'results' && selectedQuiz && activeAttempt && (
          <ResultsView
            quiz={selectedQuiz}
            attempt={activeAttempt}
            onRetake={() => handleSelectQuiz(selectedQuiz.id)}
            onBrowse={() => setCurrentView('browse')}
          />
        )}

        {currentView === 'auth' && (
          <AuthView
            onAuthSuccess={handleAuthSuccess}
            onCancel={handleAuthCancel}
            promptMessage={authPrompt}
          />
        )}

        {currentView === 'stats' && (
          <DashboardView
            attempts={attempts}
            onTakeQuizAgain={handleSelectQuiz}
            onNavigateToBrowse={() => setCurrentView('browse')}
          />
        )}
      </main>

      {/* Hide general footer during active assessment gameplay */}
      {currentView !== 'playing' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
