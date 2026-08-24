import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  AlertCircle,
  Volume2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const InterviewFeedbackReport: React.FC = () => {
  const { interviewAttempts, activeInterviewAttemptId, deleteInterviewAttempt, setActiveScreen } = useApp();
  const attempt = interviewAttempts.find(a => a.id === activeInterviewAttemptId) || interviewAttempts[0];

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!attempt) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-400">No mock interview practice report found.</p>
        <button onClick={() => setActiveScreen('interviews')} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold">Return to Studio</button>
      </div>
    );
  }

  const radarData = [
    { subject: 'Technical Depth', score: attempt.scores.technicalAccuracy, fullMark: 100 },
    { subject: 'Communication', score: attempt.scores.communication, fullMark: 100 },
    { subject: 'STAR Structure', score: attempt.scores.structure, fullMark: 100 },
    { subject: 'Voice Confidence', score: attempt.scores.confidence, fullMark: 100 }
  ];

  const handlePlayAudioDemo = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(attempt.userAnswerText);
      utterance.rate = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDeleteReport = () => {
    if (window.confirm(`Are you sure you want to delete the AI Mock Report Card for "${attempt.questionTitle}"? This cannot be undone.`)) {
      deleteInterviewAttempt(attempt.id);
      setActiveScreen('interviews');
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveScreen('interviews')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl font-bold text-white">AI Interview Performance Feedback</h1>
          </div>
          <p className="text-xs text-slate-400">{attempt.questionTitle} • Session Completed {attempt.completedAt}</p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handlePlayAudioDemo}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingAudio ? 'Playing Recorded Audio...' : 'Listen to Response'}</span>
          </button>
          <button
            onClick={handleDeleteReport}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/30 transition-all"
            title="Delete this Report Card"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Report Card</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Spider Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-between space-y-4">
          <div className="text-center">
            <p className="text-xs font-mono uppercase text-cyan-400 font-bold">Overall Score</p>
            <div className="text-5xl font-black text-white font-mono">{attempt.scores.overall}%</div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Feedback & Recommendations */}
        <div className="lg:col-span-2 space-y-5">
          {/* Matched Keywords */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Matched Architectural Terms ({attempt.matchedKeywords.length})</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {attempt.matchedKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* AI Analysis Summary */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">AI Evaluator Feedback</span>
            <p className="text-xs text-slate-200 leading-relaxed">{attempt.aiFeedback}</p>
          </div>

          {/* Actionable Improvement Tips */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Actionable Recommendations for 100% Score</span>
            </h3>
            <ul className="space-y-2">
              {attempt.improvementTips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
