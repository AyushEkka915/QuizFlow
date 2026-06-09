import React from 'react';
import { Network } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left column */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
            <Network className="w-6 h-6 text-indigo-400 stroke-[3]" />
            <span className="text-xl font-black text-white tracking-tight">QuizFlow</span>
          </div>
          <p className="text-sm text-slate-400 text-center md:text-left">
            A simple place to make quizzes, take quizzes, and see how you stack up.
          </p>
          <span className="text-xs text-slate-500 mt-1">
            &copy; {currentYear} QuizFlow. Made for people who like to learn stuff.
          </span>
        </div>

        {/* Right column: Navigation links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <a href="#" className="text-slate-400 hover:text-indigo-400 hover:underline transition-all duration-150 text-xs font-semibold">
            Privacy Policy
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-400 hover:underline transition-all duration-150 text-xs font-semibold">
            Terms of Service
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-400 hover:underline transition-all duration-150 text-xs font-semibold">
            Help Center
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-400 hover:underline transition-all duration-150 text-xs font-semibold">
            Contact Us
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-400 hover:underline transition-all duration-150 text-xs font-semibold">
            Careers
          </a>
        </div>

      </div>
    </footer>
  );
}
