import React from 'react';
import { PencilLine, Users, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Write your quiz',
      description: 'Type your questions, add a few answer choices, and tap the checkmark on the right one. That\'s it — no complicated setup.',
      icon: PencilLine,
      color: 'bg-violet-100 text-[#3525cd]',
    },
    {
      title: 'Share it around',
      description: 'Send a quiz to classmates, coworkers, or anyone who thinks they know more than you. See who actually paid attention.',
      icon: Users,
      color: 'bg-emerald-100 text-[#006a61]',
    },
    {
      title: 'Check your scores',
      description: 'Every attempt gets saved to your dashboard. Spot what you\'re good at, see what needs work, and try again when you\'re ready.',
      icon: TrendingUp,
      color: 'bg-amber-100 text-[#7e3000]',
    }
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            How it Works
          </h2>
          <p className="text-slate-500 font-medium text-base mt-2 max-w-xl mx-auto">
            Seriously — it only takes a few minutes to go from idea to finished quiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 stroke-[2]" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
