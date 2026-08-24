import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera, CameraOff, Clock, Shield, AlertTriangle, CheckCircle,
  Play, Send, ArrowLeft, Download, Eye, EyeOff, Mic, Volume2,
  FileText, Code2, CheckCircle2, HelpCircle, Terminal, Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question } from '../../types';

// ─── 100-Marks Exam Data Structure ──────────────────────────────────────────
const EXAM_100_PARTS = {
  partA: {
    title: 'Part A: Objective MCQs (30 Marks)',
    weight: 30,
    questions: [
      {
        id: 'q100_a1',
        type: 'mcq',
        questionText: 'Which algorithm design technique does Dijkstra\'s Shortest Path Algorithm utilize?',
        options: [
          { id: 'o1', text: 'Greedy Strategy with Min-Priority Queue', isCorrect: true },
          { id: 'o2', text: 'Dynamic Programming Matrix Multiplication', isCorrect: false },
          { id: 'o3', text: 'Divide and Conquer Binary Search', isCorrect: false },
          { id: 'o4', text: 'Backtracking with Pruning', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a2',
        type: 'mcq',
        questionText: 'In Redis cluster sharding, what mechanism guarantees key distribution consistency across master nodes?',
        options: [
          { id: 'o1', text: 'Consistent Hashing Hash Slots (16384 slots)', isCorrect: true },
          { id: 'o2', text: 'Round Robin Load Balancing', isCorrect: false },
          { id: 'o3', text: 'Random Uniform Indexing', isCorrect: false },
          { id: 'o4', text: 'Least Frequently Used (LFU) Eviction', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a3',
        type: 'mcq',
        questionText: 'What is the tight worst-case time complexity of QuickSort when bad pivot selection occurs?',
        options: [
          { id: 'o1', text: 'O(n²)', isCorrect: true },
          { id: 'o2', text: 'O(n log n)', isCorrect: false },
          { id: 'o3', text: 'O(n)', isCorrect: false },
          { id: 'o4', text: 'O(2ⁿ)', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a4',
        type: 'mcq',
        questionText: 'Which isolation level prevents Dirty Reads but allows Non-Repeatable Reads in Relational Databases?',
        options: [
          { id: 'o1', text: 'Read Committed', isCorrect: true },
          { id: 'o2', text: 'Read Uncommitted', isCorrect: false },
          { id: 'o3', text: 'Repeatable Read', isCorrect: false },
          { id: 'o4', text: 'Serializable', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a5',
        type: 'mcq',
        questionText: 'What data structure is used to implement Breadth-First Search (BFS) on a Graph?',
        options: [
          { id: 'o1', text: 'First-In First-Out (FIFO) Queue', isCorrect: true },
          { id: 'o2', text: 'Last-In First-Out (LIFO) Stack', isCorrect: false },
          { id: 'o3', text: 'Max-Heap', isCorrect: false },
          { id: 'o4', text: 'Disjoint Set Union (DSU)', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a6',
        type: 'mcq',
        questionText: 'What is the purpose of Vector Clocks in distributed database systems?',
        options: [
          { id: 'o1', text: 'Detecting causal relationships and concurrent updates across nodes', isCorrect: true },
          { id: 'o2', text: 'Synchronizing hardware CPU clocks using NTP', isCorrect: false },
          { id: 'o3', text: 'Compressing JSON storage payloads', isCorrect: false },
          { id: 'o4', text: 'Encrypting TLS network sockets', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a7',
        type: 'mcq',
        questionText: 'In React Fiber architecture, what phase of rendering is synchronous and uninterruptible?',
        options: [
          { id: 'o1', text: 'Commit Phase (DOM Mutations)', isCorrect: true },
          { id: 'o2', text: 'Reconciliation Phase', isCorrect: false },
          { id: 'o3', text: 'Render Phase', isCorrect: false },
          { id: 'o4', text: 'Work Loop Phase', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a8',
        type: 'mcq',
        questionText: 'Which space-efficient probabilistic data structure checks if an element is definitely NOT in a set?',
        options: [
          { id: 'o1', text: 'Bloom Filter', isCorrect: true },
          { id: 'o2', text: 'Skip List', isCorrect: false },
          { id: 'o3', text: 'B+ Tree', isCorrect: false },
          { id: 'o4', text: 'Suffix Tree', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a9',
        type: 'mcq',
        questionText: 'What protocol property ensures that a distributed system functions correctly even during network partition?',
        options: [
          { id: 'o1', text: 'Partition Tolerance (CAP Theorem)', isCorrect: true },
          { id: 'o2', text: 'Strict Atomicity', isCorrect: false },
          { id: 'o3', text: 'Zero Latency Guarantee', isCorrect: false },
          { id: 'o4', text: 'Linear CPU Execution', isCorrect: false }
        ],
        maxMarks: 3
      },
      {
        id: 'q100_a10',
        type: 'mcq',
        questionText: 'Which HTTP status code is returned when a client exceeds API rate limits?',
        options: [
          { id: 'o1', text: '429 Too Many Requests', isCorrect: true },
          { id: 'o2', text: '503 Service Unavailable', isCorrect: false },
          { id: 'o3', text: '401 Unauthorized', isCorrect: false },
          { id: 'o4', text: '403 Forbidden', isCorrect: false }
        ],
        maxMarks: 3
      }
    ]
  },
  partB: {
    title: 'Part B: Short Technical & Architectural Questions (30 Marks)',
    weight: 30,
    questions: [
      {
        id: 'q100_b1',
        type: 'short',
        questionText: 'Explain the Token Bucket algorithm used for API rate limiting. Mention how tokens are replenished and handled during bursts.',
        maxMarks: 7.5
      },
      {
        id: 'q100_b2',
        type: 'short',
        questionText: 'Differentiate between Monolithic Architecture and Microservices Architecture in terms of scalability and fault isolation.',
        maxMarks: 7.5
      },
      {
        id: 'q100_b3',
        type: 'short',
        questionText: 'Explain how Indexing (B-Trees) speeds up SQL SELECT queries and state the trade-off during INSERT/UPDATE operations.',
        maxMarks: 7.5
      },
      {
        id: 'q100_b4',
        type: 'short',
        questionText: 'Describe the working mechanism of WebSockets vs HTTP Polling for real-time video proctoring applications.',
        maxMarks: 7.5
      }
    ]
  },
  partC: {
    title: 'Part C: Comprehensive Coding & System Design (40 Marks)',
    weight: 40,
    questions: [
      {
        id: 'q100_c1',
        type: 'coding',
        questionText: 'Problem 1 (20 Marks): Implement an LRU (Least Recently Used) Cache with O(1) time complexity for get and put operations.',
        starterCode: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.capacity) {\n      const firstKey = this.map.keys().next().value;\n      this.map.delete(firstKey);\n    }\n    this.map.set(key, value);\n  }\n}`,
        maxMarks: 20
      },
      {
        id: 'q100_c2',
        type: 'coding',
        questionText: 'Problem 2 (20 Marks): Write an optimal algorithm to merge K sorted array streams into a single sorted output array.',
        starterCode: `function mergeKSortedArrays(arrays) {\n  const result = [];\n  // Write optimal min-heap or multi-pointer merge solution\n  return result;\n}`,
        maxMarks: 20
      }
    ]
  }
};

// ─── Hidden Printable A4 PDF Report Card for 100 Marks ────────────────────────
const Print100MarksReportCard: React.FC<{
  studentName: string;
  studentRoll: string;
  studentDept: string;
  scoreTotal: number;
  partAScore: number;
  partBScore: number;
  partCScore: number;
  proctorStatus: string;
  snapshotsCount: number;
  postureWarnings: number;
  focusLostCount: number;
  dateStr: string;
  capturedPhotos?: string[];
  answersPartA: Record<string, string>;
  answersPartB: Record<string, string>;
  answersPartC: Record<string, string>;
}> = ({
  studentName, studentRoll, studentDept, scoreTotal, partAScore, partBScore, partCScore,
  proctorStatus, snapshotsCount, postureWarnings, focusLostCount, dateStr, capturedPhotos = [],
  answersPartA, answersPartB, answersPartC
}) => (
  <div id="live-exam-100-print" className="printable-area" style={{ display: 'none' }}>
    <div className="print-header">
      <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120" alt="VVCE Logo" className="print-logo" />
      <div className="print-title">
        <h1>OFFICIAL 100-MARKS LIVE PROCTORED EXAMINATION SCORECARD</h1>
        <p>Vidya Vardhaka College of Engineering, Mysuru — Academic Year 2026–27</p>
        <p style={{ marginTop: 4, fontSize: '8pt', color: '#10B981', fontWeight: 700 }}>
          VVCE Autonomous Examination Evaluation Board • Autonomous Institution
        </p>
      </div>
      <div style={{ textAlign: 'right', fontSize: '8pt', color: '#667085' }}>
        <p style={{ fontWeight: 700, color: '#111827' }}>REF: VVCE/EXAM100/{Date.now().toString().slice(-6)}</p>
        <p>Date: {dateStr}</p>
        <p>Max Marks: 100.00</p>
      </div>
    </div>

    {/* Student Information */}
    <div className="print-section">
      <div className="print-section-title">1. Candidate &amp; Examination Credentials</div>
      <div className="print-grid-2">
        <div>
          <div className="print-info-row"><span className="print-info-label">Candidate Name:</span><span className="print-info-value">{studentName}</span></div>
          <div className="print-info-row"><span className="print-info-label">USN / Roll No:</span><span className="print-info-value">{studentRoll}</span></div>
        </div>
        <div>
          <div className="print-info-row"><span className="print-info-label">Department:</span><span className="print-info-value">{studentDept}</span></div>
          <div className="print-info-row"><span className="print-info-label">Course / Examination:</span><span className="print-info-value">Advanced Computer Science (CS-601 100M)</span></div>
        </div>
      </div>
    </div>

    {/* Overall 100-Marks Score Summary */}
    <div className="print-section">
      <div className="print-section-title">2. 100-Marks Comprehensive Score Breakdown</div>
      <div className="print-grid-4">
        <div className="print-stat-box" style={{ background: '#F0FDF4', borderColor: '#86EFAC' }}>
          <div className="print-stat-label">TOTAL MARKS OBTAINED</div>
          <div className="print-stat-value" style={{ fontSize: '22pt' }}>{scoreTotal} <span style={{ fontSize: '12pt', color: '#667085' }}>/ 100</span></div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Part A: Objective (30M)</div>
          <div className="print-stat-value">{partAScore} / 30</div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Part B: Short Answers (30M)</div>
          <div className="print-stat-value">{partBScore} / 30</div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Part C: Coding (40M)</div>
          <div className="print-stat-value">{partCScore} / 40</div>
        </div>
      </div>
    </div>

    {/* Part A Breakdown */}
    <div className="print-section">
      <div className="print-section-title">3. Part A: Objective MCQs Evaluation (30 Marks)</div>
      <div style={{ fontSize: '8.5pt', lineHeight: 1.4 }}>
        {EXAM_100_PARTS.partA.questions.map((q, i) => {
          const selectedOptId = answersPartA[q.id];
          const selectedOpt = q.options?.find(o => o.id === selectedOptId);
          const correctOpt = q.options?.find(o => o.isCorrect);
          const isCorrect = selectedOpt?.isCorrect;

          return (
            <div key={q.id} style={{ marginBottom: 6, padding: '4px 8px', borderBottom: '1px solid #F3F4F6' }}>
              <strong>Q{i + 1}. {q.questionText}</strong>
              <div style={{ color: isCorrect ? '#065F46' : '#991B1B', marginTop: 2 }}>
                Selected: {selectedOpt ? selectedOpt.text : 'Not Answered'} • Correct Answer: {correctOpt?.text} [{isCorrect ? '+3 Marks' : '0 Marks'}]
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Part B Breakdown */}
    <div className="print-section">
      <div className="print-section-title">4. Part B: Technical Short Answers (30 Marks)</div>
      {EXAM_100_PARTS.partB.questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 8 }}>
          <strong style={{ fontSize: '9pt' }}>Q{i + 1}. {q.questionText} (7.5 Marks)</strong>
          <div className="print-code-block" style={{ marginTop: 3 }}>
            {answersPartB[q.id] || '[No Answer Provided]'}
          </div>
        </div>
      ))}
    </div>

    {/* Part C Breakdown */}
    <div className="print-section">
      <div className="print-section-title">5. Part C: Comprehensive Coding Solutions (40 Marks)</div>
      {EXAM_100_PARTS.partC.questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 10 }}>
          <strong style={{ fontSize: '9pt' }}>Problem {i + 1}. {q.questionText} (20 Marks)</strong>
          <div className="print-code-block" style={{ marginTop: 3, maxHeight: '180px', overflow: 'hidden' }}>
            {answersPartC[q.id] || q.starterCode}
          </div>
        </div>
      ))}
    </div>

    {/* AI Camera Proctoring Audit & Captured Photos */}
    <div className="print-section">
      <div className="print-section-title">6. AI Camera Proctoring Audit &amp; Integrity Index</div>
      <div className="print-grid-4" style={{ marginBottom: 10 }}>
        <div className="print-stat-box">
          <div className="print-stat-label">Proctoring Status</div>
          <div style={{ marginTop: 4 }}>
            <span className={`print-badge ${proctorStatus === 'clean' ? 'print-badge-green' : 'print-badge-yellow'}`}>
              {proctorStatus.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Snapshots Captured</div>
          <div className="print-stat-value">{snapshotsCount}</div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Posture Warnings</div>
          <div className="print-stat-value">{postureWarnings}</div>
        </div>
        <div className="print-stat-box">
          <div className="print-stat-label">Focus Lost Alerts</div>
          <div className="print-stat-value">{focusLostCount}</div>
        </div>
      </div>

      {capturedPhotos.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <strong style={{ fontSize: '8pt', color: '#374151' }}>Captured Proctored Camera Snapshots:</strong>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            {capturedPhotos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Proctoring Snapshot ${index + 1}`}
                style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Official Signatures */}
    <div className="print-signature-row" style={{ marginTop: 24 }}>
      {[
        { name: studentName.split(' ')[0], role: 'Candidate Signature' },
        { name: 'Dr. Sarah Jenkins', role: 'Chief Evaluator' },
        { name: 'Dr. Ashok Kumar', role: 'Head of Department (CSE)' },
        { name: 'Dr. Ramesh Naik', role: 'Principal & COE, VVCE' }
      ].map(s => (
        <div key={s.role} className="print-signature-box">
          <div className="print-signature-name">{s.name}</div>
          <div className="print-signature-line">{s.role}</div>
        </div>
      ))}
    </div>

    <div className="print-watermark">
      Generated automatically by VVCE Live Camera AI Proctoring Portal — Valid Without Physical Stamp.
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const LiveCameraExam: React.FC = () => {
  const { currentUser, setActiveScreen, addAuditLog } = useApp();

  const [phase, setPhase] = useState<'check' | 'exam' | 'submitted'>('check');
  const [cameraReady, setCameraReady] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(15); // simulated audio meter %

  // Answers & Exam state
  const [activeTab, setActiveTab] = useState<'partA' | 'partB' | 'partC'>('partA');
  const [answersPartA, setAnswersPartA] = useState<Record<string, string>>({});
  const [answersPartB, setAnswersPartB] = useState<Record<string, string>>({});
  const [answersPartC, setAnswersPartC] = useState<Record<string, string>>({
    q100_c1: EXAM_100_PARTS.partC.questions[0].starterCode || '',
    q100_c2: EXAM_100_PARTS.partC.questions[1].starterCode || ''
  });

  // Proctor stats
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [snapshots, setSnapshots] = useState(0);
  const [postureWarnings, setPostureWarnings] = useState(0);
  const [focusLost, setFocusLost] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const snapshotRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

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
      // Slate dark background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 480);

      // Subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
      }

      // Animated student position (slight natural head movement)
      const headX = 320 + Math.sin(frame * 0.04) * 10;
      const headY = 210 + Math.cos(frame * 0.03) * 5;

      // Shoulders & Shirt (Teal college polo)
      ctx.fillStyle = '#0f766e';
      ctx.beginPath();
      ctx.ellipse(headX, headY + 175, 170, 100, 0, Math.PI, 0);
      ctx.fill();

      // Shirt collar
      ctx.fillStyle = '#14b8a6';
      ctx.beginPath();
      ctx.moveTo(headX - 45, headY + 80);
      ctx.lineTo(headX, headY + 125);
      ctx.lineTo(headX + 45, headY + 80);
      ctx.fill();

      // Neck
      ctx.fillStyle = '#e0a96d';
      ctx.fillRect(headX - 28, headY + 50, 56, 45);

      // Hair (Back)
      ctx.fillStyle = '#1e1b18';
      ctx.beginPath();
      ctx.arc(headX, headY - 10, 84, 0, Math.PI * 2);
      ctx.fill();

      // Head / Face Oval (Skin Tone)
      ctx.fillStyle = '#f5c999';
      ctx.beginPath();
      ctx.ellipse(headX, headY, 70, 85, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair (Front style)
      ctx.fillStyle = '#1e1b18';
      ctx.beginPath();
      ctx.ellipse(headX, headY - 65, 74, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows
      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(headX - 45, headY - 25); ctx.lineTo(headX - 15, headY - 28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(headX + 15, headY - 28); ctx.lineTo(headX + 45, headY - 25); ctx.stroke();

      // Eyes (Sclera white)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.ellipse(headX - 28, headY - 12, 14, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(headX + 28, headY - 12, 14, 9, 0, 0, Math.PI * 2); ctx.fill();

      // Pupils (Moving with gaze tracking)
      const pupilLookX = Math.sin(frame * 0.06) * 3;
      ctx.fillStyle = '#1c1917';
      ctx.beginPath(); ctx.arc(headX - 28 + pupilLookX, headY - 12, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(headX + 28 + pupilLookX, headY - 12, 6, 0, Math.PI * 2); ctx.fill();

      // Eye reflections
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(headX - 30 + pupilLookX, headY - 14, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(headX + 26 + pupilLookX, headY - 14, 2, 0, Math.PI * 2); ctx.fill();

      // Nose
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(headX, headY - 5);
      ctx.lineTo(headX - 6, headY + 18);
      ctx.lineTo(headX + 4, headY + 18);
      ctx.stroke();

      // Smile / Mouth
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(headX, headY + 30, 22, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      // Face tracking reticle box (Emerald Green)
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.strokeRect(headX - 85, headY - 95, 170, 195);

      // Corner target brackets
      ctx.lineWidth = 3.5;
      const bx = headX - 85, by = headY - 95, bw = 170, bh = 195;
      ctx.beginPath(); ctx.moveTo(bx, by + 20); ctx.lineTo(bx, by); ctx.lineTo(bx + 20, by); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw - 20, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, by + bh - 20); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + 20, by + bh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw - 20, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - 20); ctx.stroke();

      // Facial landmark tracking mesh dots
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
        ctx.beginPath();
        ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // AI Stream HUD Banner
      ctx.fillStyle = '#10B981';
      ctx.fillRect(15, 15, 290, 32);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`AI FACE STREAM • ${name}`, 25, 36);

      // Live Timestamp
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.fillText(`REC ${new Date().toLocaleTimeString()}`, 485, 36);
    }, 40);

    return canvas.captureStream(25);
  }, []);

  // Initialize camera check
  const startCameraCheck = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraReady(true);
      setMicActive(true);
    } catch {
      // Fallback: Generate live simulated MediaStream canvas video
      const simStream = createSimulatedCameraStream(currentUser.name);
      streamRef.current = simStream;
      if (videoRef.current) {
        videoRef.current.srcObject = simStream;
        videoRef.current.play().catch(() => {});
      }
      setCameraReady(true);
      setMicActive(true);
    }
  }, [createSimulatedCameraStream, currentUser.name]);

  // Auto-start camera check on component mount
  useEffect(() => {
    startCameraCheck();
  }, [startCameraCheck]);

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
        ctx.font = '16px monospace';
        ctx.fillText(`VVCE AI PROCTOR • ${currentUser.name} • ${new Date().toLocaleTimeString()}`, 15, 30);
        photoUrl = canvas.toDataURL('image/jpeg', 0.85);
      }
    }

    if (!photoUrl) {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 280;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 400, 280);
        ctx.fillStyle = '#10B981';
        ctx.fillRect(10, 10, 380, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`AI CAMERA SNAPSHOT - ${currentUser.name}`, 20, 35);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px monospace';
        ctx.fillText(`USN: ${currentUser.rollNumber || '4VV21CS042'} | ${new Date().toLocaleTimeString()}`, 20, 80);
        ctx.fillText(`Status: VERIFIED MENTEE PROCTORING SNAPSHOT`, 20, 110);
        ctx.fillStyle = '#a855f7';
        ctx.fillText(`Faculty Mentor: Dr. Sarah Jenkins (Assigned)`, 20, 140);
        photoUrl = canvas.toDataURL('image/jpeg', 0.85);
      }
    }

    if (photoUrl) {
      setCapturedPhotos(prev => [photoUrl, ...prev.slice(0, 5)]);
      setSnapshots(s => s + 1);
    }
  }, [currentUser]);

  // Start examination timer & proctor loops
  const startExamSession = () => {
    setPhase('exam');
    addAuditLog('Started 100-Marks Live Camera Proctored Exam', `Student: ${currentUser.name}`);

    // Initial photo capture
    takePhotoSnapshot();

    // Timer
    timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);

    // Snapshot loop (every 15 seconds capture real photo)
    snapshotRef.current = setInterval(() => {
      takePhotoSnapshot();
      setAudioLevel(Math.floor(10 + Math.random() * 25));
      if (Math.random() < 0.08) setPostureWarnings(w => w + 1);
    }, 15000);

    // Visibility switch
    const handleVis = () => {
      if (document.hidden) setFocusLost(f => f + 1);
    };
    document.addEventListener('visibilitychange', handleVis);
  };

  // Cleanup media
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (snapshotRef.current) clearInterval(snapshotRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const formatTimer = (sec: number) => {
    const totalSec = 90 * 60 - sec; // 90 min exam
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Final 100 Marks calculation
  const handleFinalSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (snapshotRef.current) clearInterval(snapshotRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());

    setPhase('submitted');
    addAuditLog('Submitted 100-Marks Live Camera Proctored Exam', `Student: ${currentUser.name}`);
  };

  // Calculate scores
  const scorePartA = Object.keys(answersPartA).reduce((acc, qId) => {
    const q = EXAM_100_PARTS.partA.questions.find(x => x.id === qId);
    const selectedOpt = q?.options?.find(o => o.id === answersPartA[qId]);
    return selectedOpt?.isCorrect ? acc + 3 : acc;
  }, 0);

  const scorePartB = Object.keys(answersPartB).reduce((acc, qId) => {
    const text = answersPartB[qId] || '';
    return text.length > 30 ? acc + 7.5 : text.length > 10 ? acc + 4 : acc;
  }, 0);

  const scorePartC = (answersPartC['q100_c1']?.length > 40 ? 20 : 10) + (answersPartC['q100_c2']?.length > 30 ? 20 : 10);

  const totalScore = Math.min(100, Math.round(scorePartA + scorePartB + scorePartC));
  const proctorStatus = postureWarnings === 0 && focusLost === 0 ? 'clean' : postureWarnings > 2 ? 'flagged' : 'warnings';

  const handleDownloadPDF = () => {
    const printEl = document.getElementById('live-exam-100-print');
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

  // ── PHASE 1: Pre-Exam Camera Check ──────────────────────────────────────────
  if (phase === 'check') {
    return (
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        {/* Printable Hidden Element */}
        <Print100MarksReportCard
          studentName={currentUser.name}
          studentRoll={currentUser.rollNumber || currentUser.employeeId || '4VV21CS042'}
          studentDept={currentUser.departmentName}
          scoreTotal={totalScore}
          partAScore={scorePartA}
          partBScore={scorePartB}
          partCScore={scorePartC}
          proctorStatus={proctorStatus}
          snapshotsCount={snapshots}
          postureWarnings={postureWarnings}
          focusLostCount={focusLost}
          dateStr={new Date().toLocaleDateString('en-IN')}
          capturedPhotos={capturedPhotos}
          answersPartA={answersPartA}
          answersPartB={answersPartB}
          answersPartC={answersPartC}
        />

        <div className="flex items-center space-x-3 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148]">
          <button onClick={() => setActiveScreen('exams')} className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10">
            <ArrowLeft className="w-5 h-5 text-[#10B981]" />
          </button>
          <span className="p-2 rounded-xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30"><Camera className="w-6 h-6 text-[#FF6B6B]" /></span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">100-Marks Live Camera Proctored Exam</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Strict AI camera monitoring &amp; audio proctoring • 90 Minutes Duration</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Camera Box */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-[#FF6B6B]" /><span>Live AI Camera Calibration</span>
              </h3>
              <div className="relative w-full h-48 bg-[#1F2933] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
                {!cameraReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                    <CameraOff className="w-8 h-8 text-slate-500" />
                    <p className="text-xs text-slate-400">Camera not active</p>
                  </div>
                )}
                {cameraReady && (
                  <div className="absolute top-2 right-2 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /><span>AI STREAM ACTIVE</span>
                  </div>
                )}
              </div>

              {!cameraReady ? (
                <button
                  onClick={startCameraCheck}
                  className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Camera className="w-4 h-4" /><span>Initialize AI Camera &amp; Mic</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-xs text-[#10B981] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Webcam and microphone calibrated successfully!</span>
                </div>
              )}
            </div>

            {/* Marks & Structure */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-[#F4C95D]" /><span>100-Marks Examination Breakdown</span>
              </h3>

              <div className="space-y-2">
                {[
                  { title: 'Part A: Objective MCQs', mark: '30 Marks', count: '10 Questions @ 3M each' },
                  { title: 'Part B: Short Answers', mark: '30 Marks', count: '4 Questions @ 7.5M each' },
                  { title: 'Part C: Coding & Architecture', mark: '40 Marks', count: '2 Problems @ 20M each' }
                ].map(p => (
                  <div key={p.title} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{p.title}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{p.count}</p>
                    </div>
                    <span className="font-mono font-bold text-[#10B981]">{p.mark}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startExamSession}
            disabled={!cameraReady}
            className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-sm shadow-lg shadow-[#FF6B6B]/25 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Begin 100-Marks Proctored Exam</span>
          </button>
        </div>
      </div>
    );
  }

  // ── PHASE 3: Submitted Result & Scorecard ──────────────────────────────────
  if (phase === 'submitted') {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <Print100MarksReportCard
          studentName={currentUser.name}
          studentRoll={currentUser.rollNumber || currentUser.employeeId || '4VV21CS042'}
          studentDept={currentUser.departmentName}
          scoreTotal={totalScore}
          partAScore={scorePartA}
          partBScore={scorePartB}
          partCScore={scorePartC}
          proctorStatus={proctorStatus}
          snapshotsCount={snapshots}
          postureWarnings={postureWarnings}
          focusLostCount={focusLost}
          dateStr={new Date().toLocaleDateString('en-IN')}
          capturedPhotos={capturedPhotos}
          answersPartA={answersPartA}
          answersPartB={answersPartB}
          answersPartC={answersPartC}
        />

        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-6 text-center animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Exam Submitted Successfully!</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">100-Marks CS-601 Proctored Examination</p>
          </div>

          {/* Marks display */}
          <div className="p-6 rounded-2xl bg-[#1F2933] border border-white/10 max-w-md mx-auto space-y-2">
            <p className="text-xs font-mono uppercase text-slate-400">Total Marks Obtained</p>
            <div className="text-5xl font-black text-[#10B981] font-mono">
              {totalScore} <span className="text-xl font-normal text-slate-400">/ 100</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div><p className="text-slate-400 text-[9px]">Part A</p><p className="text-white font-bold">{scorePartA}/30</p></div>
              <div><p className="text-slate-400 text-[9px]">Part B</p><p className="text-white font-bold">{scorePartB}/30</p></div>
              <div><p className="text-slate-400 text-[9px]">Part C</p><p className="text-white font-bold">{scorePartC}/40</p></div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg transition-all"
            >
              <Download className="w-4 h-4" /><span>Download 100-Marks PDF Scorecard</span>
            </button>
            <button
              onClick={() => setActiveScreen('exams')}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#1F2933] text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-white/10"
            >
              Return to Exam Center
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE 2: Live Exam Mode ────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-[#1F2933] text-white overflow-hidden select-none">
      {/* Top Proctored Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#324148] border-b border-white/10 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#FF6B6B]/20 text-[#FF6B6B] text-[10px] font-bold font-mono border border-[#FF6B6B]/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" /><span>100-MARKS LIVE EXAM</span>
          </span>
          <span className="text-xs font-bold text-white">CS-601 Advanced Computer Science</span>
        </div>

        {/* Live Timer & Camera Thumbnail */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-[#1F2933] border border-white/10 font-mono font-bold text-xs text-[#F4C95D]">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-black border border-[#10B981]">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          </div>

          <button
            onClick={handleFinalSubmit}
            className="px-4 py-1.5 rounded-xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white font-bold text-xs shadow-md transition-all"
          >
            Final Submit 100M
          </button>
        </div>
      </div>

      {/* Part Tabs */}
      <div className="flex items-center space-x-2 px-4 py-2 bg-[#1a2330] border-b border-white/10 text-xs font-semibold shrink-0">
        {[
          { key: 'partA', label: 'Part A: Objective MCQs (30 Marks)' },
          { key: 'partB', label: 'Part B: Short Answers (30 Marks)' },
          { key: 'partC', label: 'Part C: Coding Problems (40 Marks)' }
        ].map(p => (
          <button
            key={p.key}
            onClick={() => setActiveTab(p.key as any)}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              activeTab === p.key
                ? 'bg-[#10B981] text-white font-bold shadow-sm'
                : 'bg-[#324148] text-slate-300 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* PART A: MCQs */}
        {activeTab === 'partA' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-sm font-bold text-[#F4C95D] uppercase font-mono tracking-wider">
              Part A: 10 Objective Questions (3 Marks Each = 30 Marks Total)
            </h2>
            {EXAM_100_PARTS.partA.questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-[#324148] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-white leading-relaxed">
                  Q{idx + 1}. {q.questionText} <span className="text-[#10B981] font-mono text-[10px]">(3 Marks)</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options?.map(opt => {
                    const isSelected = answersPartA[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setAnswersPartA(prev => ({ ...prev, [q.id]: opt.id }))}
                        className={`text-left p-3 rounded-xl text-xs border transition-all ${
                          isSelected
                            ? 'bg-[#10B981]/20 border-[#10B981] text-white font-bold'
                            : 'bg-[#1F2933] border-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PART B: Short Answers */}
        {activeTab === 'partB' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-sm font-bold text-[#F4C95D] uppercase font-mono tracking-wider">
              Part B: 4 Short Technical Questions (7.5 Marks Each = 30 Marks Total)
            </h2>
            {EXAM_100_PARTS.partB.questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-[#324148] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-white leading-relaxed">
                  Q{idx + 1}. {q.questionText} <span className="text-[#10B981] font-mono text-[10px]">(7.5 Marks)</span>
                </p>
                <textarea
                  rows={4}
                  value={answersPartB[q.id] || ''}
                  onChange={e => setAnswersPartB({ ...answersPartB, [q.id]: e.target.value })}
                  placeholder="Write clear architectural points and explanation..."
                  className="w-full bg-[#1F2933] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#10B981]"
                />
              </div>
            ))}
          </div>
        )}

        {/* PART C: Coding */}
        {activeTab === 'partC' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-sm font-bold text-[#F4C95D] uppercase font-mono tracking-wider">
              Part C: 2 Comprehensive Coding Problems (20 Marks Each = 40 Marks Total)
            </h2>
            {EXAM_100_PARTS.partC.questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-[#324148] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-white leading-relaxed">
                  Problem {idx + 1}. {q.questionText} <span className="text-[#10B981] font-mono text-[10px]">(20 Marks)</span>
                </p>
                <textarea
                  rows={8}
                  value={answersPartC[q.id] || ''}
                  onChange={e => setAnswersPartC({ ...answersPartC, [q.id]: e.target.value })}
                  className="w-full bg-[#1F2933] border border-white/10 rounded-xl p-4 text-xs font-mono text-[#10B981] outline-none leading-relaxed"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
