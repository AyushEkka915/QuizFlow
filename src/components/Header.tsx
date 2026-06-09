import React, { useState } from 'react';
import { Network, Bell, HelpCircle, LogOut, Code, User, Menu, X, Milestone } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: UserType | null;
  onLogout: () => void;
}

export default function Header({ currentView, onNavigate, currentUser, onLogout }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const isActive = (viewName: string) => {
    return currentView === viewName;
  };

  return (
    <header className="sticky top-0 z-50 bg-white ring-1 ring-slate-100 shadow-sm w-full">
      <div className="flex justify-between items-center w-full px-6 md:px-10 h-16 max-w-7xl mx-auto">
        
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center gap-8 md:gap-12">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-2xl font-extrabold text-[#3525cd] flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer"
          >
            <Network className="w-7 h-7 text-[#3525cd] stroke-[3]" />
            <span>QuizFlow</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-6 h-full">
            <button
              onClick={() => handleNavClick('browse')}
              className={`py-1 text-sm font-semibold transition-all cursor-pointer ${
                isActive('browse')
                  ? 'text-[#3525cd] border-b-2 border-[#3525cd] font-bold'
                  : 'text-slate-600 hover:text-[#3525cd]'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => handleNavClick('stats')}
              className={`py-1 text-sm font-semibold transition-all cursor-pointer ${
                isActive('stats')
                  ? 'text-[#3525cd] border-b-2 border-[#3525cd] font-bold'
                  : 'text-slate-600 hover:text-[#3525cd]'
              }`}
            >
              My Stats
            </button>
            <button
              onClick={() => handleNavClick('create')}
              className={`py-1 text-sm font-semibold transition-all cursor-pointer ${
                isActive('create')
                  ? 'text-[#3525cd] border-b-2 border-[#3525cd] font-bold'
                  : 'text-slate-600 hover:text-[#3525cd]'
              }`}
            >
              Create Quiz
            </button>
          </nav>
        </div>

        {/* Right: Actions / Profile */}
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-[#3525cd] transition-colors p-2 rounded-full hover:bg-slate-50 relative cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          <button className="hidden sm:flex text-slate-500 hover:text-[#3525cd] transition-colors p-2 rounded-full hover:bg-slate-50 cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-slate-50 cursor-pointer border border-[#3525cd]/10 transition-colors"
                id="user-menu-button"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.username}
                  className="w-8.5 h-8.5 rounded-full object-cover border border-slate-200"
                />
                <span className="hidden leading-none text-xs font-semibold text-slate-700 pr-1 md:block max-w-[80px] truncate">
                  {currentUser.username}
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-50">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.username}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleNavClick('stats');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#3525cd] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Stats</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        handleNavClick('create');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#3525cd] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      <span>Create Quiz</span>
                    </button>

                    <hr className="border-slate-100 my-1"/>

                    <button
                      onClick={() => {
                        onLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('auth')}
              className="bg-[#3525cd] font-semibold text-white px-5 py-2 text-sm rounded-xl hover:bg-indigo-900 transition-colors shadow-sm cursor-pointer hover:shadow-md"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[#3525cd] hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-3 shadow-md animate-fade-in absolute w-full left-0 z-50">
          <button
            onClick={() => handleNavClick('browse')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              isActive('browse') ? 'bg-indigo-50 text-[#3525cd]' : 'text-slate-600 hover:text-[#3525cd]'
            }`}
          >
            Browse Quizzes
          </button>
          <button
            onClick={() => handleNavClick('stats')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              isActive('stats') ? 'bg-indigo-50 text-[#3525cd]' : 'text-slate-600 hover:text-[#3525cd]'
            }`}
          >
            My Stats
          </button>
          <button
            onClick={() => handleNavClick('create')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              isActive('create') ? 'bg-indigo-50 text-[#3525cd]' : 'text-slate-600 hover:text-[#3525cd]'
            }`}
          >
            Create Quiz
          </button>
          {!currentUser && (
            <button
              onClick={() => handleNavClick('auth')}
              className="mt-2 w-full bg-[#3525cd] font-semibold text-white py-2.5 rounded-xl hover:bg-indigo-900 text-center transition-colors shadow-sm"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}
