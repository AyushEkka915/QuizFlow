import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onBrowse: () => void;
}

export default function Hero({ onGetStarted, onBrowse }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Left content column */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10 text-center lg:text-left items-center lg:items-start select-none">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full py-1.5 px-3.5 text-[#3525cd] text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 fill-indigo-400" />
          <span>Quizzes, but actually fun</span>
        </div>

        <h1 className="font-extrabold text-slate-900 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] animate-fade-in">
          Make quizzes. Take quizzes. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3525cd] to-indigo-600">See how you did.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
          Whether you want to test yourself, stump your friends, or build something for class — QuizFlow keeps it simple. No clutter, just questions and answers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
          <button
            onClick={onGetStarted}
            className="bg-[#3525cd] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-900 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Jump in</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
          
          <button
            onClick={onBrowse}
            className="bg-white text-[#3525cd] border border-slate-200 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#3525cd]" />
            <span>Browse Quizzes</span>
          </button>
        </div>
      </div>

      {/* Right visualization column */}
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        {/* Rounded offset background plate */}
        <div className="absolute inset-0 bg-[#e2dfff] opacity-30 rounded-[3rem] -rotate-4 scale-105 transform origin-center"></div>
        <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[#89f5e7]/10 rounded-[3rem] rotate-2 scale-95 transform origin-center pointer-events-none"></div>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWdPnx3v7z4Nl8T_sb-I068F_VXgnvoWwVczZafAFZUMWmMV3DGNxRMuv22qO1lOf_coLD0vhwrfsiz25uL5Ci6aA_qWqxwBYl6IDuNy1f2lrFyw66FgizcnNuRcUYsNL6JbeCp637SfBBOcEu8ZGPvfwuBBcnpMlAOdPIJMeezaRXu5zHhQzOXAF1v4XXmMztq8wvDgPhMwLjd76Mqrjx120hPevVsRUrd-pbJh6fNzwMYPGFdRZu3qL8OoCNz5cRtkSgrUiR3cQl"
          alt="Friends taking a quiz together"
          className="relative z-10 w-full max-w-lg h-auto aspect-[1.1] object-cover rounded-3xl shadow-xl border border-white/65"
          referrerPolicy="no-referrer"
        />
      </div>

    </section>
  );
}
