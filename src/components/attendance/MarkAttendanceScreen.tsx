import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  QrCode,
  Search,
  Save,
  ShieldAlert,
  UserCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSubjects, mockUsers } from '../../data/mockData';
import { QRCodeDisplay } from '../common/QRCodeDisplay';

export const MarkAttendanceScreen: React.FC = () => {
  const { markAttendance, setActiveScreen } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState(mockSubjects[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [classGroup, setClassGroup] = useState('CSE-6A');
  const [showQRModal, setShowQRModal] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Student roster state for selected class
  const classStudents = mockUsers.filter(u => u.role === 'student');
  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'late' | 'on_leave'>>(
    () => {
      const initial: Record<string, 'present' | 'absent' | 'late' | 'on_leave'> = {};
      classStudents.forEach(s => {
        initial[s.id] = 'present';
      });
      return initial;
    }
  );

  const selectedSubject = mockSubjects.find(s => s.id === selectedSubjectId) || mockSubjects[0];

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'on_leave') => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  };

  const handleScanQR = (studentId: string) => {
    setAttendanceState(prev => ({ ...prev, [studentId]: 'present' }));
  };

  const handleSaveAttendance = () => {
    const records = classStudents.map(student => ({
      studentId: student.id,
      studentName: student.name,
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      date: selectedDate,
      status: attendanceState[student.id],
      method: 'manual' as const
    }));

    markAttendance(records);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setActiveScreen('attendance');
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <UserCheck className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-white">Faculty Attendance Marker</h1>
          </div>
          <p className="text-xs text-slate-400">
            Record class attendance with duplicate protection, audit logging & QR scanner simulation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowQRModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs border border-teal-500/30 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>Simulate QR Code Scanner</span>
          </button>

          <button
            onClick={handleSaveAttendance}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs border transition-all ${
              isSaved
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-400 shadow-glow-teal hover:opacity-90'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'Attendance Saved!' : 'Save & Publish Roster'}</span>
          </button>
        </div>
      </div>

      {/* Class & Subject Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Select Subject</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500 outline-none"
          >
            {mockSubjects.map(s => (
              <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Attendance Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Class Section</label>
          <input
            type="text"
            value={classGroup}
            onChange={(e) => setClassGroup(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200">
            Student Roster ({classStudents.length} Students)
          </h2>
          <div className="text-xs font-mono text-slate-400">
            Subject: <span className="text-teal-400 font-bold">{selectedSubject.code}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Quick Mark Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {classStudents.map(student => {
                const status = attendanceState[student.id] || 'present';
                return (
                  <tr key={student.id} className="hover:bg-slate-900/40 transition-all">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-100">{student.name}</p>
                        <p className="text-[10px] text-slate-400">{student.email}</p>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">
                      {student.rollNumber || 'CS2024-001'}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        status === 'present' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        status === 'absent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        status === 'late' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      }`}>
                        {status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] transition-all ${status === 'present' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] transition-all ${status === 'absent' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] transition-all ${status === 'late' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic QR Scanner & Session Generator Modal */}
      {showQRModal && (
        <QRScannerModal
          subject={selectedSubject}
          date={selectedDate}
          classGroup={classGroup}
          students={classStudents}
          attendanceState={attendanceState}
          onScanStudent={(studentId) => handleScanQR(studentId)}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
};

// Sub-component for the interactive QR modal
interface QRScannerModalProps {
  subject: { id: string; code: string; name: string };
  date: string;
  classGroup: string;
  students: Array<{ id: string; name: string; email: string; avatar: string; rollNumber?: string }>;
  attendanceState: Record<string, 'present' | 'absent' | 'late' | 'on_leave'>;
  onScanStudent: (studentId: string) => void;
  onClose: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({
  subject,
  date,
  classGroup,
  students,
  attendanceState,
  onScanStudent,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'broadcast'>('scanner');
  const [lastScannedStudent, setLastScannedStudent] = useState<string | null>(null);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [tokenSeconds, setTokenSeconds] = useState(30);
  const [sessionToken, setSessionToken] = useState(() => Math.random().toString(36).substring(2, 9).toUpperCase());
  const [selectedStudentForQR, setSelectedStudentForQR] = useState(students[0] || null);

  // Timer countdown for dynamic broadcast token security
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTokenSeconds((prev) => {
        if (prev <= 1) {
          setSessionToken(Math.random().toString(36).substring(2, 9).toUpperCase());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = (student: (typeof students)[0]) => {
    onScanStudent(student.id);
    setLastScannedStudent(student.name);
    setScanMessage(`Successfully Scanned QR for ${student.name} (${student.rollNumber || '4VV21CS001'})! Status set to PRESENT.`);
    setTimeout(() => {
      setScanMessage(null);
    }, 3000);
  };

  const broadcastValue = `VVCE-SESSION-ATT::SUB=${subject.code}::DATE=${date}::SEC=${classGroup}::TOKEN=${sessionToken}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl space-y-5 bg-slate-900/95 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <QrCode className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>QR Code Attendance System</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase">
                  VVCE Live
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {subject.code} • Section {classGroup} • {date}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Camera Scanner Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'broadcast'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Broadcast Session QR</span>
          </button>
        </div>

        {/* Tab 1: Live Scanner Viewport */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            {/* Camera Frame Box */}
            <div className="relative w-full h-56 rounded-2xl bg-slate-950 border-2 border-teal-500/40 overflow-hidden flex flex-col items-center justify-center space-y-3 p-4 shadow-inner">
              {/* Corner Framing Markers */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-teal-400" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-teal-400" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-teal-400" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-teal-400" />

              {/* Laser Beam Scanning Animation Line */}
              <div className="absolute inset-x-4 top-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-[bounce_2s_infinite]" />

              {/* Student QR Preview or Scanner Reticle */}
              {selectedStudentForQR ? (
                <div className="flex flex-col items-center space-y-2">
                  <QRCodeDisplay
                    value={`VVCE-STD-PASS::ID=${selectedStudentForQR.id}::ROLL=${selectedStudentForQR.rollNumber || '4VV21CS001'}::NAME=${selectedStudentForQR.name}`}
                    size={110}
                    showCopy={false}
                    showDownload={false}
                    includeMargin={false}
                    className="p-2 border-0 bg-transparent shadow-none"
                  />
                  <span className="text-[10px] text-teal-300 font-mono bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                    Active Student Pass: {selectedStudentForQR.name}
                  </span>
                </div>
              ) : (
                <>
                  <QrCode className="w-16 h-16 text-teal-400/60 animate-pulse" />
                  <p className="text-xs text-slate-300 font-mono">Camera Feed Active — Ready to scan student QR</p>
                </>
              )}
            </div>

            {/* Success Toast */}
            {scanMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{scanMessage}</span>
              </div>
            )}

            {/* Quick Student Scan Simulation List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold">Simulate Scan Student QR Pass:</span>
                <span className="text-[10px] font-mono text-slate-400">Click student to scan pass</span>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1">
                {students.map((student) => {
                  const isPresent = attendanceState[student.id] === 'present';
                  return (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudentForQR(student);
                        handleSimulateScan(student);
                      }}
                      className={`flex items-center space-x-2.5 p-2 rounded-xl border text-left transition-all ${
                        isPresent
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-800/80 border-white/10 hover:border-teal-500/50 text-slate-200'
                      }`}
                    >
                      <img src={student.avatar} alt={student.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{student.rollNumber || '4VV21CS001'}</p>
                      </div>
                      {isPresent && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Broadcast Session QR Code */}
        {activeTab === 'broadcast' && (
          <div className="flex flex-col items-center space-y-4 py-2">
            <p className="text-xs text-slate-300 text-center max-w-md">
              Display this dynamic 2D QR code on the classroom projector. Students can scan this with their phone app to auto-verify attendance.
            </p>

            <QRCodeDisplay
              value={broadcastValue}
              size={180}
              title={`Live Session QR: ${subject.code}`}
              subtitle="Encrypted security payload • Refreshes automatically"
              badgeText={`Token: ${sessionToken} (${tokenSeconds}s)`}
              showCopy={true}
              showDownload={true}
            />

            {/* Countdown Progress Bar */}
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Security Token Refresh</span>
                <span className="text-teal-400 font-bold">{tokenSeconds}s remaining</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-1000"
                  style={{ width: `${(tokenSeconds / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            Roster Status: <span className="text-emerald-400 font-bold">{Object.values(attendanceState).filter(s => s === 'present').length} / {students.length} Present</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 transition-all"
          >
            Done & Save Status
          </button>
        </div>
      </div>
    </div>
  );
};

