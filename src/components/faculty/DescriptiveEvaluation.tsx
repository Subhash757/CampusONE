import React, { useState } from 'react';
import { FileCheck, CheckCircle2, ArrowLeft, Save, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DescriptiveEvaluation: React.FC = () => {
  const { setActiveScreen } = useApp();

  const [awardedMarks, setAwardedMarks] = useState(22);
  const [facultyFeedback, setFacultyFeedback] = useState(
    'Excellent explanation of Vector Clock resolution! Clear differentiation between vertical and horizontal sharding.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setActiveScreen('faculty_lounge');
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveScreen('faculty_lounge')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Descriptive Answer Evaluation</h1>
            <p className="text-xs text-slate-400">Student: Alex Chen (CS2024-042) • Distributed Systems</p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-teal-400 font-bold">Exam Question (Max Marks: 25)</span>
          <h2 className="text-base font-bold text-slate-100">
            Explain the difference between Horizontal Scaling (Sharding) and Vertical Scaling (Replication). Detail how Vector Clocks resolve concurrent write conflicts in a distributed database.
          </h2>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400">Student Submission:</span>
          <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans">
            "Horizontal scaling (sharding) partitions data across multiple nodes to distribute storage and I/O load, whereas vertical scaling increases CPU/RAM resources on a single machine. Vector clocks assign an array of logical clocks [Node_A: v1, Node_B: v2] to every data version. When two concurrent writes occur without causal precedence, vector clock comparison flags a divergence conflict, allowing client applications to resolve concurrent updates deterministically."
          </div>
        </div>

        <form onSubmit={handleGradeSubmit} className="space-y-4 pt-2 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Marks Awarded (Out of 25)</label>
              <input
                type="number"
                max={25}
                min={0}
                value={awardedMarks}
                onChange={(e) => setAwardedMarks(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-teal-400 font-mono font-bold outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Faculty Feedback Comments</label>
              <input
                type="text"
                value={facultyFeedback}
                onChange={(e) => setFacultyFeedback(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                isSaved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90 shadow-glow-violet'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isSaved ? 'Evaluation Saved & Grade Released!' : 'Submit Final Grade'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
