import React, { useState, useEffect } from 'react';
import {
  Clock,
  Save,
  Flag,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shield,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExamTakingScreen: React.FC = () => {
  const { exams, activeExamId, submitExamAttempt, setActiveScreen, currentUser } = useApp();

  const currentExam = exams.find(e => e.id === activeExamId) || exams[0];
  const questions = currentExam.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(currentExam.durationMinutes * 60);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [isCompletedResult, setIsCompletedResult] = useState(false);
  const [finalScore, setFinalScore] = useState<{ total: number; obtained: number } | null>(null);

  // Timer countdown hook
  useEffect(() => {
    if (isCompletedResult) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompletedResult]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinalSubmit = () => {
    // Calculate score for objective questions
    let score = 0;
    questions.forEach(q => {
      if (q.type === 'mcq' || q.type === 'tf') {
        const correctOpt = q.options?.find(o => o.isCorrect);
        if (correctOpt && answers[q.id] === correctOpt.id) {
          score += q.maxMarks;
        } else if (answers[q.id] && currentExam.negativeMarking) {
          score -= (currentExam.negativeMarkValue || 0.25) * q.maxMarks;
        }
      } else if (q.type === 'short' && q.correctAnswerText) {
        if (answers[q.id]?.trim().toLowerCase() === q.correctAnswerText.trim().toLowerCase()) {
          score += q.maxMarks;
        }
      }
    });

    const finalObtained = Math.max(0, Math.round(score));
    setFinalScore({ total: currentExam.totalMarks, obtained: finalObtained });

    submitExamAttempt({
      id: `attempt_${Date.now()}`,
      examId: currentExam.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      answers,
      obtainedScore: finalObtained,
      totalScore: currentExam.totalMarks,
      status: 'evaluated'
    });

    setIsSubmittingModal(false);
    setIsCompletedResult(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompletedResult && finalScore) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6 text-center">
        <div className="glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Exam Successfully Submitted!</h1>
            <p className="text-xs text-slate-400">{currentExam.title}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 max-w-md mx-auto space-y-2">
            <p className="text-xs font-mono uppercase text-slate-400">Objective Marks Generated</p>
            <div className="text-4xl font-black text-teal-400 font-mono">
              {finalScore.obtained} <span className="text-lg font-normal text-slate-400">/ {finalScore.total}</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
              Descriptive question responses submitted for Dr. Sarah Jenkins evaluation.
            </p>
          </div>

          <button
            onClick={() => setActiveScreen('exams')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-xs shadow-glow-teal hover:opacity-90"
          >
            Return to Examination Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto select-none">
      {/* Top Proctored Exam Header */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 backdrop-blur-xl">
        <div>
          <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest">
            PROCTORED ASSESSMENT SESSION
          </span>
          <h1 className="text-base font-bold text-white line-clamp-1">{currentExam.title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-emerald-400">
            <Save className="w-3.5 h-3.5 animate-pulse" />
            <span>Autosaved</span>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono font-bold text-sm shadow-glow-alert">
            <Clock className="w-4 h-4 animate-spin-slow" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setIsSubmittingModal(true)}
            className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
          >
            Finish & Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Panel */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-teal-400 font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>

            <button
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                flagged[currentQuestion.id]
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-white/5 hover:text-white'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{flagged[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 leading-relaxed">
              {currentQuestion.questionText}
            </h3>

            {currentQuestion.codeSnippet && (
              <pre className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-teal-300 overflow-x-auto">
                {currentQuestion.codeSnippet}
              </pre>
            )}
          </div>

          {/* Answer Inputs based on Question Type */}
          <div className="space-y-3 pt-2">
            {(currentQuestion.type === 'mcq' || currentQuestion.type === 'tf') && (
              <div className="space-y-2">
                {currentQuestion.options?.map(opt => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`flex items-center space-x-3 p-4 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-500/50 text-white shadow-glow-teal'
                          : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        checked={isSelected}
                        onChange={() => {}}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-teal-400 bg-teal-400' : 'border-slate-500'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span>{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'short' && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Type your short answer:</label>
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleSelectOption(currentQuestion.id, e.target.value)}
                  placeholder="Enter concise answer text..."
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-teal-500 outline-none font-mono"
                />
              </div>
            )}

            {currentQuestion.type === 'descriptive' && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Detailed Descriptive Response:</label>
                <textarea
                  rows={6}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleSelectOption(currentQuestion.id, e.target.value)}
                  placeholder="Write clear structured explanations, architectural components, or steps..."
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-teal-500 outline-none leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(i => i - 1)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs text-slate-300 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={() => setCurrentQuestionIndex(i => i + 1)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-xs border border-teal-400 shadow-glow-teal hover:opacity-90 disabled:opacity-40"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
            Question Palette
          </h4>

          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlagged = Boolean(flagged[q.id]);
              const isCurrent = currentQuestionIndex === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-10 h-10 rounded-xl font-mono text-xs font-bold transition-all relative ${
                    isCurrent
                      ? 'ring-2 ring-teal-400 scale-105'
                      : ''
                  } ${
                    isFlagged
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                      : isAnswered
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-900/80 text-slate-400 border border-white/10'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-md bg-emerald-500/30 border border-emerald-500/50" />
              <span>Answered ({Object.keys(answers).length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-md bg-amber-500/30 border border-amber-500/50" />
              <span>Flagged ({Object.keys(flagged).filter(k => flagged[k]).length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-md bg-slate-900 border border-white/10" />
              <span>Unvisited ({questions.length - Object.keys(answers).length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmittingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Confirm Exam Submission?</h3>
              <p className="text-xs text-slate-400">
                You have answered {Object.keys(answers).length} of {questions.length} questions. Once submitted, answers cannot be edited.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setIsSubmittingModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
              >
                Back to Exam
              </button>

              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-glow-alert"
              >
                Confirm Final Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
