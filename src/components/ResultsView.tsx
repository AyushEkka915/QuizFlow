import React from 'react';
import { Award, RefreshCw, Compass, CheckCircle2, XCircle, ArrowRight, Hourglass, Percent } from 'lucide-react';
import { Quiz, Attempt } from '../types';

interface ResultsViewProps {
  quiz: Quiz;
  attempt: Attempt;
  onRetake: () => void;
  onBrowse: () => void;
}

export default function ResultsView({ quiz, attempt, onRetake, onBrowse }: ResultsViewProps) {
  const percentScore = Math.round((attempt.score / attempt.totalQuestions) * 100);

  // Format time spent text
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm}m ${ss}s`;
  };

  const getCelebrationMeta = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) {
      return {
        title: "Perfect score! 🏆",
        text: "You got every single one right. Seriously impressive.",
        color: "text-emerald-600 bg-emerald-50 border-emerald-100"
      };
    } else if (ratio >= 0.7) {
      return {
        title: "Nice work! 🥳",
        text: "You clearly know your stuff. A few more runs and you might nail a perfect score.",
        color: "text-indigo-600 bg-indigo-50 border-indigo-100"
      };
    } else if (ratio >= 0.4) {
      return {
        title: "Not bad! 👍",
        text: "You're on the right track. Scroll down to see what you missed, then give it another go.",
        color: "text-amber-600 bg-amber-50 border-amber-100"
      };
    } else {
      return {
        title: "Room to grow 📚",
        text: "No worries — that's what quizzes are for. Check the answers below and try again when you're ready.",
        color: "text-rose-600 bg-rose-50 border-rose-100"
      };
    }
  };

  const meta = getCelebrationMeta(attempt.score, attempt.totalQuestions);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 flex flex-col gap-8">
      
      {/* Top congrats card */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 flex flex-col items-center text-center relative overflow-hidden">
        {/* Confetti-like ambient gradient backdrops */}
        <div className="absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-tl-full"></div>

        <Award className="w-16 h-16 text-[#3525cd] stroke-[1.5] mb-4 animate-bounce" />
        
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
          You're done!
        </h1>
        <p className="text-slate-400 font-semibold text-xs tracking-wider uppercase mt-1">
          {quiz.title}
        </p>

        {/* Scoring Grid columns */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 my-8 w-full max-w-md">
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col items-center">
            <Percent className="w-4 h-4 text-[#3525cd] mb-1 stroke-[2.5]" />
            <span className="text-xl md:text-2xl font-black text-slate-800 font-mono tracking-tight">{percentScore}%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accuracy</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-xl md:text-2xl font-black text-slate-800 font-mono tracking-tight">{attempt.score}/{attempt.totalQuestions}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Correct</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col items-center">
            <Hourglass className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-xl md:text-2xl font-black text-slate-800 font-mono tracking-tight">{formatDuration(attempt.timeSpentSeconds)}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
          </div>
        </div>

        {/* Contextual description note block */}
        <div className={`p-5 rounded-xl border max-w-xl text-center flex flex-col gap-1.5 ${meta.color}`}>
          <h4 className="font-extrabold text-sm tracking-tight">{meta.title}</h4>
          <p className="text-xs font-semibold leading-relaxed opacity-90">{meta.text}</p>
        </div>

        {/* CTA Actions panel buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={onRetake}
            className="bg-[#3525cd] text-white rounded-xl px-7 py-3 text-xs font-extrabold hover:bg-indigo-900 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
          
          <button
            onClick={onBrowse}
            className="bg-white text-slate-700 hover:text-[#3525cd] border border-slate-200 rounded-xl px-7 py-3 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Find another quiz</span>
          </button>
        </div>
      </section>

      {/* Review details block */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg md:text-xl font-extrabold text-slate-800">
          Question by question
        </h2>

        <div className="flex flex-col gap-5">
          {quiz.questions.map((q, idx) => {
            const userPick = attempt.selectedAnswers[q.id];
            const correctPick = q.correctAnswerIndex;
            const isCorrect = userPick === correctPick;

            return (
              <article
                key={q.id}
                className={`bg-white rounded-2xl border p-5 md:p-6 flex flex-col gap-4 shadow-xs relative overflow-hidden ${
                  isCorrect ? 'border-emerald-100 bg-emerald-50/5' : 'border-rose-100 bg-rose-50/5'
                }`}
              >
                {/* Result header line */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black bg-slate-100 text-slate-600 rounded-md px-2.5 py-1 font-mono">
                    {idx + 1}
                  </span>
                  
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                      <span>You got it</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-rose-600">
                      <XCircle className="w-4 h-4 fill-rose-100" />
                      <span>Not quite</span>
                    </span>
                  )}
                </div>

                {/* Prompt */}
                <h3 className="font-extrabold text-[#1b1b24] text-base md:text-lg leading-snug">
                  {q.text}
                </h3>

                {/* Vertical option blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  {q.options.map((optionText, optIdx) => {
                    const isUserSelected = userPick === optIdx;
                    const isActuallyCorrect = correctPick === optIdx;

                    let optionStyle = "border-slate-100 bg-slate-50 text-slate-600";
                    if (isActuallyCorrect) {
                      optionStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 font-bold";
                    } else if (isUserSelected && !isCorrect) {
                      optionStyle = "border-rose-300 bg-rose-50 text-rose-800 font-bold";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{optionText}</span>
                        {isActuallyCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1.5" />
                        )}
                        {isUserSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-1.5" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Educational friendly line fallback tip */}
                <div className="border-t border-slate-100/80 pt-3 mt-1 text-slate-400 text-xs font-medium">
                  {isCorrect 
                    ? "Nailed it — you knew this one." 
                    : "Worth a second look. The correct answer is highlighted in green above."
                  }
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
