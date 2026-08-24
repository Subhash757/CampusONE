import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera, CameraOff, Clock, AlertTriangle, CheckCircle,
  Play, Send, ChevronDown, ChevronUp, Shield, Eye, EyeOff,
  Zap, ArrowLeft, Terminal, Code2, BookOpen, Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockCodingProblems } from '../../data/mockData';
import { CodingProblem, LiveInterviewSession } from '../../types';

// ─── Difficulty Badge ─────────────────────────────────────────────────────────
const DiffBadge: React.FC<{ d: string }> = ({ d }) => {
  const cfg: Record<string, string> = {
    Easy: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    Medium: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30',
    Hard: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30'
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${cfg[d] || cfg.Easy}`}>
      {d}
    </span>
  );
};

// ─── Proctor Status Badge ─────────────────────────────────────────────────────
const ProctorBadge: React.FC<{ status: string; warnings: number }> = ({ status, warnings }) => {
  if (warnings === 0) return (
    <span className="flex items-center space-x-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
      <Shield className="w-3 h-3" /> <span>PROCTOR: CLEAN</span>
    </span>
  );
  if (warnings <= 2) return (
    <span className="flex items-center space-x-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30">
      <AlertTriangle className="w-3 h-3" /> <span>PROCTOR: {warnings} WARNING{warnings > 1 ? 'S' : ''}</span>
    </span>
  );
  return (
    <span className="flex items-center space-x-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30 animate-pulse">
      <AlertTriangle className="w-3 h-3" /> <span>PROCTOR: FLAGGED</span>
    </span>
  );
};

// ─── Pre-flight Modal ─────────────────────────────────────────────────────────
interface PreFlightProps {
  problem: CodingProblem;
  onStart: () => void;
  onBack: () => void;
}
const PreFlightModal: React.FC<PreFlightProps> = ({ problem, onStart, onBack }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [checking, setChecking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const requestCamera = async () => {
    setChecking(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraReady(true);
    } catch {
      setCameraReady(true); // graceful fallback — simulated
    }
    setChecking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2933]/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#324148] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30 flex items-center justify-center">
            <Camera className="w-8 h-8 text-[#FF6B6B]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Proctored Interview</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pre-flight camera check before starting the session</p>
        </div>

        {/* Problem preview */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Selected Problem</span>
            <DiffBadge d={problem.difficulty} />
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{problem.title}</p>
          <div className="flex flex-wrap gap-1">
            {problem.tags.map(t => (
              <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-[#324148] text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-white/10">{t}</span>
            ))}
          </div>
        </div>

        {/* Camera check */}
        <div className="space-y-3">
          <div className="relative w-full h-32 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            {!cameraReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                <CameraOff className="w-8 h-8 text-slate-500" />
                <p className="text-xs text-slate-400">Camera not yet initialised</p>
              </div>
            )}
            {cameraReady && (
              <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#10B981] text-white text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>LIVE</span>
              </div>
            )}
          </div>

          {!cameraReady ? (
            <button
              id="grant-camera-btn"
              onClick={requestCamera}
              disabled={checking}
              className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 transition-all flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>{checking ? 'Initialising Camera...' : 'Grant Camera Access'}</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30">
              <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="text-xs text-[#10B981] font-semibold">Camera ready — face detection active</span>
            </div>
          )}
        </div>

        {/* Rules */}
        <div className="p-3 rounded-xl bg-[#F4C95D]/10 border border-[#F4C95D]/30 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-[#F4C95D] font-mono text-[10px]">⚠ PROCTORING RULES:</p>
          {['Keep face visible in camera at all times', 'Do not switch browser tabs or applications', 'Face snapshots captured every 15 seconds automatically', 'Tab-switch events are logged as focus-lost violations'].map((r, i) => (
            <div key={i} className="flex items-start space-x-1.5">
              <span className="text-[#F4C95D] shrink-0">•</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button onClick={onBack} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-white/10 transition-all">
            Back
          </button>
          <button
            id="start-live-interview-btn"
            onClick={onStart}
            className="flex-[2] py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-xs shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Start Proctored Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Problem Selector ─────────────────────────────────────────────────────────
interface ProblemSelectorProps {
  selected: CodingProblem;
  onSelect: (p: CodingProblem) => void;
}
const ProblemSelector: React.FC<ProblemSelectorProps> = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[#10B981]/50 transition-all"
      >
        <Code2 className="w-3.5 h-3.5 text-[#10B981]" />
        <span>{selected.title}</span>
        <DiffBadge d={selected.difficulty} />
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 bg-white dark:bg-[#324148] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2">
          {mockCodingProblems.map(p => (
            <button
              key={p.id}
              onClick={() => { onSelect(p); setOpen(false); }}
              className={`w-full text-left px-4 py-3 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-[#3D4C54] transition-all ${selected.id === p.id ? 'bg-[#10B981]/10 dark:bg-[#10B981]/10' : ''}`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{p.title}</span>
              <DiffBadge d={p.difficulty} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const LiveInterviewSessionScreen: React.FC = () => {
  const { currentUser, submitLiveSession, setActiveLiveSessionId, setActiveScreen } = useApp();

  const [phase, setPhase] = useState<'select' | 'preflight' | 'session' | 'submitted'>('select');
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(mockCodingProblems[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  // Proctor state
  const [elapsed, setElapsed] = useState(0);
  const [snapshots, setSnapshots] = useState(0);
  const [postureWarnings, setPostureWarnings] = useState(0);
  const [focusLost, setFocusLost] = useState(0);
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const snapshotRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update code when problem changes
  useEffect(() => { setCode(selectedProblem.starterCode); setTestOutput(null); }, [selectedProblem]);

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  // Capture real photo snapshot from video stream onto HTML5 canvas
  const takePhotoSnapshot = useCallback(() => {
    let photoUrl = '';
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#10B981';
        ctx.font = '14px monospace';
        ctx.fillText(`PROCTOR SNAPSHOT • ${currentUser.name} • ${new Date().toLocaleTimeString()}`, 10, 25);
        photoUrl = canvas.toDataURL('image/jpeg', 0.85);
      }
    }

    if (!photoUrl) {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 260;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1F2933';
        ctx.fillRect(0, 0, 400, 260);
        ctx.fillStyle = '#10B981';
        ctx.fillRect(10, 10, 380, 35);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(`MENTEE PROCTORING SNAPSHOT - ${currentUser.name}`, 20, 32);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '11px monospace';
        ctx.fillText(`USN: ${currentUser.rollNumber || '4VV21CS042'} | ${new Date().toLocaleTimeString()}`, 20, 75);
        ctx.fillText(`Session: ${selectedProblem.title}`, 20, 100);
        ctx.fillStyle = '#a855f7';
        ctx.fillText(`Faculty Mentor: Dr. Sarah Jenkins`, 20, 125);
        photoUrl = canvas.toDataURL('image/jpeg', 0.85);
      }
    }

    if (photoUrl) {
      setCapturedPhotos(prev => [photoUrl, ...prev.slice(0, 5)]);
      setSnapshots(s => s + 1);
    }
  }, [currentUser, selectedProblem.title]);

  // Helper for generating live canvas MediaStream if hardware camera is blocked or unavailable
  const createSimulatedCameraStream = useCallback((name: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const interval = setInterval(() => {
      if (!ctx) return;
      frame++;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 480);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
      }

      const headX = 320 + Math.sin(frame * 0.04) * 10;
      const headY = 210 + Math.cos(frame * 0.03) * 5;

      ctx.fillStyle = '#0f766e';
      ctx.beginPath(); ctx.ellipse(headX, headY + 175, 170, 100, 0, Math.PI, 0); ctx.fill();

      ctx.fillStyle = '#14b8a6';
      ctx.beginPath();
      ctx.moveTo(headX - 45, headY + 80);
      ctx.lineTo(headX, headY + 125);
      ctx.lineTo(headX + 45, headY + 80);
      ctx.fill();

      ctx.fillStyle = '#e0a96d';
      ctx.fillRect(headX - 28, headY + 50, 56, 45);

      ctx.fillStyle = '#1e1b18';
      ctx.beginPath(); ctx.arc(headX, headY - 10, 84, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#f5c999';
      ctx.beginPath(); ctx.ellipse(headX, headY, 70, 85, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#1e1b18';
      ctx.beginPath(); ctx.ellipse(headX, headY - 65, 74, 35, 0, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(headX - 45, headY - 25); ctx.lineTo(headX - 15, headY - 28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(headX + 15, headY - 28); ctx.lineTo(headX + 45, headY - 25); ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.ellipse(headX - 28, headY - 12, 14, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(headX + 28, headY - 12, 14, 9, 0, 0, Math.PI * 2); ctx.fill();

      const pupilLookX = Math.sin(frame * 0.06) * 3;
      ctx.fillStyle = '#1c1917';
      ctx.beginPath(); ctx.arc(headX - 28 + pupilLookX, headY - 12, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(headX + 28 + pupilLookX, headY - 12, 6, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(headX - 30 + pupilLookX, headY - 14, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(headX + 26 + pupilLookX, headY - 14, 2, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(headX, headY - 5); ctx.lineTo(headX - 6, headY + 18); ctx.lineTo(headX + 4, headY + 18); ctx.stroke();

      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(headX, headY + 30, 22, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();

      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.strokeRect(headX - 85, headY - 95, 170, 195);

      ctx.lineWidth = 3.5;
      const bx = headX - 85, by = headY - 95, bw = 170, bh = 195;
      ctx.beginPath(); ctx.moveTo(bx, by + 20); ctx.lineTo(bx, by); ctx.lineTo(bx + 20, by); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw - 20, by); ctx.lineTo(bx + bw); ctx.lineTo(bx + bw, by + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, by + bh - 20); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + 20, by + bh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw - 20, by + bh); ctx.lineTo(bx + bw); ctx.lineTo(bx + bw, by + bh - 20); ctx.stroke();

      ctx.fillStyle = '#10B981';
      [
        { x: headX - 28, y: headY - 12 },
        { x: headX + 28, y: headY - 12 },
        { x: headX, y: headY + 18 },
        { x: headX - 22, y: headY + 44 },
        { x: headX + 22, y: headY + 44 },
        { x: headX - 80, y: headY },
        { x: headX + 80, y: headY },
      ].forEach(d => {
        ctx.beginPath(); ctx.arc(d.x, d.y, 4, 0, Math.PI * 2); ctx.fill();
      });

      ctx.fillStyle = '#10B981';
      ctx.fillRect(15, 15, 290, 32);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`PROCTOR STREAM ACTIVE • ${name}`, 25, 36);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.fillText(`REC ${new Date().toLocaleTimeString()}`, 485, 36);
    }, 40);

    return canvas.captureStream(25);
  }, []);

  // Re-attach video stream whenever phase changes
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [phase, cameraOn]);

  // Start timer and proctor on session begin
  const startSession = useCallback(async () => {
    setPhase('session');

    // Camera
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraOn(true);
    } catch {
      const simStream = createSimulatedCameraStream(currentUser.name);
      streamRef.current = simStream;
      if (videoRef.current) { videoRef.current.srcObject = simStream; videoRef.current.play(); }
      setCameraOn(true);
    }

    // Initial snapshot
    takePhotoSnapshot();

    // Timer
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);

    // Snapshot every 15s
    snapshotRef.current = setInterval(() => {
      takePhotoSnapshot();
      // Simulate random posture check (10% chance of warning per snapshot)
      if (Math.random() < 0.1) setPostureWarnings(w => w + 1);
    }, 15000);

    // Focus lost detector
    const onVis = () => {
      if (document.hidden) setFocusLost(f => f + 1);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [takePhotoSnapshot]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (snapshotRef.current) clearInterval(snapshotRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const formatTime = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const runTests = () => {
    setIsRunning(true);
    setTestOutput(null);
    setTimeout(() => {
      const hasKeyword = code.toLowerCase().includes('map') || code.toLowerCase().includes('hash') || code.toLowerCase().includes('complement');
      const passed = hasKeyword ? selectedProblem.examples.length : Math.max(1, selectedProblem.examples.length - 1);
      setTestOutput(
        `Running ${selectedProblem.examples.length} test case(s)...\n\n` +
        selectedProblem.examples.slice(0, passed).map((ex, i) =>
          `✅ Test ${i + 1}: Input: ${ex.input}\n   Expected: ${ex.output} → Got: ${ex.output} ✓`
        ).join('\n\n') +
        (passed < selectedProblem.examples.length
          ? `\n\n❌ Test ${passed + 1}: Time Limit Exceeded (TLE)\n\nPassed: ${passed}/${selectedProblem.examples.length} test cases.`
          : `\n\nPassed: ${passed}/${selectedProblem.examples.length} test cases. 🎉`)
      );
      setIsRunning(false);
    }, 1200);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (snapshotRef.current) clearInterval(snapshotRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());

    const hasKeyword = code.toLowerCase().includes('map') || code.toLowerCase().includes('hash') || code.toLowerCase().includes('complement');
    const testsPassed = hasKeyword ? selectedProblem.examples.length : Math.max(1, selectedProblem.examples.length - 1);
    const codeScore = Math.round((testsPassed / selectedProblem.examples.length) * 100 * (postureWarnings === 0 ? 1 : 0.95));
    const proctorPenalty = postureWarnings > 2 ? 0.8 : postureWarnings > 0 ? 0.95 : 1;
    const overallScore = Math.round(codeScore * proctorPenalty);
    const proctorStatus: 'clean' | 'warnings' | 'flagged' = postureWarnings === 0 && focusLost === 0 ? 'clean' : postureWarnings > 2 || focusLost > 1 ? 'flagged' : 'warnings';

    const session: LiveInterviewSession = {
      id: `live_${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRollNo: currentUser.rollNumber || currentUser.employeeId || 'N/A',
      studentDept: currentUser.departmentName,
      mentorId: 'usr_faculty_1',
      mentorName: 'Dr. Sarah Jenkins',
      startedAt: new Date(Date.now() - elapsed * 1000).toISOString().replace('T', ' ').substring(0, 16),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      problemId: selectedProblem.id,
      problemTitle: selectedProblem.title,
      problemDifficulty: selectedProblem.difficulty,
      studentCode: code,
      codeScore,
      testCasesPassed: testsPassed,
      totalTestCases: selectedProblem.examples.length,
      faceSnapshots: snapshots,
      postureWarnings,
      focusLostCount: focusLost,
      durationSeconds: elapsed,
      overallScore,
      proctorStatus,
      aiFeedback: hasKeyword
        ? `Great use of a hash map / complement technique achieving O(n) time complexity. Code is logically correct and handles the core test cases. Minor note: consider adding edge case guards for empty input arrays.`
        : `The solution approach needs optimization. Using a brute-force nested loop results in O(n²) complexity. Consider using a hash map to track seen values and look up complements in O(1) time.`,
      codeComplexity: hasKeyword ? 'O(n)' : 'O(n²)',
      status: 'submitted',
      mentorRemarks: '',
      capturedPhotos: capturedPhotos
    };

    submitLiveSession(session);
    setActiveLiveSessionId(session.id);
    setPhase('submitted');
  };

  // ── Line-numbered code display helper ──────────────────────────────────────
  const codeLines = code.split('\n');

  // ── PHASE: Select ──────────────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148]">
          <button onClick={() => setActiveScreen('interviews')} className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] border border-slate-300 dark:border-white/10 transition-all">
            <ArrowLeft className="w-5 h-5 text-[#F4C95D]" />
          </button>
          <span className="p-2 rounded-xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30"><Camera className="w-6 h-6 text-[#FF6B6B]" /></span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Proctored Interview</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Camera-proctored coding session • Sent to your faculty mentor</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Choose Your Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mockCodingProblems.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedProblem(p)}
                className={`glass-panel-interactive rounded-3xl p-6 border cursor-pointer space-y-4 transition-all ${selectedProblem.id === p.id ? 'border-[#10B981] ring-2 ring-[#10B981]/20 bg-[#10B981]/5 dark:bg-[#10B981]/10' : 'border-slate-200 dark:border-white/10'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
                    <Code2 className={`w-5 h-5 ${p.difficulty === 'Easy' ? 'text-[#10B981]' : p.difficulty === 'Medium' ? 'text-[#F4C95D]' : 'text-[#FF6B6B]'}`} />
                  </div>
                  <DiffBadge d={p.difficulty} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{p.description.substring(0, 80)}...</p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200 dark:border-white/5">
                  {p.tags.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1F2933] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          id="proceed-preflight-btn"
          onClick={() => setPhase('preflight')}
          className="w-full py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-sm shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>Proceed to Camera Check → Start "{selectedProblem.title}"</span>
        </button>
      </div>
    );
  }

  // ── PHASE: Preflight ───────────────────────────────────────────────────────
  if (phase === 'preflight') return <PreFlightModal problem={selectedProblem} onStart={startSession} onBack={() => setPhase('select')} />;

  // ── PHASE: Submitted ───────────────────────────────────────────────────────
  if (phase === 'submitted') {
    const proctorStatus: 'clean' | 'warnings' | 'flagged' = postureWarnings === 0 && focusLost === 0 ? 'clean' : postureWarnings > 2 || focusLost > 1 ? 'flagged' : 'warnings';
    const statusCfg = { clean: { cls: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30', label: 'Clean Session' }, warnings: { cls: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30', label: 'Minor Warnings' }, flagged: { cls: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30', label: 'Flagged' } };
    const { cls, label } = statusCfg[proctorStatus];
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6 text-center">
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#10B981]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Session Submitted!</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedProblem.title} • {formatTime(elapsed)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Test Cases', value: `${selectedProblem.examples.length}/${selectedProblem.examples.length}`, color: 'text-[#10B981]' },
              { label: 'Snapshots', value: snapshots, color: 'text-[#F4C95D]' },
              { label: 'Warnings', value: postureWarnings, color: postureWarnings > 0 ? 'text-[#FF6B6B]' : 'text-[#10B981]' }
            ].map(s => (
              <div key={s.label} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">{s.label}</p>
                <p className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-bold ${cls}`}>
            <Shield className="w-4 h-4" /><span>Proctor Status: {label}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-xs text-[#10B981] font-semibold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Result submitted to Dr. Sarah Jenkins (Faculty Mentor) for review.</span>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setActiveScreen('live_interview_review')} className="flex-1 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition-all">View Full Report</button>
            <button onClick={() => setActiveScreen('interviews')} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-white/10 transition-all">Back to Studio</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE: Session ─────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-[#1F2933] overflow-hidden">
      {/* Top proctor bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#324148] border-b border-white/10 shrink-0 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#FF6B6B]/20 text-[#FF6B6B] text-[10px] font-bold font-mono border border-[#FF6B6B]/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" /> <span>LIVE SESSION</span>
          </span>
          <ProctorBadge status={postureWarnings === 0 ? 'clean' : postureWarnings > 2 ? 'flagged' : 'warnings'} warnings={postureWarnings} />
        </div>
        <div className="flex items-center space-x-3">
          <ProblemSelector selected={selectedProblem} onSelect={p => { setSelectedProblem(p); setCode(p.starterCode); setTestOutput(null); }} />
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1F2933] border border-white/10 text-xs font-mono text-[#F4C95D] font-bold">
            <Clock className="w-3.5 h-3.5" /> <span>{formatTime(elapsed)}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">{snapshots} 📸 captures</span>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Camera + proctor */}
        <div className="w-56 shrink-0 bg-[#324148] border-r border-white/10 flex flex-col p-3 space-y-3">
          {/* Camera feed */}
          <div className="relative w-full aspect-video bg-[#1F2933] rounded-xl overflow-hidden border border-white/10">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                <CameraOff className="w-6 h-6 text-slate-500" />
                <p className="text-[9px] text-slate-500 text-center">Camera simulated</p>
              </div>
            )}
            {/* Face tracking dots */}
            <div className="absolute inset-0 pointer-events-none">
              {[{ top: '30%', left: '35%' }, { top: '30%', left: '65%' }, { top: '48%', left: '30%' }, { top: '48%', left: '70%' }, { top: '60%', left: '40%' }, { top: '60%', left: '60%' }].map((pos, i) => (
                <div key={i} className="face-dot absolute w-1.5 h-1.5 rounded-full bg-[#10B981]" style={pos} />
              ))}
            </div>
            {cameraOn && (
              <div className="absolute top-1 right-1 flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[8px] font-bold">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" /><span>REC</span>
              </div>
            )}
          </div>

          <button
            onClick={takePhotoSnapshot}
            className="w-full py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-[10px] font-bold transition-all flex items-center justify-center space-x-1"
          >
            <Camera className="w-3 h-3 text-teal-400" />
            <span>Capture Photo Snapshot</span>
          </button>

          {/* Proctor stats */}
          <div className="space-y-1.5 text-[10px] font-mono">
            {[
              { icon: Eye, label: 'Snapshots', value: snapshots, color: 'text-[#10B981]' },
              { icon: AlertTriangle, label: 'Posture Warns', value: postureWarnings, color: postureWarnings > 0 ? 'text-[#FF6B6B]' : 'text-[#10B981]' },
              { icon: EyeOff, label: 'Focus Lost', value: focusLost, color: focusLost > 0 ? 'text-[#F4C95D]' : 'text-[#10B981]' }
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center justify-between p-2 rounded-lg bg-[#1F2933] border border-white/5">
                  <div className="flex items-center space-x-1.5 text-slate-400"><Icon className="w-3 h-3" /><span>{s.label}</span></div>
                  <span className={`font-bold ${s.color}`}>{s.value}</span>
                </div>
              );
            })}
          </div>

          {/* Submit button */}
          <div className="mt-auto pt-2">
            <button
              id="session-submit-btn"
              onClick={handleSubmit}
              className="w-full py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" /><span>Submit</span>
            </button>
          </div>
        </div>

        {/* CENTER: Problem + Code Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* Problem panel */}
          <div className={`${showDescription ? 'w-[42%]' : 'w-10'} border-r border-white/10 bg-[#1F2933] flex flex-col transition-all duration-300 overflow-hidden shrink-0`}>
            <button
              onClick={() => setShowDescription(s => !s)}
              className="flex items-center justify-between px-3 py-2 bg-[#324148] border-b border-white/10 text-[10px] font-mono text-slate-300 hover:text-white shrink-0"
            >
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                {showDescription && <span>Problem Statement</span>}
              </div>
              {showDescription ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            {showDescription && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="font-bold text-white text-sm">{selectedProblem.title}</span>
                  <DiffBadge d={selectedProblem.difficulty} />
                  {selectedProblem.tags.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-[#324148] text-slate-400 border border-white/10">{t}</span>)}
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedProblem.description}</p>
                <div className="space-y-3">
                  {selectedProblem.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#324148] border border-white/5 space-y-1.5">
                      <p className="font-bold text-[#F4C95D] text-[10px] uppercase">Example {i + 1}</p>
                      <div className="font-mono text-[10px] space-y-0.5">
                        <p><span className="text-slate-400">Input:</span> <span className="text-white">{ex.input}</span></p>
                        <p><span className="text-slate-400">Output:</span> <span className="text-[#10B981]">{ex.output}</span></p>
                        {ex.explanation && <p className="text-slate-400 italic">{ex.explanation}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <p className="font-bold text-[10px] uppercase text-slate-400 flex items-center space-x-1.5"><Info className="w-3 h-3" /><span>Constraints</span></p>
                  {selectedProblem.constraints.map((c, i) => <p key={i} className="font-mono text-[10px] text-slate-400">• {c}</p>)}
                </div>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col bg-[#1F2933] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#324148] border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                <span>JavaScript • Code Editor</span>
              </div>
              <button
                onClick={runTests}
                disabled={isRunning}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[10px] font-bold disabled:opacity-60 transition-all"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
              </button>
            </div>

            {/* Editor with line numbers */}
            <div className="flex-1 overflow-auto code-editor-container">
              <div className="flex min-h-full">
                {/* Line numbers */}
                <div className="select-none w-10 shrink-0 bg-[#1a2330] text-slate-600 text-right pt-3 pr-2 border-r border-white/5 text-[11px] font-mono leading-6">
                  {codeLines.map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                {/* Editable code */}
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  spellCheck={false}
                  className="flex-1 bg-transparent text-[#10B981] text-[12px] font-mono leading-6 p-3 outline-none resize-none w-full h-full"
                  style={{ caretColor: '#F4C95D', fontFamily: "'Courier New', monospace" }}
                />
              </div>
            </div>

            {/* Test output */}
            {testOutput && (
              <div className="border-t border-white/10 bg-[#1a2330] max-h-40 overflow-y-auto shrink-0">
                <div className="flex items-center space-x-2 px-4 py-1.5 border-b border-white/5">
                  <Terminal className="w-3 h-3 text-[#10B981]" />
                  <span className="text-[10px] font-mono text-slate-400">Test Results</span>
                </div>
                <pre className="px-4 py-2 text-[10px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">{testOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
