import React, { useState, useRef } from 'react';
import {
  ArrowLeft, Download, Shield, CheckCircle, AlertTriangle,
  Camera, Clock, Code2, User, Star, Pencil, Save, Printer,
  FileText, BookOpen, Award, Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveInterviewSession } from '../../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const DiffBadge: React.FC<{ d: string }> = ({ d }) => {
  const cfg: Record<string, string> = {
    Easy: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    Medium: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30',
    Hard: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30'
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${cfg[d] || cfg.Easy}`}>{d}</span>
  );
};

const ProctorBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg: Record<string, { cls: string; label: string; icon: React.ReactNode }> = {
    clean: { cls: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30', label: 'Clean Session', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    warnings: { cls: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30', label: 'Minor Warnings', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    flagged: { cls: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30', label: 'Flagged', icon: <AlertTriangle className="w-3.5 h-3.5" /> }
  };
  const { cls, label, icon } = cfg[status] || cfg.clean;
  return (
    <span className={`flex items-center space-x-1.5 text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${cls}`}>
      {icon}<span>{label}</span>
    </span>
  );
};

const ScoreRing: React.FC<{ score: number; size?: number }> = ({ score, size = 80 }) => {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F4C95D' : '#FF6B6B';
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#334155" strokeWidth="7" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth="7" fill="none" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
};

// ─── Hidden Print-Only Report ─────────────────────────────────────────────────
const PrintReport: React.FC<{ session: LiveInterviewSession }> = ({ session }) => {
  const date = session.submittedAt || session.startedAt;
  const formatDuration = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  const proctorLabel = session.proctorStatus === 'clean' ? 'Clean Session' : session.proctorStatus === 'warnings' ? 'Minor Warnings' : 'Flagged';
  const proctorPrintClass = session.proctorStatus === 'clean' ? 'print-badge-green' : session.proctorStatus === 'warnings' ? 'print-badge-yellow' : 'print-badge-red';
  const diffPrintClass = session.problemDifficulty === 'Easy' ? 'print-badge-easy' : session.problemDifficulty === 'Medium' ? 'print-badge-medium' : 'print-badge-hard';

  return (
    <div id="live-report-print" style={{ display: 'none' }}>
      {/* Letterhead */}
      <div className="print-header">
        <img src="/vvce-logo.png" alt="VVCE Logo" className="print-logo" />
        <div className="print-title">
          <h1>Live Proctored Interview Report</h1>
          <p>Vidya Vardhaka College of Engineering, Mysuru — Academic Year 2026–27</p>
          <p style={{ marginTop: 4, fontSize: '8pt', color: '#10B981', fontWeight: 700 }}>
            VVCE CampusONE — Official Evaluation Record
          </p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '8pt', color: '#667085' }}>
          <p style={{ fontWeight: 700, color: '#111827' }}>VVCE/LI/{session.id.toUpperCase()}</p>
          <p>Date: {date}</p>
          <p>Ref: VVCE-PROCTOR-2026</p>
        </div>
      </div>

      {/* Student + Mentor Info */}
      <div className="print-section">
        <div className="print-section-title">Student & Mentor Details</div>
        <div className="print-grid-2">
          <div>
            <div className="print-info-row"><span className="print-info-label">Student Name:</span><span className="print-info-value">{session.studentName}</span></div>
            <div className="print-info-row"><span className="print-info-label">Roll Number:</span><span className="print-info-value">{session.studentRollNo}</span></div>
            <div className="print-info-row"><span className="print-info-label">Department:</span><span className="print-info-value">{session.studentDept}</span></div>
          </div>
          <div>
            <div className="print-info-row"><span className="print-info-label">Faculty Mentor:</span><span className="print-info-value">{session.mentorName}</span></div>
            <div className="print-info-row"><span className="print-info-label">Session Date:</span><span className="print-info-value">{session.startedAt}</span></div>
            <div className="print-info-row"><span className="print-info-label">Submitted At:</span><span className="print-info-value">{session.submittedAt}</span></div>
          </div>
        </div>
      </div>

      {/* Problem Info */}
      <div className="print-section">
        <div className="print-section-title">Problem Details</div>
        <div className="print-info-row">
          <span className="print-info-label">Problem Title:</span>
          <span className="print-info-value">{session.problemTitle} &nbsp;<span className={`print-badge ${diffPrintClass}`}>{session.problemDifficulty}</span></span>
        </div>
        <div className="print-info-row"><span className="print-info-label">Complexity:</span><span className="print-info-value" style={{ fontFamily: 'monospace' }}>{session.codeComplexity}</span></div>
      </div>

      {/* Scores */}
      <div className="print-section">
        <div className="print-section-title">Performance Scores</div>
        <div className="print-grid-4">
          <div className="print-stat-box">
            <div className="print-stat-label">Overall Score</div>
            <div className="print-stat-value">{session.overallScore}%</div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Code Score</div>
            <div className="print-stat-value">{session.codeScore}%</div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Test Cases</div>
            <div className="print-stat-value">{session.testCasesPassed}/{session.totalTestCases}</div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Duration</div>
            <div className="print-stat-value" style={{ fontSize: '12pt' }}>{formatDuration(session.durationSeconds)}</div>
          </div>
        </div>
      </div>

      {/* Proctoring Log */}
      <div className="print-section">
        <div className="print-section-title">Proctoring Log</div>
        <div className="print-grid-4">
          <div className="print-stat-box">
            <div className="print-stat-label">Proctor Status</div>
            <div style={{ marginTop: 4 }}><span className={`print-badge ${proctorPrintClass}`}>{proctorLabel}</span></div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Face Snapshots</div>
            <div className="print-stat-value">{session.faceSnapshots}</div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Posture Warnings</div>
            <div className="print-stat-value">{session.postureWarnings}</div>
          </div>
          <div className="print-stat-box">
            <div className="print-stat-label">Focus Lost Events</div>
            <div className="print-stat-value">{session.focusLostCount}</div>
          </div>
        </div>
      </div>

      {/* Student Code */}
      <div className="print-section">
        <div className="print-section-title">Student's Submitted Code</div>
        <div className="print-code-block">{session.studentCode}</div>
      </div>

      {/* AI Feedback */}
      <div className="print-section">
        <div className="print-section-title">AI Evaluator Feedback</div>
        <p style={{ fontSize: '10pt', color: '#374151', lineHeight: 1.6 }}>{session.aiFeedback}</p>
      </div>

      {/* Mentor Remarks */}
      <div className="print-section">
        <div className="print-section-title">Faculty Mentor Remarks</div>
        <p style={{ fontSize: '10pt', color: '#374151', lineHeight: 1.6, minHeight: 40, borderBottom: '1px dashed #E5E7EB', paddingBottom: 8 }}>
          {session.mentorRemarks || 'No remarks added by faculty mentor.'}
        </p>
      </div>

      {/* Signatures */}
      <div className="print-signature-row">
        {[
          { name: session.studentName.split(' ')[0], role: 'Student' },
          { name: session.mentorName.replace('Dr. ', ''), role: 'Faculty Mentor' },
          { name: 'Dr. A. Kumar', role: 'Head of Department' },
          { name: 'Dr. R. Naik', role: 'Principal, VVCE' }
        ].map(sig => (
          <div key={sig.role} className="print-signature-box">
            <div className="print-signature-name">{sig.name}</div>
            <div className="print-signature-line">{sig.role}</div>
          </div>
        ))}
      </div>

      {/* Watermark footer */}
      <div className="print-watermark">
        Generated by VVCE CampusONE Portal — Vidya Vardhaka College of Engineering, Mysuru — {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })} — This is a computer-generated document and is valid without physical signature.
      </div>
    </div>
  );
};

// ─── Main Review Screen ───────────────────────────────────────────────────────
export const LiveInterviewReview: React.FC = () => {
  const { liveInterviewSessions, activeLiveSessionId, updateSessionRemarks, setActiveScreen, currentUser } = useApp();

  const session: LiveInterviewSession | undefined =
    liveInterviewSessions.find(s => s.id === activeLiveSessionId) || liveInterviewSessions[0];

  const [remarks, setRemarks] = useState(session?.mentorRemarks || '');
  const [editingRemarks, setEditingRemarks] = useState(false);
  const [saved, setSaved] = useState(false);

  const isFacultyOrAdmin = currentUser.role === 'faculty' || currentUser.role === 'admin';
  const canEditRemarks = isFacultyOrAdmin;

  if (!session) {
    return (
      <div className="p-8 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-400 mx-auto" />
        <p className="text-slate-500 dark:text-slate-400">No interview session found.</p>
        <button onClick={() => setActiveScreen('interviews')} className="px-4 py-2 rounded-xl bg-[#10B981] text-white text-xs font-bold">Back to Studio</button>
      </div>
    );
  }

  const formatDuration = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  const handleSaveRemarks = () => {
    updateSessionRemarks(session.id, remarks);
    setEditingRemarks(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDownloadPDF = () => {
    const printEl = document.getElementById('live-report-print');
    if (printEl) {
      printEl.style.display = 'block';
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.print();
          setTimeout(() => { printEl.style.display = 'none'; }, 1000);
        }, 100);
      });
    }
  };

  const statCards = [
    { label: 'Overall Score', value: `${session.overallScore}%`, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Code Score', value: `${session.codeScore}%`, color: 'text-[#F4C95D]', bg: 'bg-[#F4C95D]/10 border-[#F4C95D]/20' },
    { label: 'Test Cases', value: `${session.testCasesPassed}/${session.totalTestCases}`, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Duration', value: formatDuration(session.durationSeconds), color: 'text-white dark:text-white', bg: 'bg-slate-100 dark:bg-[#1F2933] border-slate-300 dark:border-white/10' },
    { label: 'Face Snapshots', value: session.faceSnapshots, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Posture Warnings', value: session.postureWarnings, color: session.postureWarnings > 0 ? 'text-[#FF6B6B]' : 'text-[#10B981]', bg: session.postureWarnings > 0 ? 'bg-[#FF6B6B]/10 border-[#FF6B6B]/20' : 'bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Focus Lost', value: session.focusLostCount, color: session.focusLostCount > 0 ? 'text-[#F4C95D]' : 'text-[#10B981]', bg: session.focusLostCount > 0 ? 'bg-[#F4C95D]/10 border-[#F4C95D]/20' : 'bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Complexity', value: session.codeComplexity, color: 'text-[#F4C95D]', bg: 'bg-[#F4C95D]/10 border-[#F4C95D]/20' }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Hidden print element */}
      <PrintReport session={{ ...session, mentorRemarks: remarks }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] shadow-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveScreen(isFacultyOrAdmin ? 'faculty_lounge' : 'interviews')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] border border-slate-300 dark:border-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#F4C95D]" />
          </button>
          <span className="p-2 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30"><FileText className="w-6 h-6 text-[#10B981]" /></span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Interview Report Card</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{session.problemTitle} · Submitted {session.submittedAt}</p>
          </div>
        </div>
        <button
          id="download-pdf-btn"
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Report</span>
        </button>
      </div>

      {/* Success toast */}
      {saved && (
        <div className="flex items-center space-x-2 p-3 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Mentor remarks saved successfully.</span>
        </div>
      )}

      {/* Top info strip */}
      <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-[#10B981]" /><span>Student Details</span>
            </h3>
            <div className="space-y-1.5 text-sm">
              <p className="font-bold text-slate-900 dark:text-white text-lg">{session.studentName}</p>
              <p className="text-xs text-[#10B981] font-mono">{session.studentRollNo}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{session.studentDept}</p>
            </div>
          </div>
          {/* Mentor + Problem */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#F4C95D]" /><span>Session Info</span>
            </h3>
            <div className="space-y-1.5 text-xs">
              <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-white">Mentor:</span> {session.mentorName}</p>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-900 dark:text-white">Problem:</span>
                <span className="text-slate-700 dark:text-slate-300">{session.problemTitle}</span>
                <DiffBadge d={session.problemDifficulty} />
              </div>
              <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-white">Started:</span> {session.startedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score + Proctor metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Overall score ring */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <ScoreRing score={session.overallScore} size={120} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{session.overallScore}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">/ 100</span>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Overall Score</p>
            <ProctorBadge status={session.proctorStatus} />
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Award className={`w-4 h-4 ${session.overallScore >= 80 ? 'text-[#F4C95D]' : session.overallScore >= 60 ? 'text-[#10B981]' : 'text-[#FF6B6B]'}`} />
            <span className="text-slate-700 dark:text-slate-300 font-semibold">
              {session.overallScore >= 80 ? 'Excellent Performance' : session.overallScore >= 60 ? 'Good Performance' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map(s => (
            <div key={s.label} className={`rounded-2xl p-4 border space-y-1 text-center ${s.bg}`}>
              <p className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">{s.label}</p>
              <p className={`text-xl font-black font-mono ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code block */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-[#10B981]" /><span>Student's Submitted Code</span>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30">
              Complexity: {session.codeComplexity}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {session.testCasesPassed}/{session.totalTestCases} tests passed
            </span>
          </div>
        </div>
        <pre className="bg-[#1F2933] dark:bg-[#1a2330] rounded-2xl p-5 font-mono text-xs text-[#10B981] leading-6 overflow-x-auto border border-white/5">
          {session.studentCode}
        </pre>
      </div>

      {/* Proctor snapshot log */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Camera className="w-4 h-4 text-[#FF6B6B]" /><span>Proctoring Capture Log</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: <Camera className="w-5 h-5 mx-auto mb-1 text-[#10B981]" />, label: 'Face Snapshots Taken', value: session.faceSnapshots, note: 'Every 15 seconds' },
            { icon: <Eye className="w-5 h-5 mx-auto mb-1 text-[#F4C95D]" />, label: 'Posture Warnings', value: session.postureWarnings, note: 'Auto-detected via AI' },
            { icon: <Shield className="w-5 h-5 mx-auto mb-1 text-[#10B981]" />, label: 'Focus Lost Events', value: session.focusLostCount, note: 'Tab-switch detection' },
            { icon: <Clock className="w-5 h-5 mx-auto mb-1 text-slate-400" />, label: 'Session Duration', value: formatDuration(session.durationSeconds), note: session.startedAt }
          ].map(item => (
            <div key={item.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 space-y-1">
              {item.icon}
              <p className="text-xl font-black font-mono text-slate-900 dark:text-white">{item.value}</p>
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{item.label}</p>
              <p className="text-[9px] text-slate-400 font-mono">{item.note}</p>
            </div>
          ))}
        </div>
        {/* Captured Photo Snapshots Gallery */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Captured Mentee Proctored Photos ({session.capturedPhotos?.length || 0}):</p>
          <div className="flex flex-wrap gap-3">
            {session.capturedPhotos && session.capturedPhotos.length > 0 ? (
              session.capturedPhotos.map((photo, i) => (
                <div key={i} className="relative group w-36 h-24 rounded-xl overflow-hidden border border-white/10 shadow-md">
                  <img src={photo} alt={`Mentee Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                    Shot #{i + 1}
                  </span>
                </div>
              ))
            ) : (
              Array.from({ length: Math.min(session.faceSnapshots, 4) }).map((_, i) => (
                <div key={i} className="w-32 h-20 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center p-2 text-center">
                  <Camera className="w-5 h-5 text-teal-400 mb-1" />
                  <span className="text-[9px] text-slate-400 font-mono">Camera Frame #{i + 1}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="glass-panel rounded-3xl p-6 border border-[#10B981]/20 dark:border-[#10B981]/20 bg-white dark:bg-[#324148] space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Star className="w-4 h-4 text-[#F4C95D]" /><span>AI Evaluator Feedback</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{session.aiFeedback}</p>
      </div>

      {/* Mentor Remarks */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Pencil className="w-4 h-4 text-[#10B981]" /><span>Faculty Mentor Remarks</span>
          </h3>
          {canEditRemarks && !editingRemarks && (
            <button
              id="edit-remarks-btn"
              onClick={() => setEditingRemarks(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] text-xs font-semibold border border-[#10B981]/25 transition-all"
            >
              <Pencil className="w-3.5 h-3.5" /><span>Add / Edit Remarks</span>
            </button>
          )}
        </div>

        {editingRemarks ? (
          <div className="space-y-3">
            <textarea
              id="mentor-remarks-textarea"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              rows={4}
              placeholder="Write your evaluation remarks about the student's performance, approach, and areas for improvement..."
              className="w-full bg-slate-50 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#10B981] outline-none resize-none transition-all leading-relaxed"
            />
            <div className="flex items-center space-x-3">
              <button onClick={() => setEditingRemarks(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-white/10 transition-all">
                Cancel
              </button>
              <button
                id="save-remarks-btn"
                onClick={handleSaveRemarks}
                className="flex-[2] py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-3.5 h-3.5" /><span>Save Remarks</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${remarks ? 'bg-slate-50 dark:bg-[#1F2933] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300' : 'bg-slate-50 dark:bg-[#1F2933] border-dashed border-slate-300 dark:border-white/10 text-slate-400 dark:text-slate-500 italic'}`}>
            {remarks || 'No remarks added yet. Faculty mentor can add evaluation notes here.'}
          </div>
        )}
      </div>

      {/* Signature Row */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Printer className="w-4 h-4 text-[#F4C95D]" /><span>Official Signatures (PDF Report)</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: session.studentName.split(' ')[0], full: session.studentName, role: 'Student', color: 'text-[#10B981]' },
            { name: session.mentorName.replace('Dr. ', ''), full: session.mentorName, role: 'Faculty Mentor', color: 'text-[#F4C95D]' },
            { name: 'Dr. A. Kumar', full: 'Dr. Ashok Kumar', role: 'Head of Department', color: 'text-[#10B981]' },
            { name: 'Dr. R. Naik', full: 'Dr. Ramesh Naik', role: 'Principal, VVCE', color: 'text-[#FF6B6B]' }
          ].map(sig => (
            <div key={sig.role} className="text-center space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
              <div className={`font-signature text-xl ${sig.color}`}>{sig.name}</div>
              <div className="w-full border-t border-slate-300 dark:border-white/10 pt-2">
                <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{sig.full}</p>
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wide">{sig.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-mono">
          Signatures appear in Pacifico cursive font in the downloaded PDF report.
        </p>
      </div>

      {/* PDF Download CTA */}
      <div className="glass-panel rounded-3xl p-6 border border-[#10B981]/25 dark:border-[#10B981]/20 bg-[#10B981]/5 dark:bg-[#10B981]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Download className="w-4 h-4 text-[#10B981]" /><span>Download Official PDF Report</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Includes VVCE letterhead, all scores, code listing, proctor log, mentor remarks, and 4 official signatures.
          </p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};
