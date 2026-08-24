import React from 'react';
import { Mic, Play, ArrowRight, History, ArrowLeft, Camera, Shield, FileText, Eye, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockInterviewCategories } from '../../data/mockData';

export const InterviewStudio: React.FC = () => {
  const {
    setActiveScreen,
    interviewAttempts,
    setActiveInterviewAttemptId,
    liveInterviewSessions,
    setActiveLiveSessionId,
    currentUser
  } = useApp();

  const isStudentOrAll = currentUser.role === 'student';
  const isFacultyOrAdmin = currentUser.role === 'faculty' || currentUser.role === 'admin';

  const handleViewReport = (attemptId: string) => {
    setActiveInterviewAttemptId(attemptId);
    setActiveScreen('interview_report');
  };

  const handleReviewLive = (sessionId: string) => {
    setActiveLiveSessionId(sessionId);
    setActiveScreen('live_interview_review');
  };

  const diffColor: Record<string, string> = {
    Easy: 'text-[#10B981]',
    Medium: 'text-[#F4C95D]',
    Hard: 'text-[#FF6B6B]'
  };
  const proctorColor: Record<string, string> = {
    clean: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    warnings: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30',
    flagged: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30'
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 transition-all"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-[#10B981]" />
            </button>
            <span className="p-2 rounded-xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <Mic className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Mock Interview Studio</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Real-time speech-to-text simulator with keyword analysis, radar scoring & live proctored coding sessions.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setActiveScreen('problem_bank')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#F4C95D] hover:bg-[#e3b84c] text-[#1F2933] font-bold text-xs shadow-md transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore 600+ Problem Bank</span>
          </button>

          <button
            onClick={() => setActiveScreen('interview_practice')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Quick Practice Session</span>
          </button>
        </div>
      </div>

      {/* ── Live Proctored Interview Hero Card (students see this) ────────── */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 border border-[#FF6B6B]/30 dark:border-[#FF6B6B]/25 bg-gradient-to-br from-[#FF6B6B]/5 to-[#F4C95D]/5 dark:from-[#FF6B6B]/10 dark:to-[#F4C95D]/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30">
                <Camera className="w-7 h-7 text-[#FF6B6B]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Proctored Interview</h2>
                  <span className="flex items-center space-x-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF6B6B] text-white animate-pulse">
                    <span className="w-1 h-1 rounded-full bg-white" /><span>LIVE</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Camera-proctored LeetCode-style coding session · Results sent to faculty mentor · Downloadable PDF report
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              {['📹 Camera Monitoring', '🧠 3 Difficulty Levels', '⚡ Real-time Proctor', '📄 PDF Report with Signatures'].map(f => (
                <span key={f} className="px-2.5 py-1 rounded-full bg-white dark:bg-[#324148] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">{f}</span>
              ))}
            </div>
          </div>
          <button
            id="start-live-interview-hero-btn"
            onClick={() => setActiveScreen('live_interview')}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-sm shadow-lg shadow-[#FF6B6B]/30 active:scale-[0.98] transition-all shrink-0"
          >
            <Camera className="w-5 h-5" />
            <span>Start Live Session</span>
          </button>
        </div>

        {/* Subtle background camera icon */}
        <Camera className="absolute -bottom-4 -right-4 w-32 h-32 text-[#FF6B6B]/5 dark:text-[#FF6B6B]/10 pointer-events-none" />
      </div>

      {/* ── Faculty / Admin: Review submitted live sessions ───────────────── */}
      {(isFacultyOrAdmin || liveInterviewSessions.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#F4C95D]" />
            <span>{isFacultyOrAdmin ? 'Submitted Live Interview Sessions' : 'Your Live Interview History'}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30">
              {liveInterviewSessions.length} session{liveInterviewSessions.length !== 1 ? 's' : ''}
            </span>
          </h2>
          <div className="space-y-3">
            {liveInterviewSessions.map(session => (
              <div
                key={session.id}
                className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{session.studentName}</h3>
                    <span className="text-[10px] font-mono text-slate-400">·</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{session.problemTitle}</span>
                    <span className={`text-[10px] font-mono font-bold ${diffColor[session.problemDifficulty]}`}>{session.problemDifficulty}</span>
                  </div>
                  <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${proctorColor[session.proctorStatus]}`}>
                      {session.proctorStatus.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{session.submittedAt}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{session.studentRollNo}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xl font-black text-[#10B981] font-mono">{session.overallScore}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Overall</span>
                  </div>
                  <button
                    onClick={() => handleReviewLive(session.id)}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] text-xs font-bold border border-[#10B981]/25 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isFacultyOrAdmin ? 'Review & Download' : 'View Report'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI Mock Categories Grid ───────────────────────────────────────── */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">AI Mock Interview Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockInterviewCategories.map(cat => (
            <div
              key={cat.id}
              className="glass-panel-interactive rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-5 group cursor-pointer"
              onClick={() => setActiveScreen('interview_practice')}
            >
              <div className="space-y-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs"
                  style={{ backgroundColor: `${cat.color}15`, borderColor: `${cat.color}30`, color: cat.color }}
                >
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{cat.description}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400 font-mono">{cat.sampleQuestionsCount} Scenarios</span>
                <span className="text-[#10B981] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Start Track</span><ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Mock Practice History ──────────────────────────────────── */}
      {interviewAttempts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <History className="w-4 h-4 text-[#10B981]" />
            <span>Recent AI Mock Practice Reports</span>
          </h2>
          <div className="space-y-3">
            {interviewAttempts.map(attempt => (
              <div
                key={attempt.id}
                onClick={() => handleViewReport(attempt.id)}
                className="glass-panel-interactive rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs cursor-pointer transition-all"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{attempt.questionTitle}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Duration: {attempt.durationSeconds}s • Completed {attempt.completedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-base font-black text-[#10B981] font-mono">{attempt.scores.overall}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Overall Score</span>
                  </div>
                  <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] text-[#10B981] font-semibold text-xs border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-[#3D4C54]">
                    <FileText className="w-3.5 h-3.5 inline mr-1" />Spider Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
