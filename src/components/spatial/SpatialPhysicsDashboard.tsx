import React, { useState } from 'react';
import {
  GripVertical,
  CalendarCheck,
  FileText,
  Trophy,
  Mic,
  Save,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SpatialPhysicsDashboard: React.FC = () => {
  const {
    currentUser,
    setActiveScreen,
    getStudentAttendanceSummary,
    exams,
    interviewAttempts,
    spatialWidgets,
    updateWidgetPosition
  } = useApp();

  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
  const [positions, setPositions] = useState(spatialWidgets);
  const [isSaved, setIsSaved] = useState(false);

  const studentSummary = currentUser.role === 'student' ? getStudentAttendanceSummary(currentUser.id) : null;
  const activeExams = exams.filter(e => e.status === 'active');
  const latestInterview = interviewAttempts[0];

  const handleDragStart = (e: React.MouseEvent, id: string) => {
    setDraggedWidgetId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedWidgetId || draggedWidgetId === targetId) return;

    const newPositions = [...positions];
    const idx1 = newPositions.findIndex(w => w.id === draggedWidgetId);
    const idx2 = newPositions.findIndex(w => w.id === targetId);

    if (idx1 !== -1 && idx2 !== -1) {
      const tempX = newPositions[idx1].x;
      const tempY = newPositions[idx1].y;
      newPositions[idx1].x = newPositions[idx2].x;
      newPositions[idx1].y = newPositions[idx2].y;
      newPositions[idx2].x = tempX;
      newPositions[idx2].y = tempY;

      setPositions(newPositions);
    }
    setDraggedWidgetId(null);
  };

  const handleSaveLayout = () => {
    positions.forEach(p => updateWidgetPosition(p.id, p.x, p.y));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 z-10 pointer-events-auto">
      {/* Top Floating Spatial Bar */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-3 px-5 shadow-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148]">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />
          <span className="text-xs font-mono text-[#667085] dark:text-[#A0AEC0]">
            Spatial Physics Active • <span className="text-[#10B981] font-bold">Cannon.js Bounds Enabled</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPositions(spatialWidgets)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-white/10 font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
          </button>

          <button
            onClick={handleSaveLayout}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isSaved
                ? 'bg-[#F4C95D] text-[#1F2933] border-[#F4C95D] shadow-md shadow-[#F4C95D]/30'
                : 'bg-[#10B981] hover:bg-[#059669] text-white border-[#10B981] shadow-md shadow-[#10B981]/25'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Layout Saved!' : 'Snap & Save Layout'}</span>
          </button>
        </div>
      </div>

      {/* Floating Spatial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {/* Card 1: Attendance Quick View */}
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'widget_att')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'widget_att')}
          className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Attendance Status</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">VVCE Requirement: 75%</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </div>

          {studentSummary ? (
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{studentSummary.overallPercent}%</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${studentSummary.overallPercent < 75 ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30' : 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30'}`}>
                  {studentSummary.overallPercent < 75 ? 'Shortage Alert' : 'Good Standing'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{studentSummary.attendedClasses} attended out of {studentSummary.totalClasses} classes</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">Faculty/Admin View: Select student roster in Attendance Hall.</p>
          )}

          <button
            onClick={() => setActiveScreen('attendance')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            <span>Enter Attendance Hall</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Active Mid-Term Exam */}
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'widget_exam')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'widget_exam')}
          className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Examination Center</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{activeExams.length} Active Exam(s)</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </div>

          {activeExams.length > 0 ? (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">Live Assessment</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{activeExams[0].title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Duration: {activeExams[0].durationMinutes} mins • {activeExams[0].totalMarks} Marks</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">No active exams scheduled right now.</p>
          )}

          <button
            onClick={() => setActiveScreen('exams')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-500/20 active:scale-[0.98] transition-all"
          >
            <span>Launch Exam Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Quiz Arena & Leaderboard */}
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'widget_quiz')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'widget_quiz')}
          className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Quiz Arena</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Streak & Rewards</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </div>

          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-white/5">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Quiz Points</p>
              <p className="text-xl font-black text-violet-700 dark:text-violet-400 font-mono">420 PTS</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 font-bold border border-violet-200 dark:border-violet-500/30">
              ⚡ 5 Day Streak
            </span>
          </div>

          <button
            onClick={() => setActiveScreen('quizzes')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all"
          >
            <span>Enter Quiz Arena</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 4: Mock Interview Studio */}
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'widget_interview')}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'widget_interview')}
          className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">AI Interview Studio</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Voice & Speech Analytics</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </div>

          {latestInterview ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 dark:text-slate-300 font-semibold">{latestInterview.questionTitle}</span>
                <span className="text-teal-700 dark:text-teal-400 font-bold font-mono">{latestInterview.scores.overall}% Score</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{latestInterview.aiFeedback}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">Practice Technical, HR, & STAR interviews with real-time scoring.</p>
          )}

          <button
            onClick={() => setActiveScreen('interviews')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all"
          >
            <span>Launch Interview Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
