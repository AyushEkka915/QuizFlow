import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Quiz, Question, Category } from '../types';

interface CreateQuizProps {
  onSave: (quiz: Partial<Quiz>) => void;
  onCancel: () => void;
  authorName: string;
  authorAvatar: string;
}

interface DraftQuestion {
  text: string;
  options: string[];
  correctAnswerIndex: number | null;
}

export default function CreateQuizView({ onSave, onCancel, authorName, authorAvatar }: CreateQuizProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Science');
  
  const [questions, setQuestions] = useState<DraftQuestion[]>([
    { text: '', options: ['', '', '', ''], correctAnswerIndex: null }
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories: Category[] = ['Science','Math', 'Tech', 'History', 'Fun'];

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctAnswerIndex: null }
    ]);
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length <= 1) {
      setErrorMessage("You need at least one question — can't publish an empty quiz.");
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].text = text;
    setQuestions(updated);
  };

  const handleOptionTextChange = (qIndex: number, optIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = text;
    setQuestions(updated);
  };

  const handleMarkCorrect = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    updated[qIndex].correctAnswerIndex = optIndex;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    setErrorMessage(null);
    
    
    if (!title.trim()) {
      setErrorMessage("Give your quiz a title first.");
      return;
    }
    
    
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        setErrorMessage(`Question ${i + 1} is blank — write something there.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setErrorMessage(`Option ${j + 1} in question ${i + 1} is empty — fill it in.`);
          return;
        }
      }
      if (q.correctAnswerIndex === null) {
        setErrorMessage(`Question ${i + 1} needs a correct answer — tap the checkmark on the right one.`);
        return;
      }
    }

    
    const formattedQuestions: Question[] = questions.map((q, idx) => ({
      id: `custom_q_${Date.now()}_${idx}`,
      text: q.text,
      options: q.options,
      correctAnswerIndex: q.correctAnswerIndex as number
    }));

    onSave({
      title,
      description,
      category,
      questions: formattedQuestions,
      plays: 0,
      authorId: 'user_created',
      authorName,
      authorAvatar,
      isFeatured: false,
      image: getCategoryImage(category)
    });
  };
  

  const getCategoryImage = (cat: Category) => {
    switch (cat) {
      case 'Science':
        return 'https://www.makeblock.com/cdn/shop/articles/science_1200x1200.jpg?v=1690799592';
      case 'Math':
        return 'https://i.pinimg.com/1200x/74/d2/c8/74d2c812d2ed11db605a7208978933f6.jpg';
      case 'Tech':
        return 'https://i.pinimg.com/1200x/9d/9a/6b/9d9a6b8c7dcf47c88adb535a8e7535ed.jpg';
      case 'History':
        return 'https://i.pinimg.com/736x/a7/1f/7e/a71f7e1bec3257b77932916b43452a86.jpg';
      case 'Fun':
      default:
        return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDramYQIcnC3ej00wM0clfDGcXjx9jOFG0volPXTZPWbtmbencVrSC_-2BC2G7VL20T6q4fgeZ8Fr7nSg-UhXF2JImHCubugPkU3eneNtlgAH6j6mcufi8wKndmjPsIY_ubxq1OJD25ghha5juLyM3egxyMOviIir4nLq7oW1v5zBLXHmZxif2RAoENZa7y-WY3SVceDxPWQ6sxmPFBXvHrl4Lyp_kaMruf7U42uO8oEcuX6DkzqVVHt5OwEbMvfZ5GYOJXu5xSYSXX';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8">
      
      {/* Header Info Banner */}
      <header className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button
          onClick={onCancel}
          className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-[#3525cd] transition-all cursor-pointer hover:shadow-xs"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Make a quiz
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-0.5">
            Write your questions, add answer choices, and mark which one's correct.
          </p>
        </div>
      </header>

      {/* Error Output alert */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3 text-rose-700 text-xs font-bold leading-relaxed">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Details Card */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
              Quiz Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., European History 101"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-400 font-medium text-sm text-slate-800"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm text-slate-700 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this quiz about? Who's it for?"
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-400 font-medium text-sm text-slate-800 resize-none"
          />
        </div>
      </section>

      {/* Questions block builder */}
      <div className="flex flex-col gap-6" id="questions-container">
        {questions.map((q, qIdx) => (
          <article
            key={qIdx}
            className="question-block bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 flex flex-col gap-5 relative group hover:shadow-md transition-shadow duration-200"
          >
            {/* Question block title/action row */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-1">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-indigo-50 text-[#3525cd] rounded-lg font-bold text-xs flex items-center justify-center">
                  {qIdx + 1}
                </span>
                <h3 className="font-extrabold text-slate-800 text-sm">
                  Your question
                </h3>
              </div>
              
              <button
                type="button"
                onClick={() => handleDeleteQuestion(qIdx)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 hover:bg-rose-50 rounded-lg cursor-pointer"
                title="Delete Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Question Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                What do you want to ask?
              </label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                placeholder="e.g., Which planet is known as the Red Planet?"
                className="w-full bg-white border border-slate-100 border-b-2 border-b-slate-200 rounded-none px-0.5 py-2.5 font-bold text-base md:text-lg text-slate-800 placeholder:text-slate-300 focus:border-b-[#3525cd] focus:ring-0"
              />
            </div>

            {/* 4 Choices Grid */}
            <div className="flex flex-col gap-2.5 mt-2">
              <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                Answer choices (tap ✓ on the correct one)
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((optionText, optIdx) => {
                  const isCorrect = q.correctAnswerIndex === optIdx;
                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50/45'
                          : 'border-slate-200 bg-slate-50 focus-within:border-[#3525cd]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleMarkCorrect(qIdx, optIdx)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isCorrect
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'border-2 border-slate-300 hover:border-emerald-500/50 hover:bg-emerald-50 text-transparent hover:text-emerald-500/40'
                        }`}
                        title="Mark as correct answer"
                      >
                        <Check className="w-4 h-4 stroke-[3.5]" />
                      </button>
                      
                      <input
                        type="text"
                        value={optionText}
                        onChange={(e) => handleOptionTextChange(qIdx, optIdx, e.target.value)}
                        placeholder={`Option ${optIdx + 1}`}
                        className={`flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 font-medium ${
                          isCorrect ? 'text-emerald-900 font-semibold' : 'text-slate-700'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Add question step trigger link block */}
      <button
        onClick={handleAddQuestion}
        className="w-full py-5 border-2 border-dashed border-slate-300 bg-slate-100 hover:bg-white text-slate-500 hover:text-[#3525cd] hover:border-[#3525cd] rounded-2xl transition-all flex flex-col items-center justify-center gap-1 group cursor-pointer"
        id="add-question-btn"
      >
        <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-[#f5f2ff] flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-xs font-extrabold tracking-wider uppercase">
          Add another question
        </span>
      </button>

      {/* Bottom Floating Bar mockup */}
      <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-slate-100 p-4 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Your progress is saved in this browser</span>
        </span>
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-5 py-2.5 text-xs font-bold transition-colors w-full sm:w-auto cursor-pointer"
          >
            Go back
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#3525cd] text-white rounded-xl px-7 py-2.5 text-xs font-extrabold hover:bg-indigo-900 transition-colors shadow-md w-full sm:w-auto cursor-pointer"
          >
            Publish quiz
          </button>
        </div>
      </div>

    </div>
  );
}
