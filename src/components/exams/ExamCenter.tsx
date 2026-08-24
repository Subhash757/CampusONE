import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  PlayCircle,
  PlusCircle,
  AlertCircle,
  Calendar,
  ArrowLeft,
  BookOpen,
  Info,
  Shield,
  CheckCircle2,
  X,
  Camera,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExamCenter: React.FC = () => {
  const { exams, setActiveExamId, setActiveScreen, currentUser } = useApp();
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const activeExams = exams.filter(e => e.status === 'active');
  const upcomingExams = exams.filter(e => e.status === 'upcoming');

  const handleLaunchExam = (examId: string) => {
    setActiveExamId(examId);
    setActiveScreen('take_exam');
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
              <FileCheck2 className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Examination Center</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Secure proctored online exams, timed evaluations, autosave protection & instant grade release.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#F4C95D] hover:bg-[#e3b84c] text-[#1F2933] font-bold text-xs shadow-md transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#1F2933]" />
            <span>Exam Rules &amp; Instructions</span>
          </button>

          {(currentUser.role === 'faculty' || currentUser.role === 'admin') && (
            <button
              onClick={() => setActiveScreen('create_exam')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create & Publish Exam</span>
            </button>
          )}
        </div>
      </div>

      {/* ── 100-Marks Live Camera Proctored Exam Banner ── */}
      <div className="glass-panel rounded-3xl p-6 border border-[#FF6B6B]/40 dark:border-[#FF6B6B]/30 bg-gradient-to-r from-[#FF6B6B]/10 via-[#F4C95D]/10 to-[#10B981]/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6B6B] text-white text-[10px] font-mono font-bold animate-pulse">
                🔴 100 MARKS AUTONOMOUS EXAM
              </span>
              <span className="text-xs font-mono text-[#10B981] font-bold">VVCE AI CAMERA PROCTORED</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              CS-601: Advanced Computer Science &amp; Systems Architecture (100 Marks)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Part A: 10 MCQs (30M) • Part B: 4 Short Technical (30M) • Part C: 2 Coding Problems (40M) • 90 Mins • Official Downloadable PDF Scorecard
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setShowInstructionsModal(true)}
              className="flex items-center space-x-1.5 px-4 py-3 rounded-2xl bg-white/80 dark:bg-[#1F2933]/80 hover:bg-white dark:hover:bg-[#1F2933] text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-white/10 transition-all"
            >
              <Info className="w-4 h-4 text-[#F4C95D]" />
              <span>Instructions</span>
            </button>
            <button
              onClick={() => setActiveScreen('take_live_camera_exam')}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-xs shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98] transition-all"
            >
              <PlayCircle className="w-5 h-5 fill-white" />
              <span>Launch 100-Marks Camera Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Official Exam Instructions Modal ───────────────────────────────── */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-2xl bg-[#F4C95D]/20 text-[#F4C95D] border border-[#F4C95D]/30">
                  <BookOpen className="w-6 h-6 text-[#F4C95D]" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Official Examination Rules &amp; Guidelines</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Vidya Vardhaka College of Engineering — Autonomous Evaluation Regulations</p>
                </div>
              </div>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Sections */}
            <div className="space-y-5 text-xs text-slate-700 dark:text-slate-300">
              {/* Section 1: 100-Marks Format */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#10B981]" /><span>1. 100-Marks Examination Format</span>
                </h3>
                <ul className="space-y-1.5 list-disc pl-5 leading-relaxed text-slate-600 dark:text-slate-300">
                  <li><strong>Part A (30 Marks)</strong>: 10 Objective Multiple Choice Questions @ 3 Marks each. Single correct answer.</li>
                  <li><strong>Part B (30 Marks)</strong>: 4 Technical &amp; Architectural Short Questions @ 7.5 Marks each. Evaluates core computer science fundamentals.</li>
                  <li><strong>Part C (40 Marks)</strong>: 2 Comprehensive System Design &amp; Coding Problems @ 20 Marks each. Write optimal code in the browser editor.</li>
                </ul>
              </div>

              {/* Section 2: AI Camera & Audio Proctoring */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-[#FF6B6B]" /><span>2. AI Camera &amp; Audio Proctoring Rules</span>
                </h3>
                <ul className="space-y-1.5 list-disc pl-5 leading-relaxed text-slate-600 dark:text-slate-300">
                  <li>Webcam &amp; microphone must remain active throughout the examination.</li>
                  <li>Facial snapshot log is recorded every <strong>15 seconds</strong> with candidate watermarks.</li>
                  <li>Switching tabs or minimizing the browser window triggers immediate <strong>Focus Lost Alerts</strong> and flags your scorecard.</li>
                  <li>Ensure proper lighting and sit directly in front of the camera to avoid posture warning penalties.</li>
                </ul>
              </div>

              {/* Section 3: Passing Criteria & Report Cards */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C95D]" /><span>3. Passing Criteria &amp; Report Card Policy</span>
                </h3>
                <ul className="space-y-1.5 list-disc pl-5 leading-relaxed text-slate-600 dark:text-slate-300">
                  <li>Minimum passing threshold is <strong>40% overall score</strong>.</li>
                  <li>Upon submission, candidates receive an official printable A4 PDF Scorecard featuring VVCE letterhead and signatures (Student, Evaluator, HOD, Principal).</li>
                  <li>Candidates &amp; faculty have permission to <strong>Delete / Discard Scorecard Reports</strong> from the system if an attempt needs to be purged.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">VVCE Examination Evaluation Board Regulations</span>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-md transition-all"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Exams Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span>Live & Active Examinations</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 dark:bg-rose-500 animate-ping" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeExams.map(exam => (
            <div
              key={exam.id}
              className="glass-panel-interactive rounded-3xl p-6 border border-rose-300 dark:border-rose-500/30 bg-rose-50/30 dark:bg-slate-900 flex flex-col justify-between space-y-5 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                    STATUS: LIVE
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>{exam.durationMinutes} Minutes</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">{exam.title}</h3>
                  <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold mt-1">{exam.subjectName}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white dark:bg-slate-950 text-center border border-slate-200 dark:border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Questions</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{exam.questions.length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Total Marks</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{exam.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Passing Marks</p>
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-400">{exam.passingMarks}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 p-2.5 rounded-xl border border-amber-200 dark:border-amber-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>Autosave & timer enabled. Negative marking: {exam.negativeMarking ? `-${exam.negativeMarkValue} per wrong MCQ` : 'None'}.</span>
                </div>

                <button
                  onClick={() => handleLaunchExam(exam.id)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start Examination Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Exams Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Upcoming Scheduled Assessments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingExams.map(exam => (
            <div key={exam.id} className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  UPCOMING
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Aug 25, 2026</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{exam.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{exam.subjectName}</p>

              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/5 font-mono">
                <span>Duration: {exam.durationMinutes} mins</span>
                <span className="font-bold text-teal-700 dark:text-teal-400">{exam.totalMarks} Marks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
