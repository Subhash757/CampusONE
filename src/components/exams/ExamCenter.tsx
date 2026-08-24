import React from 'react';
import {
  FileCheck2,
  Clock,
  PlayCircle,
  PlusCircle,
  AlertCircle,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExamCenter: React.FC = () => {
  const { exams, setActiveExamId, setActiveScreen, currentUser } = useApp();

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

          <button
            onClick={() => setActiveScreen('take_live_camera_exam')}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-xs shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98] transition-all shrink-0"
          >
            <PlayCircle className="w-5 h-5 fill-white" />
            <span>Launch 100-Marks Camera Exam</span>
          </button>
        </div>
      </div>

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
