import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { getUserByEmail } from '../storage';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
  onCancel: () => void;
  promptMessage?: string | null;
}

export default function AuthView({ onAuthSuccess, onCancel, promptMessage }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const avatars = [
    'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png',
    'https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-business-women-avatar-png-image_13805764.png'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password || (!isLogin && !username)) {
      setErrorMessage('Looks like you missed a field — fill everything in and try again.');
      return;
    }

    if (isLogin) {
      const existing = getUserByEmail(email);
      if (!existing) {
        setErrorMessage("We couldn't find an account with that email. Want to sign up instead?");
        return;
      }
      if (existing.password !== password) {
        setErrorMessage("That password doesn't look right. Give it another shot.");
        return;
      }
      onAuthSuccess(existing);
      return;
    }

    if (getUserByEmail(email)) {
      setErrorMessage('Someone already signed up with that email. Try logging in instead.');
      return;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      username: username.trim(),
      email: email.trim(),
      password ,
      avatarUrl: avatars[avatarIndex],
      joinedAt: new Date().toISOString()
    };
    onAuthSuccess(newUser);
  };

  return (
    <div className="w-full max-w-md mx-auto py-12 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-8 border border-slate-100 flex flex-col gap-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full opacity-65 pointer-events-none"></div>

        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#3525cd] flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {isLogin ? 'Hey, welcome back' : 'Create your account'}
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            {isLogin ? 'Sign in to save your scores and build your own quizzes.' : 'Takes less than a minute — then you\'re in.'}
          </p>
        </div>

        {promptMessage && (
          <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-2 text-[#3525cd] text-xs font-bold">
            <Shield className="w-4 h-4 shrink-0" />
            <span>{promptMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 tracking-wider uppercase">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g., JaneDoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-500 tracking-wider uppercase">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-500 tracking-wider uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-800"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-2.5 mt-1">
              <label className="text-[10px] font-black text-slate-500 tracking-wider uppercase">
                Pick your avatar
              </label>
              <div className="flex gap-3 justify-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {avatars.map((ava, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarIndex(idx)}
                    className={`w-11 h-11 rounded-full overflow-hidden object-cover ring-2 transition-all cursor-pointer ${
                      avatarIndex === idx ? 'ring-[#3525cd] scale-105 shadow-xs' : 'ring-transparent opacity-65'
                    }`}
                  >
                    <img src={ava} alt="avatar selection" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#3525cd] hover:bg-indigo-900 text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <span>{isLogin ? 'Sign in' : 'Create account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-50 pt-4 flex flex-col gap-2.5 items-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage(null);
            }}
            className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
          >
            {isLogin ? "New here? Create an account" : 'Already have an account? Sign in'}
          </button>
          
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            Keep browsing as a guest
          </button>
        </div>

      </div>
    </div>
  );
}
