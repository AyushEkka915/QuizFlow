import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, Users, ArrowRight, Award, Flame } from 'lucide-react';
import { Quiz, Category } from '../types';

interface BrowseProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: string) => void;
  onCreateQuizClick: () => void;
}

export default function BrowseView({ quizzes, onSelectQuiz, onCreateQuizClick }: BrowseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Science', 'Math', 'Tech', 'History', 'Fun'];

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
      const matchesSearch = 
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.authorName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [quizzes, searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-10">
      
      {/* Hero Header Area */}
      <div className="flex flex-col gap-3 items-center text-center max-w-3xl mx-auto w-full">
        <h1 className="text-3.5xl md:text-4.5xl font-extrabold text-slate-900 tracking-tight leading-tight select-none">
          Find a quiz worth taking
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl">
          Science, math, tech, history, or just for fun — pick a topic and see how you do. No account needed to play.
        </p>

        {/* Search Input Bar */}
        <div className="w-full relative mt-4 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#3525cd] transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, topic, or who made it..."
            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-11 pr-24 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] shadow-sm hover:shadow-md transition-all font-medium"
          />
          <button className="absolute inset-y-1.5 right-1.5 bg-[#3525cd] text-white px-5 rounded-lg text-xs font-bold hover:bg-indigo-900 transition-colors">
            Search
          </button>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3525cd] text-white'
                    : 'bg-[#f5f2ff] text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
          
          <button className="px-5 py-2 rounded-full bg-[#f5f2ff] text-slate-600 hover:bg-slate-100 border border-slate-100 text-xs font-bold flex items-center gap-1 cursor-not-allowed">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Quizzes List Output */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
            All quizzes
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {filteredQuizzes.length} {filteredQuizzes.length === 1 ? 'quiz' : 'quizzes'}
          </span>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuizzes.map((quiz) => (
              <article
                key={quiz.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Image Area */}
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={quiz.image || 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=60'}
                    alt={quiz.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-xs text-slate-800 font-extrabold px-3 py-1 rounded-md text-[10px] uppercase shadow-xs tracking-wider">
                      {quiz.category}
                    </span>
                  </div>

                  {/* Featured tag */}
                  {quiz.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-500 text-white font-extrabold px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3 fill-white stroke-none" />
                        <span>Popular</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={quiz.authorAvatar} 
                      alt={quiz.authorName} 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-bold text-slate-400 hover:text-[#3525cd] transition-colors">
                      {quiz.authorName}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-800 leading-snug mb-2 group-hover:text-[#3525cd] transition-colors line-clamp-1">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2 mb-4 flex-1">
                    {quiz.description}
                  </p>

                  {/* Metadata Stats row */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 mb-4 bg-slate-50/50 -mx-6 px-6 py-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <BookOpen className="w-3.5 h-3.5 text-[#3525cd]" />
                      <span>{quiz.questions.length} Questions</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{quiz.plays} Plays</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectQuiz(quiz.id)}
                    className="w-full bg-[#f5f2ff] hover:bg-[#3525cd] hover:text-white text-[#3525cd] border border-indigo-100 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex justify-center items-center gap-1 cursor-pointer group-hover:shadow-xs"
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-16 px-6 flex flex-col items-center text-center max-w-xl mx-auto">
            <Award className="w-12 h-12 text-slate-300 stroke-[1.5] mb-4" />
            <h3 className="text-md font-bold text-slate-800 mb-1">Nothing matched that</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Try a different search or category — or go ahead and make the quiz you're looking for.
            </p>
            <button
              onClick={onCreateQuizClick}
              className="bg-[#3525cd] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-900 shadow-sm transition-colors cursor-pointer"
            >
              Make your own quiz
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
