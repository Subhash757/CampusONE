import React, { useState } from 'react';
import {
  Briefcase,
  UserCheck,
  FileCheck,
  Megaphone,
  Send,
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  Camera,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSubjects } from '../../data/mockData';

export const FacultyLounge: React.FC = () => {
  const { setActiveScreen, addAnnouncement, currentUser, liveInterviewSessions, setActiveLiveSessionId } = useApp();

  const [ancTitle, setAncTitle] = useState('');
  const [ancContent, setAncContent] = useState('');
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancTitle.trim() || !ancContent.trim()) return;

    addAnnouncement({
      title: ancTitle,
      content: ancContent,
      authorName: currentUser.name,
      authorRole: 'Senior Faculty',
      priority: 'high'
    });

    setAncTitle('');
    setAncContent('');
    setIsBroadcastSent(true);
    setTimeout(() => setIsBroadcastSent(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 transition-all flex items-center space-x-1"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-[#FF6B6B]" />
            </button>
            <span className="p-2 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30">
              <Briefcase className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Faculty Lounge &amp; Command Center</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Class attendance roster management, exam evaluation, question banks &amp; announcement broadcasting.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveScreen('mark_attendance')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setActiveScreen('create_exam')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Exam</span>
          </button>
        </div>
      </div>

      {/* Grid Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN: Subjects + Grading + Live Interview Reviews ── */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Assigned Teaching Subjects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSubjects.map(subject => (
              <div key={subject.id} className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-400 uppercase tracking-widest">{subject.code}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{subject.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-bold">{subject.credits} Credits</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
                  <span>Semester {subject.semester}</span>
                  <button
                    onClick={() => setActiveScreen('mark_attendance')}
                    className="text-violet-700 dark:text-violet-300 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>Mark Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pending Descriptive Evaluations Queue */}
          <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>Pending Descriptive Answer Grading (3 Submissions)</span>
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Alex Chen — Mid-Term Distributed Systems</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Question: Vector Clocks &amp; Sharding Architecture</p>
              </div>
              <button
                onClick={() => setActiveScreen('descriptive_eval')}
                className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-sm"
              >
                Grade Answer
              </button>
            </div>
          </div>

          {/* Live Proctored Interview Reviews */}
          <div className="glass-panel rounded-3xl p-5 border border-[#FF6B6B]/20 dark:border-[#FF6B6B]/20 bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider flex items-center space-x-2">
              <Camera className="w-4 h-4 text-[#FF6B6B]" />
              <span>Live Proctored Interview Reviews ({liveInterviewSessions.length})</span>
            </h3>

            {liveInterviewSessions.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">No sessions submitted yet.</p>
            ) : (
              liveInterviewSessions.map(session => {
                const proctorCls =
                  session.proctorStatus === 'clean'
                    ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                    : session.proctorStatus === 'warnings'
                    ? 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30'
                    : 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30';
                return (
                  <div
                    key={session.id}
                    className="p-3 rounded-2xl bg-white dark:bg-[#324148] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-0.5">
                        <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{session.studentName}</p>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600 dark:text-slate-400 truncate">{session.problemTitle}</span>
                      </div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-0.5">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${proctorCls}`}>
                          {session.proctorStatus.toUpperCase()}
                        </span>
                        <span className="text-slate-400 font-mono">{session.submittedAt}</span>
                        <span className="font-black text-[#10B981] font-mono">{session.overallScore}%</span>
                      </div>
                    </div>
                    <button
                      id={`review-session-${session.id}-btn`}
                      onClick={() => {
                        setActiveLiveSessionId(session.id);
                        setActiveScreen('live_interview_review');
                      }}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] font-semibold border border-[#10B981]/25 transition-all shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review &amp; PDF</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Announcement Broadcaster ── */}
        <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Megaphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Class Announcement Broadcaster</span>
          </h3>

          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Title</label>
              <input
                type="text"
                value={ancTitle}
                onChange={(e) => setAncTitle(e.target.value)}
                placeholder="e.g. Extra Lab Session for AI on Friday"
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notice Details</label>
              <textarea
                rows={4}
                value={ancContent}
                onChange={(e) => setAncContent(e.target.value)}
                placeholder="Write message content for students..."
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-teal-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 ${
                isBroadcastSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isBroadcastSent ? 'Announcement Broadcasted!' : 'Send Instant Announcement'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
