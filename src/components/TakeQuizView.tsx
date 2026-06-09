import React, { useState, useEffect } from 'react';
import { BookOpen, X, Timer, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { Quiz } from '../types';

interface TakeQuizProps {
  quiz: Quiz;
  onFinish: (selectedAnswers: { [questionId: string]: number }, timeSpent: number) => void;
  onExit: () => void;
}

export default function TakeQuizView({ quiz, onFinish, onExit }: TakeQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  
  // 5 minutes total for taking the quiz = 300 seconds
  const [timeLeft, setTimeLeft] = useState(300);
  const totalQuestions = quiz.questions.length;
  
  // Track active time spent taken
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // auto submit when time runs out
          handleFinish(0); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFinish = (forcedTimeLeft?: number) => {
    const usedSeconds = 300 - (forcedTimeLeft !== undefined ? forcedTimeLeft : timeLeft);
    onFinish(selectedAnswers, usedSeconds);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Format time left
  const formatTime = (seconds: number) => {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      
      {/* Specialized Task Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-800">
            <BookOpen className="w-5 h-5 text-[#3525cd]" />
            <h1 className="text-sm font-extrabold truncate max-w-[150px] sm:max-w-sm">
              {quiz.title}
            </h1>
          </div>
          <button
            onClick={onExit}
            className="text-slate-400 hover:text-rose-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4 shrink-0" />
            <span>Leave quiz</span>
          </button>
        </div>

        {/* Dynamic progress bar */}
        <div className="w-full bg-slate-200 h-1.5" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="bg-[#006a61] h-full rounded-r-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </header>

      {/* Main taking canvas */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-3xl animate-fade-in">
          
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Soft decorative visual background blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-slate-100 to-transparent rounded-bl-full opacity-60 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col">
              
              {/* Question status meta bar */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>

                {/* Circular timer badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#f5f2ff] text-[#3525cd] px-3.5 py-1.5 rounded-full border border-indigo-100">
                  <Timer className={`w-4 h-4 ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-[#3525cd]'}`} />
                  <span className="text-xs font-extrabold font-mono tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-snug mb-8">
                {currentQuestion.text}
              </h2>

              {/* Option Radio Choice List */}
              <div className="flex flex-col gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <label
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      className={`group relative flex items-center p-4 md:p-5 rounded-2xl border cursor-pointer hover:border-[#3525cd] hover:bg-indigo-50/50 transition-all duration-150 ${
                        isSelected
                          ? 'border-[#3525cd] bg-[#f5f2ff]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {/* Fake design radio button */}
                      <div className={`w-5.5 h-5.5 shrink-0 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#3525cd] bg-[#3525cd]' : 'border-slate-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      <span className={`text-sm md:text-base ${
                        isSelected ? 'text-slate-900 font-semibold' : 'text-slate-600 transition-colors group-hover:text-slate-900'
                      }`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer wizard navigation */}
      <footer className="bg-white border-t border-slate-100 stick bottom-0 z-40 py-4 shadow-md mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
              currentQuestionIndex === 0
                ? 'opacity-35 cursor-not-allowed text-slate-400'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              onClick={() => handleFinish()}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-800 text-white text-xs font-extrabold shadow-sm hover:shadow-xs transition-all cursor-pointer"
            >
              <span>See my score</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#3525cd] hover:bg-indigo-900 text-white text-xs font-extrabold shadow-sm hover:shadow-xs transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}
