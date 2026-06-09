import React from 'react';
import { Award, BookOpen, Clock, Flame, ChevronRight, Play, Archive, HelpCircle, Trophy, BarChart3 } from 'lucide-react';
import { Attempt, Category } from '../types';

interface DashboardProps {
  attempts: Attempt[];
  onTakeQuizAgain: (quizId: string) => void;
  onNavigateToBrowse: () => void;
}

export default function DashboardView({ attempts, onTakeQuizAgain, onNavigateToBrowse }: DashboardProps) {
  
  const totalAttempts = attempts.length;
  
  const avgAccuracy = totalAttempts > 0 
    ? Math.round(attempts.reduce((sum, att) => sum + (att.score / att.totalQuestions), 0) / totalAttempts * 100)
    : 0;

  const totalTimeSpentMins = Math.round(
    attempts.reduce((sum, att) => sum + att.timeSpentSeconds, 0) / 60
  );

  const perfectScores = attempts.filter(att => att.score === att.totalQuestions).length;

  // Track counts per category
  const categoryCounts = attempts.reduce((acc, curr) => {
    acc[curr.quizCategory] = (acc[curr.quizCategory] || 0) + 1;
    return acc;
  }, {} as { [key in Category]?: number });

  let favoriteCategory: Category = 'All';
  let maxCount = 0;
  Object.entries(categoryCounts).forEach(([cat, val]) => {
    if (val && val > maxCount) {
      maxCount = val;
      favoriteCategory = cat as Category;
    }
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-10">
      
      {/* Upper Title Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2.5xl md:text-3xl font-black text-slate-900 tracking-tight">
            Your dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-0.5">
            A quick look at how you've been doing on quizzes.
          </p>
        </div>
        
        <button
          onClick={onNavigateToBrowse}
          className="bg-[#3525cd] hover:bg-indigo-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Take another quiz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {totalAttempts > 0 ? (
        <>
          {/* KPI Dashboard Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            <article className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-3">
              <div className="w-10 h-10 bg-indigo-50 text-[#3525cd] rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">
                  {totalAttempts}
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                  Quizzes taken
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">
                  {avgAccuracy}%
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                  Average score
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">
                  {totalTimeSpentMins}m
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                  Time spent
                </p>
              </div>
            </article>

            <article className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-3">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">
                  {perfectScores}
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                  Perfect scores
                </p>
              </div>
            </article>

          </section>

          {/* Central Panel Layout for Analytics Visual with Attempts logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visual Analytics timeline score trend */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base mb-1 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#3525cd]" />
                  <span>How your scores look</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Your last few attempts, from oldest to newest.
                </p>
              </div>

              {/* Styled SVG Trend Line Chart */}
              <div className="h-44 w-full mt-6 relative select-none flex items-end justify-between px-2">
                
                {/* Horizontal baseline guides */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-slate-100"></div>
                <div className="absolute inset-x-0 bottom-[25%] h-[1px] bg-slate-50"></div>
                <div className="absolute inset-x-0 bottom-[50%] h-[1px] bg-slate-100/70 border-dashed border-b border-slate-200"></div>
                <div className="absolute inset-x-0 bottom-[75%] h-[1px] bg-slate-50"></div>
                <div className="absolute inset-x-0 top-0 h-[1px] bg-slate-100"></div>

                {/* Y-axis percent keys helpers */}
                <span className="absolute left-1 top-1 text-[9px] font-bold text-slate-300">100%</span>
                <span className="absolute left-1 bottom-[51%] text-[9px] font-bold text-slate-300">50%</span>
                
                {/* Custom layout of vertical metrics pillars */}
                <div className="w-full flex justify-around items-end h-full z-10 pt-4">
                  {attempts.slice(-6).map((att, index) => {
                    const accuracy = Math.round((att.score / att.totalQuestions) * 100);
                    const pillColor = accuracy >= 80 
                      ? 'bg-emerald-500' 
                      : accuracy >= 50 
                        ? 'bg-[#3525cd]' 
                        : 'bg-rose-500';

                    return (
                      <div key={att.id} className="flex flex-col items-center gap-2 h-full justify-end group/bar relative">
                        {/* Tooltip */}
                        <div className="absolute -top-6 bg-slate-800 text-white rounded px-2 py-0.5 text-[9px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-xs font-mono">
                          {accuracy}% ({att.score}/{att.totalQuestions})
                        </div>

                        {/* Interactive pillar bar with hover state */}
                        <div 
                          className={`w-8 rounded-t-md transition-all duration-300 group-hover/bar:brightness-105 ${pillColor}`}
                          style={{ height: `${Math.max(10, accuracy)}%` }}
                        ></div>
                        
                        <span className="text-[9px] text-slate-400 font-bold max-w-[50px] truncate">
                          T{index + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>← Older</span>
                <span>Most played: <strong className="text-slate-600 font-extrabold">{favoriteCategory}</strong></span>
              </div>
            </div>

            {/* Quick Profile Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h3 className="font-extrabold text-slate-800 text-sm">
                  Quick highlights
                </h3>
                
                <div className="flex flex-col gap-3 text-xs font-medium">
                  <div className="flex justify-between items-center bg-violet-50/50 p-3 rounded-xl border border-indigo-50/60">
                    <span className="text-slate-500">Perfect scores</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-indigo-100 font-bold text-[#3525cd] font-mono">
                      {perfectScores}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50/50 p-3 rounded-xl border border-emerald-50/60">
                    <span className="text-slate-500">Overall vibe</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-100 font-bold text-emerald-700 font-mono">
                      {avgAccuracy > 75 ? 'On a roll' : 'Getting there'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 mt-4 items-center">
                <HelpCircle className="w-8 h-8 text-indigo-400 self-start stroke-[1.5]" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-slate-800 leading-none">
                    Want to improve?
                  </span>
                  <p className="text-[10px] text-slate-400 leading-normal mt-1">
                    After each quiz, scroll through the question review to see what you got wrong — then try again.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Results attempting history lists logs */}
          <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col gap-6">
            <h3 className="font-extrabold text-slate-800 text-base">
              Recent quizzes
            </h3>

            <div className="flex flex-col gap-1">
              {attempts.slice().reverse().map((att) => {
                const percent = Math.round((att.score / att.totalQuestions) * 100);
                const scoreColor = percent >= 80 
                  ? 'text-emerald-600 bg-emerald-50 border border-emerald-100/50' 
                  : percent >= 50 
                    ? 'text-indigo-600 bg-indigo-50 border border-indigo-100/50' 
                    : 'text-rose-600 bg-rose-50 border border-rose-100/50';

                return (
                  <article
                    key={att.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50/50 rounded-xl transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Interactive round visual metric */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-mono font-black text-xs ${scoreColor}`}>
                        {percent}%
                      </div>
                      
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-extrabold text-xs text-slate-800 truncate max-w-sm sm:max-w-md">
                          {att.quizTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold">
                          <span className="bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 font-bold">
                            {att.quizCategory}
                          </span>
                          <span>•</span>
                          <span>{att.totalQuestions} Questions</span>
                          <span>•</span>
                          <span>{Math.round(att.timeSpentSeconds)}s duration</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-[10px] text-slate-400 font-bold tabular-nums">
                        {new Date(att.completedAt).toLocaleDateString()}
                      </span>
                      
                      <button
                        onClick={() => onTakeQuizAgain(att.quizId)}
                        className="bg-slate-100 hover:bg-[#3525cd] hover:text-white text-[#3525cd] font-bold text-[10px] px-3 py-1.5 rounded-lg border border-indigo-50/30 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current stroke-none" />
                        <span>Retake</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-16 px-6 flex flex-col items-center text-center max-w-xl mx-auto">
          <Archive className="w-12 h-12 text-slate-300 stroke-[1.5] mb-4" />
          <h3 className="text-md font-bold text-slate-800 mb-1">Nothing here yet</h3>
          <p className="text-xs text-slate-400 mb-6 font-medium">
            Once you finish a quiz while signed in, your scores and history will show up here. Go take one!
          </p>
          <button
            onClick={onNavigateToBrowse}
            className="bg-[#3525cd] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-900 shadow-sm transition-colors cursor-pointer"
          >
            Browse quizzes
          </button>
        </div>
      )}

    </div>
  );
}
