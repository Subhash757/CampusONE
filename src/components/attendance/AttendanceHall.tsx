import React, { useState } from 'react';
import {
  CalendarCheck,
  AlertTriangle,
  PlusCircle,
  CheckCircle,
  Clock,
  Send,
  X,
  TrendingUp,
  Download,
  ArrowLeft,
  QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { QRCodeDisplay } from '../common/QRCodeDisplay';

export const AttendanceHall: React.FC = () => {
  const {
    currentUser,
    getStudentAttendanceSummary,
    attendanceRecords,
    leaveRequests,
    submitLeaveRequest,
    setActiveScreen,
    theme
  } = useApp();

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showQRPassModal, setShowQRPassModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveEndDate, setLeaveEndDate] = useState(new Date().toISOString().split('T')[0]);

  const summary = getStudentAttendanceSummary(currentUser.id);
  const studentLeaveRequests = leaveRequests.filter(l => l.studentId === currentUser.id);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    submitLeaveRequest({
      studentId: currentUser.id,
      studentName: currentUser.name,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason
    });
    setLeaveReason('');
    setShowLeaveModal(false);
  };

  const chartData = summary.subjectStats.map(s => ({
    name: s.subjectCode,
    percent: s.percent,
    isShortage: s.isShortage
  }));

  const exportCSV = () => {
    const headers = ['Date', 'Subject', 'Status', 'Marked By', 'Time'];
    const rows = attendanceRecords.map(r => [r.date, r.subjectName, r.status, r.markedByFacultyId, r.markedAt]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VVCE_Attendance_${currentUser.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <ArrowLeft className="w-5 h-5 text-[#10B981]" />
            </button>
            <span className="p-2 rounded-xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <CalendarCheck className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Attendance Hall</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Real-time subject-wise tracking, minimum VVCE threshold (75%) monitoring & leave requests.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {(currentUser.role === 'faculty' || currentUser.role === 'admin') && (
            <button
              onClick={() => setActiveScreen('mark_attendance')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Class Attendance</span>
            </button>
          )}

          <button
            onClick={() => setShowQRPassModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-teal-400 font-semibold text-xs border border-teal-500/30 shadow-sm transition-all"
          >
            <QrCode className="w-4 h-4 text-teal-400" />
            <span>My Student QR Pass</span>
          </button>

          <button
            onClick={() => setShowLeaveModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-white/10 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Apply Leave Request</span>
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs border border-slate-300 dark:border-white/10 transition-all"
            title="Export Attendance History to CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Overall Attendance Rate</span>
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">{summary.overallPercent}%</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${summary.overallPercent >= 75 ? 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'}`}>
              {summary.overallPercent >= 75 ? 'Required Met' : 'Shortage Alert'}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${summary.overallPercent >= 75 ? 'bg-teal-500' : 'bg-rose-500'}`}
              style={{ width: `${summary.overallPercent}%` }}
            />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Classes Attended</span>
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">
            {summary.attendedClasses} <span className="text-lg font-normal text-slate-500 dark:text-slate-400">/ {summary.totalClasses}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Recorded across {summary.subjectStats.length} active subjects this semester.</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Leave Requests</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">
            {studentLeaveRequests.length} <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Submitted</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {studentLeaveRequests.filter(l => l.status === 'approved').length} Approved • {studentLeaveRequests.filter(l => l.status === 'pending').length} Pending Review
          </p>
        </div>
      </div>

      {/* Subject Wise Grid & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 flex items-center space-x-2">
            <span>Subject Attendance Matrix</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400">Semester 6</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.subjectStats.map(subj => (
              <div
                key={subj.subjectId}
                className={`glass-panel rounded-2xl p-4 border transition-all ${
                  subj.isShortage
                    ? 'border-rose-300 dark:border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/20'
                    : 'border-slate-200 dark:border-white/10 hover:border-teal-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">{subj.subjectCode}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{subj.subjectName}</h3>
                  </div>
                  <span className={`text-sm font-black font-mono px-2.5 py-1 rounded-xl ${subj.isShortage ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300'}`}>
                    {subj.percent}%
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{subj.attended} attended / {subj.total} total</span>
                    <span>Req: 75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${subj.isShortage ? 'bg-rose-600' : 'bg-teal-500'}`}
                      style={{ width: `${subj.percent}%` }}
                    />
                  </div>
                </div>

                {subj.isShortage && (
                  <div className="mt-3 flex items-center space-x-2 p-2 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 text-[11px] font-medium border border-rose-200 dark:border-rose-500/30">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <span>Attendance Shortage Warning! Minimum 75% required for exams.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Rechart */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">Attendance Distribution Chart</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={11} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', borderColor: theme === 'dark' ? '#334155' : '#cbd5e1', borderRadius: '12px', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }} />
                <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isShortage ? '#dc2626' : '#0d9488'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leave Request Dialog Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/20 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Apply for Leave Approval</span>
              </h3>
              <button onClick={() => setShowLeaveModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="State official reason (e.g. Medical emergency, Hackathon attendance...)"
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-teal-500 outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Student QR Pass Modal */}
      {showQRPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/20 shadow-2xl space-y-4 bg-slate-900 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <QrCode className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-white">Digital Attendance Pass</h3>
              </div>
              <button
                onClick={() => setShowQRPassModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950/60 border border-white/10">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/50" />
              <div>
                <p className="text-sm font-bold text-white">{currentUser.name}</p>
                <p className="text-xs text-teal-400 font-mono">{currentUser.rollNumber || '4VV21CS042'}</p>
                <p className="text-[10px] text-slate-400">{currentUser.email}</p>
              </div>
            </div>

            <QRCodeDisplay
              value={`VVCE-STUDENT-PASS::ID=${currentUser.id}::ROLL=${currentUser.rollNumber || '4VV21CS042'}::NAME=${currentUser.name}::DEPT=CSE`}
              size={180}
              title="Official Student QR ID Pass"
              subtitle="Present this QR code to classroom scanners or faculty devices for instant roster check-in."
              badgeText="Verified Student Pass"
              showCopy={true}
              showDownload={true}
            />

            <button
              onClick={() => setShowQRPassModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-all border border-white/10"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
