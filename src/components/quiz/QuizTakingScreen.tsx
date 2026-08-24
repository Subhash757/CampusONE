import React, { useState, useEffect } from 'react';
import { Trophy, Timer, CheckCircle, XCircle, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const QuizTakingScreen: React.FC = () => {
  const { quizzes, activeQuizId, setActiveScreen } = useApp();
  const quiz = quizzes.find(q => q.id === activeQuizId) || quizzes[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quiz.questions[currentIndex];

  const handleSelect = (optId: string) => {
    if (isAnswerRevealed) return;
    setSelectedOptionId(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerRevealed(true);

    const correctOpt = currentQ.options?.find(o => o.isCorrect);
    if (correctOpt && selectedOptionId === correctOpt.id) {
      setScore(s => s + currentQ.maxMarks);
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  if (isFinished) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-6">
        <div className="glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-white">Quiz Challenge Completed!</h2>

          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
            <p className="text-xs font-mono uppercase text-slate-400">Total Quiz Points Earned</p>
            <p className="text-4xl font-black text-amber-400 font-mono">+{score} PTS</p>
          </div>

          <button
            onClick={() => setActiveScreen('quizzes')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-xs shadow-glow-violet hover:opacity-90"
          >
            Back to Quiz Arena
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-white/10">
        <div>
          <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">{quiz.category}</span>
          <h1 className="text-base font-bold text-white">{quiz.title}</h1>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
          Question {currentIndex + 1} / {quiz.questions.length}
        </span>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
        <h2 className="text-base font-bold text-slate-100">{currentQ.questionText}</h2>

        <div className="space-y-3">
          {currentQ.options?.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.isCorrect;

            let btnStyle = 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800';
            if (isAnswerRevealed) {
              if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
              else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
            } else if (isSelected) {
              btnStyle = 'bg-violet-500/20 border-violet-500/50 text-white font-semibold shadow-glow-violet';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full p-4 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {isAnswerRevealed && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {isAnswerRevealed && currentQ.explanation && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-1">
            <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">Explanation</span>
            <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!isAnswerRevealed ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleConfirmAnswer}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold text-xs shadow-glow-violet transition-all"
            >
              Lock Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-xs shadow-glow-teal hover:opacity-90 transition-all"
            >
              <span>{currentIndex === quiz.questions.length - 1 ? 'See Quiz Result' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
