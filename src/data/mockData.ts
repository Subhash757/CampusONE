import {
  User,
  Department,
  Subject,
  ClassScheduleItem,
  AttendanceRecord,
  LeaveRequest,
  Exam,
  Quiz,
  QuizLeaderboardEntry,
  InterviewCategory,
  InterviewQuestion,
  InterviewAttempt,
  Announcement,
  NotificationItem,
  SpatialWidget,
  AuditLog,
  AttendanceAuditLog,
  CodingProblem,
  LiveInterviewSession
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr_student_1',
    name: 'Alex Chen',
    email: 'vvce.alex.chen@vvce.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_cs',
    departmentName: 'Computer Science & Engineering (VVCE)',
    rollNumber: '4VV21CS042',
    semester: 6,
    classGroup: 'CSE-6A',
    status: 'active'
  },
  {
    id: 'usr_student_2',
    name: 'Priya Sharma',
    email: 'vvce.priya.sharma@vvce.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_cs',
    departmentName: 'Computer Science & Engineering (VVCE)',
    rollNumber: '4VV21CS089',
    semester: 6,
    classGroup: 'CSE-6A',
    status: 'active'
  },
  {
    id: 'usr_faculty_1',
    name: 'Dr. Sarah Jenkins',
    email: 'vvce.sarah.jenkins@vvce.ac.in',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_cs',
    departmentName: 'Computer Science & Engineering (VVCE)',
    employeeId: 'VVCE-FAC-8801',
    status: 'active'
  },
  {
    id: 'usr_admin_1',
    name: 'VVCE System Administrator',
    email: 'vvce.admin@vvce.ac.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_admin',
    departmentName: 'Academic Administration (VVCE)',
    employeeId: 'VVCE-ADM-1000',
    status: 'active'
  }
];

export const mockPendingUsers: User[] = [
  {
    id: 'usr_pending_1',
    name: 'Rohan Sharma',
    email: 'vvce.rohan.sharma@vvce.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_ece',
    departmentName: 'Electronics & Communication (VVCE)',
    rollNumber: '4VV21EC112',
    semester: 6,
    classGroup: 'ECE-6A',
    status: 'pending'
  },
  {
    id: 'usr_pending_2',
    name: 'Dr. Anita Rao',
    email: 'vvce.anita.rao@vvce.ac.in',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept_ece',
    departmentName: 'Electronics & Communication (VVCE)',
    employeeId: 'VVCE-FAC-9012',
    status: 'pending'
  }
];

export const mockDepartments: Department[] = [
  { id: 'dept_cs', name: 'Computer Science & Engineering', code: 'CSE', headOfDepartment: 'Dr. Alan Turing', totalStudents: 480, totalFaculty: 24 },
  { id: 'dept_ece', name: 'Electronics & Communication', code: 'ECE', headOfDepartment: 'Dr. Claude Shannon', totalStudents: 360, totalFaculty: 18 },
  { id: 'dept_mech', name: 'Mechanical Engineering', code: 'MECH', headOfDepartment: 'Dr. Nikola Tesla', totalStudents: 300, totalFaculty: 15 },
  { id: 'dept_mba', name: 'School of Business Admin', code: 'MBA', headOfDepartment: 'Dr. Peter Drucker', totalStudents: 240, totalFaculty: 12 }
];

export const mockSubjects: Subject[] = [
  { id: 'sub_cs601', code: 'CS-601', name: 'Distributed Systems & Cloud Architecture', departmentId: 'dept_cs', facultyId: 'usr_faculty_1', facultyName: 'Dr. Sarah Jenkins', credits: 4, semester: 6, requiredAttendancePercent: 75 },
  { id: 'sub_cs602', code: 'CS-602', name: 'Artificial Intelligence & Neural Networks', departmentId: 'dept_cs', facultyId: 'usr_faculty_1', facultyName: 'Dr. Sarah Jenkins', credits: 4, semester: 6, requiredAttendancePercent: 75 },
  { id: 'sub_cs603', code: 'CS-603', name: 'Full-Stack Web Engineering', departmentId: 'dept_cs', facultyId: 'usr_faculty_1', facultyName: 'Dr. Sarah Jenkins', credits: 3, semester: 6, requiredAttendancePercent: 75 },
  { id: 'sub_cs604', code: 'CS-604', name: 'Cybersecurity & Cryptography', departmentId: 'dept_cs', facultyId: 'usr_faculty_1', facultyName: 'Dr. Sarah Jenkins', credits: 3, semester: 6, requiredAttendancePercent: 75 },
  { id: 'sub_cs605', code: 'CS-605', name: 'Software Project Management', departmentId: 'dept_cs', facultyId: 'usr_faculty_1', facultyName: 'Dr. Sarah Jenkins', credits: 2, semester: 6, requiredAttendancePercent: 75 }
];

export const mockSchedule: ClassScheduleItem[] = [
  { id: 'sch_1', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', subjectCode: 'CS-601', facultyName: 'Dr. Sarah Jenkins', day: 'Monday', startTime: '09:00 AM', endTime: '10:15 AM', room: 'VVCE Hall 301', classGroup: 'CSE-6A' },
  { id: 'sch_2', subjectId: 'sub_cs602', subjectName: 'AI & Neural Networks', subjectCode: 'CS-602', facultyName: 'Dr. Sarah Jenkins', day: 'Monday', startTime: '10:30 AM', endTime: '11:45 AM', room: 'VVCE Lab 4', classGroup: 'CSE-6A' },
  { id: 'sch_3', subjectId: 'sub_cs603', subjectName: 'Full-Stack Engineering', subjectCode: 'CS-603', facultyName: 'Dr. Sarah Jenkins', day: 'Tuesday', startTime: '01:00 PM', endTime: '02:30 PM', room: 'Innovation Hub', classGroup: 'CSE-6A' },
  { id: 'sch_4', subjectId: 'sub_cs604', subjectName: 'Cybersecurity', subjectCode: 'CS-604', facultyName: 'Dr. Sarah Jenkins', day: 'Wednesday', startTime: '09:00 AM', endTime: '10:15 AM', room: 'VVCE Hall 204', classGroup: 'CSE-6A' },
  { id: 'sch_5', subjectId: 'sub_cs605', subjectName: 'Software PM', subjectCode: 'CS-605', facultyName: 'Dr. Sarah Jenkins', day: 'Thursday', startTime: '11:00 AM', endTime: '12:30 PM', room: 'Seminar Room B', classGroup: 'CSE-6A' },
  { id: 'sch_6', subjectId: 'sub_cs601', subjectName: 'Distributed Systems Lab', subjectCode: 'CS-601', facultyName: 'Dr. Sarah Jenkins', day: 'Friday', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Cloud Computing Lab', classGroup: 'CSE-6A' }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'att_101', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-01', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-01 09:15', method: 'qr_code' },
  { id: 'att_102', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-04', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-04 09:10', method: 'qr_code' },
  { id: 'att_103', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-08', status: 'absent', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-08 09:20', method: 'manual' },
  { id: 'att_104', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-11', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-11 09:05', method: 'qr_code' },
  { id: 'att_105', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-15', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-15 09:08', method: 'qr_code' },
  { id: 'att_106', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs601', subjectName: 'Distributed Systems', date: '2026-08-18', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-18 09:12', method: 'manual' },

  { id: 'att_201', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs604', subjectName: 'Cybersecurity & Cryptography', date: '2026-08-02', status: 'absent', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-02 09:15', method: 'manual' },
  { id: 'att_202', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs604', subjectName: 'Cybersecurity & Cryptography', date: '2026-08-05', status: 'absent', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-05 09:20', method: 'manual' },
  { id: 'att_203', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs604', subjectName: 'Cybersecurity & Cryptography', date: '2026-08-09', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-09 09:02', method: 'qr_code' },
  { id: 'att_204', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs604', subjectName: 'Cybersecurity & Cryptography', date: '2026-08-12', status: 'absent', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-12 09:10', method: 'manual' },
  { id: 'att_205', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs604', subjectName: 'Cybersecurity & Cryptography', date: '2026-08-16', status: 'late', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-16 09:25', method: 'student_id' },

  { id: 'att_301', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs602', subjectName: 'Artificial Intelligence & Neural Networks', date: '2026-08-03', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-03 10:35', method: 'qr_code' },
  { id: 'att_302', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs602', subjectName: 'Artificial Intelligence & Neural Networks', date: '2026-08-07', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-07 10:32', method: 'qr_code' },

  { id: 'att_401', studentId: 'usr_student_1', studentName: 'Alex Chen', subjectId: 'sub_cs603', subjectName: 'Full-Stack Web Engineering', date: '2026-08-05', status: 'present', markedByFacultyId: 'usr_faculty_1', markedAt: '2026-08-05 13:05', method: 'qr_code' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'lve_01',
    studentId: 'usr_student_1',
    studentName: 'Alex Chen',
    startDate: '2026-08-08',
    endDate: '2026-08-08',
    reason: 'Attending Inter-College Hackathon Finals',
    status: 'approved',
    appliedOn: '2026-08-06',
    approvedBy: 'Dr. Sarah Jenkins'
  },
  {
    id: 'lve_02',
    studentId: 'usr_student_1',
    studentName: 'Alex Chen',
    startDate: '2026-08-25',
    endDate: '2026-08-26',
    reason: 'Medical Checkup & Recovery',
    status: 'pending',
    appliedOn: '2026-08-20'
  }
];

export const mockExams: Exam[] = [
  {
    id: 'ex_mid_cs601',
    title: 'VVCE Mid-Term: Distributed Systems & Consensus Protocols',
    subjectId: 'sub_cs601',
    subjectName: 'Distributed Systems & Cloud Architecture',
    createdById: 'usr_faculty_1',
    createdByName: 'Dr. Sarah Jenkins',
    durationMinutes: 45,
    totalMarks: 50,
    passingMarks: 20,
    negativeMarking: true,
    negativeMarkValue: 0.25,
    startTime: '2026-08-21T00:00:00.000Z',
    endTime: '2026-08-28T23:59:59.000Z',
    status: 'active',
    allowedAttempts: 1,
    questions: [
      {
        id: 'q_ex_1',
        type: 'mcq',
        category: 'Distributed Systems',
        questionText: 'In the Raft consensus algorithm, which RPC is used by the leader to replicate log entries and maintain heartbeats?',
        options: [
          { id: 'opt_1', text: 'RequestVote()' },
          { id: 'opt_2', text: 'AppendEntries()', isCorrect: true },
          { id: 'opt_3', text: 'CommitLog()' },
          { id: 'opt_4', text: 'HeartbeatSync()' }
        ],
        maxMarks: 5,
        explanation: 'AppendEntries() RPC is issued by leaders to replicate log entries and also acts as periodic heartbeats.'
      },
      {
        id: 'q_ex_2',
        type: 'tf',
        category: 'CAP Theorem',
        questionText: 'According to the CAP Theorem, a distributed data store can simultaneously guarantee Consistency, Availability, and Partition Tolerance during a network partition.',
        options: [
          { id: 'opt_true', text: 'True' },
          { id: 'opt_false', text: 'False', isCorrect: true }
        ],
        maxMarks: 5,
        explanation: 'During a network partition, a system must choose between Consistency (CP) or Availability (AP).'
      },
      {
        id: 'q_ex_3',
        type: 'mcq',
        category: 'Cloud Storage',
        questionText: 'Which consistency model guarantees that if no new updates are made to a key, eventually all accesses will return the last updated value?',
        options: [
          { id: 'opt_a', text: 'Strong Consistency' },
          { id: 'opt_b', text: 'Eventual Consistency', isCorrect: true },
          { id: 'opt_c', text: 'Linearizability' },
          { id: 'opt_d', text: 'Causal Consistency' }
        ],
        maxMarks: 5,
        explanation: 'Eventual consistency guarantees convergence given sufficient time without updates.'
      },
      {
        id: 'q_ex_4',
        type: 'short',
        category: 'Distributed Locking',
        questionText: 'What distributed lock algorithm designed by Redis creators utilizes multiple independent Redis master nodes to ensure fault-tolerant locking?',
        correctAnswerText: 'Redlock',
        maxMarks: 10,
        explanation: 'Redlock is the multi-master distributed lock algorithm created by Salvatore Sanfilippo (antirez).'
      },
      {
        id: 'q_ex_5',
        type: 'descriptive',
        category: 'System Architecture',
        questionText: 'Explain the difference between Horizontal Scaling (Sharding) and Vertical Scaling (Replication). Detail how Vector Clocks resolve concurrent write conflicts in a distributed database.',
        maxMarks: 25,
        explanation: 'Descriptive response evaluated by faculty. Vector clocks maintain causal history vectors across nodes.'
      }
    ]
  },
  {
    id: 'ex_quiz_cs602',
    title: 'VVCE Mid-Semester Assessment: Deep Neural Networks & Transformers',
    subjectId: 'sub_cs602',
    subjectName: 'Artificial Intelligence & Neural Networks',
    createdById: 'usr_faculty_1',
    createdByName: 'Dr. Sarah Jenkins',
    durationMinutes: 30,
    totalMarks: 30,
    passingMarks: 15,
    negativeMarking: false,
    startTime: '2026-08-25T10:00:00.000Z',
    endTime: '2026-08-25T18:00:00.000Z',
    status: 'upcoming',
    allowedAttempts: 1,
    questions: []
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'qz_ds_master',
    title: 'Data Structures & Algorithmic Speed Run',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    timeLimitSeconds: 180,
    rewardPoints: 150,
    badgeReward: '⚡ VVCE DSA Champion',
    questions: [
      {
        id: 'q_qz_1',
        type: 'mcq',
        category: 'Data Structures',
        questionText: 'What is the average time complexity of searching an element in a Hash Table with a good hash function?',
        options: [
          { id: 'opt_1', text: 'O(1)', isCorrect: true },
          { id: 'opt_2', text: 'O(log N)' },
          { id: 'opt_3', text: 'O(N)' },
          { id: 'opt_4', text: 'O(N log N)' }
        ],
        maxMarks: 10,
        explanation: 'Hash tables achieve O(1) expected time for lookup with minimal collisions.'
      },
      {
        id: 'q_qz_2',
        type: 'mcq',
        category: 'Algorithms',
        questionText: 'Which sorting algorithm has a worst-case time complexity of O(N^2) but runs in O(N log N) on average and works in-place?',
        options: [
          { id: 'opt_1', text: 'Merge Sort' },
          { id: 'opt_2', text: 'Quick Sort', isCorrect: true },
          { id: 'opt_3', text: 'Heap Sort' },
          { id: 'opt_4', text: 'Bubble Sort' }
        ],
        maxMarks: 10,
        explanation: 'QuickSort has O(N^2) worst case when pivots are poorly chosen, but O(N log N) average.'
      },
      {
        id: 'q_qz_3',
        type: 'mcq',
        category: 'Trees',
        questionText: 'In a Binary Search Tree (BST), which tree traversal order yields elements in strictly sorted ascending order?',
        options: [
          { id: 'opt_1', text: 'Pre-order' },
          { id: 'opt_2', text: 'In-order', isCorrect: true },
          { id: 'opt_3', text: 'Post-order' },
          { id: 'opt_4', text: 'Level-order' }
        ],
        maxMarks: 10,
        explanation: 'In-order traversal visits left child, root node, then right child.'
      }
    ]
  },
  {
    id: 'qz_react_pro',
    title: 'Modern React 18 & State Architecture',
    category: 'Web Dev',
    difficulty: 'Advanced',
    timeLimitSeconds: 240,
    rewardPoints: 200,
    badgeReward: '⚛️ React Maestro',
    questions: [
      {
        id: 'q_qz_r1',
        type: 'mcq',
        category: 'Web Dev',
        questionText: 'Which hook should be used to perform imperative side-effects that need to run before browser repaint?',
        options: [
          { id: 'opt_1', text: 'useEffect' },
          { id: 'opt_2', text: 'useLayoutEffect', isCorrect: true },
          { id: 'opt_3', text: 'useMemo' },
          { id: 'opt_4', text: 'useImperativeHandle' }
        ],
        maxMarks: 10,
        explanation: 'useLayoutEffect fires synchronously after all DOM mutations but before browser paint.'
      }
    ]
  }
];

export const mockLeaderboard: QuizLeaderboardEntry[] = [
  { rank: 1, studentId: 'usr_student_2', studentName: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', score: 980, timeSpentSeconds: 112, badge: '👑 VVCE Top Ranker' },
  { rank: 2, studentId: 'usr_student_1', studentName: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', score: 940, timeSpentSeconds: 125, badge: '⚡ VVCE DSA Champion' },
  { rank: 3, studentId: 'usr_std_3', studentName: 'Marcus Wright', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', score: 890, timeSpentSeconds: 140, badge: '⚛️ React Maestro' },
  { rank: 4, studentId: 'usr_std_4', studentName: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', score: 850, timeSpentSeconds: 155, badge: '🧠 AI Prodigy' },
  { rank: 5, studentId: 'usr_std_5', studentName: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', score: 810, timeSpentSeconds: 162, badge: '🛡️ Cyber Sentinel' }
];

export const mockInterviewCategories: InterviewCategory[] = [
  {
    id: 'cat_tech',
    name: 'Technical Systems & Architecture',
    description: 'Master Data Structures, System Design, Cloud & OOP coding round questions with live AI feedback.',
    iconName: 'Code2',
    color: '#10B981',
    sampleQuestionsCount: 15
  },
  {
    id: 'cat_hr',
    name: 'HR & Behavioral STAR',
    description: 'Practice Situation, Task, Action, Result framework questions for Fortune 500 company interviews.',
    iconName: 'Users',
    color: '#FF6B6B',
    sampleQuestionsCount: 12
  },
  {
    id: 'cat_comm',
    name: 'Communication & Leadership',
    description: 'Evaluate speech pacing, confidence, vocabulary range, and executive presence.',
    iconName: 'Mic',
    color: '#F4C95D',
    sampleQuestionsCount: 10
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq_tech_1',
    categoryId: 'cat_tech',
    title: 'Designing a Scalable Rate Limiter',
    questionText: 'How would you design a distributed rate limiter for a public API gateway handling 100,000 requests per second? Explain algorithms like Leaky Bucket or Sliding Window Log and storage strategies using Redis.',
    hints: ['Mention Redis Token Bucket or Leaky Bucket algorithm', 'Discuss atomic Redis Lua scripts or sliding window counters', 'Explain edge gateway handling and multi-region deployment'],
    expectedKeywords: ['Token Bucket', 'Redis', 'Sliding Window', 'Concurrency', 'Latency', 'Lua Script'],
    sampleModelAnswer: 'I would implement a Token Bucket algorithm using Redis with Lua scripts to maintain atomicity across distributed servers...'
  },
  {
    id: 'iq_hr_1',
    categoryId: 'cat_hr',
    title: 'Overcoming Technical Conflict in a Team',
    questionText: 'Tell me about a time you had a strong disagreement with a teammate or senior engineer over a technical architecture decision. How did you handle it and what was the outcome?',
    hints: ['Structure your response using STAR: Situation, Task, Action, Result', 'Emphasize data-driven benchmark testing over subjective opinions', 'Show active listening and commitment to team success'],
    expectedKeywords: ['STAR method', 'Benchmark', 'Data-driven', 'Active Listening', 'Trade-offs', 'Alignment'],
    sampleModelAnswer: 'During our senior capstone project, our team disagreed between SQL vs MongoDB for caching. I proposed running a performance benchmark matrix...'
  },
  {
    id: 'iq_comm_1',
    categoryId: 'cat_comm',
    title: 'Explaining a Complex Concept to Non-Technical Stakeholders',
    questionText: 'Explain the concept of WebSockets versus traditional HTTP Polling to a non-technical project manager in under 2 minutes.',
    hints: ['Use simple everyday analogies like a phone call vs sending letters', 'Avoid dense jargon', 'Highlight user experience and cost impacts'],
    expectedKeywords: ['Analogy', 'Real-time', 'Bi-directional', 'Efficiency', 'User Experience'],
    sampleModelAnswer: 'HTTP polling is like walking to your mailbox every minute to check for mail. WebSockets is like establishing a continuous open telephone call...'
  }
];

export const mockInterviewAttempts: InterviewAttempt[] = [
  {
    id: 'att_int_01',
    studentId: 'usr_student_1',
    categoryId: 'cat_tech',
    questionId: 'iq_tech_1',
    questionTitle: 'Designing a Scalable Rate Limiter',
    userAnswerText: 'I would use a Sliding Window Token Bucket algorithm stored inside a Redis cluster. To prevent race conditions during high concurrent requests, I would execute atomic Lua scripts on Redis node counters. Additionally, rate limiting headers like X-RateLimit-Remaining would be returned to the API client.',
    userAudioSimulated: true,
    durationSeconds: 105,
    scores: {
      technicalAccuracy: 92,
      communication: 88,
      structure: 85,
      confidence: 90,
      overall: 89
    },
    matchedKeywords: ['Token Bucket', 'Redis', 'Sliding Window', 'Lua Script', 'Concurrency'],
    aiFeedback: 'Outstanding technical depth! You effectively covered atomic transactions with Lua scripts in Redis and highlighted HTTP header feedback for client retry strategies.',
    improvementTips: ['Consider mentioning sliding window memory trade-offs when dealing with millions of unique user keys.', 'Add details on graceful degradation during Redis cache outages.'],
    completedAt: '2026-08-20 14:30'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'anc_admin_001',
    title: 'Welcome to VVCE CampusONE — Academic Year 2026–27 Begins',
    content: 'The administration is pleased to announce the official commencement of the 2026–27 academic year at Vidya Vardhaka College of Engineering, Mysuru. All students and faculty are requested to complete their portal onboarding, verify attendance records, and review the updated semester timetable. For any registration or access issues, contact the Academic Administration office directly.',
    authorName: 'VVCE System Administrator',
    authorRole: 'Academic Administration (VVCE)',
    priority: 'high',
    createdAt: '2026-08-23 09:00'
  }
];

export const mockNotifications: NotificationItem[] = [
  { id: 'ntf_1', title: 'Attendance Alert', message: 'Cybersecurity (CS-604) attendance is currently 68% (Below required 75%). Please check Attendance Hall.', timestamp: '10 mins ago', read: false, type: 'attendance' },
  { id: 'ntf_2', title: 'Exam Ready', message: 'Mid-Term Exam for Distributed Systems is now active. Time limit: 45 minutes.', timestamp: '1 hour ago', read: false, type: 'exam' },
  { id: 'ntf_3', title: 'Interview Evaluation', message: 'Your mock interview score report for "Scalable Rate Limiter" is now ready with 89% score!', timestamp: 'Yesterday', read: true, type: 'interview' }
];

export const mockSpatialWidgets: SpatialWidget[] = [
  { id: 'widget_att', title: 'Attendance Status', zone: 'attendance', x: -3.5, y: 1.5, w: 3, h: 2, pinned: true, visible: true },
  { id: 'widget_exam', title: 'Next Active Exam', zone: 'exam', x: 0, y: 1.5, w: 3, h: 2, pinned: true, visible: true },
  { id: 'widget_quiz', title: 'Quiz Streak & Points', zone: 'quiz', x: 3.5, y: 1.5, w: 3, h: 2, pinned: true, visible: true },
  { id: 'widget_interview', title: 'Mock Interview Studio', zone: 'interview', x: -2, y: -1.2, w: 3.5, h: 2, pinned: true, visible: true },
  { id: 'widget_timetable', title: 'Today Schedule', zone: 'attendance', x: 2, y: -1.2, w: 3.5, h: 2, pinned: true, visible: true }
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log_1', user: 'Dr. Sarah Jenkins', action: 'Published Mid-Term Exam (CS-601)', targetEntity: 'Exam: ex_mid_cs601', timestamp: '2026-08-21 08:30:12', ipAddress: '192.168.1.45' },
  { id: 'log_2', user: 'Alex Chen', action: 'Submitted Mock Interview Practice', targetEntity: 'InterviewAttempt: att_int_01', timestamp: '2026-08-20 14:30:05', ipAddress: '192.168.1.102' },
  { id: 'log_3', user: 'VVCE System Administrator', action: 'Updated VVCE Attendance Threshold Rule to 75%', targetEntity: 'SystemSetting: AttendancePolicy', timestamp: '2026-08-18 10:15:40', ipAddress: '192.168.1.1' }
];

export const mockAttendanceAuditLogs: AttendanceAuditLog[] = [
  { id: 'att_audit_1', attendanceRecordId: 'att_103', modifiedBy: 'Dr. Sarah Jenkins', modifiedAt: '2026-08-08 16:00', oldStatus: 'absent', newStatus: 'on_leave', reason: 'Approved Inter-College Hackathon Leave Request' }
];

export const mockCodingProblems: CodingProblem[] = [
  {
    id: 'prob_001',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists.'],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    
  }
  return [];
}`,
    expectedOutputKeyword: 'hashmap',
    tags: ['Array', 'Hash Table'],
    timeLimitMs: 2000
  },
  {
    id: 'prob_002',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length of 3.' }
    ],
    constraints: ['0 ≤ s.length ≤ 5 × 10⁴', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: `function lengthOfLongestSubstring(s) {
  // Sliding window approach
  let left = 0, maxLen = 0;
  const seen = new Map();
  for (let right = 0; right < s.length; right++) {
    
  }
  return maxLen;
}`,
    expectedOutputKeyword: 'sliding window',
    tags: ['String', 'Sliding Window', 'Hash Table'],
    timeLimitMs: 2000
  },
  {
    id: 'prob_003',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    description: 'You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it. Consider using a min-heap (priority queue) approach for optimal time complexity.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'Merging all linked lists results in one sorted list.' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' }
    ],
    constraints: ['k == lists.length', '0 ≤ k ≤ 10⁴', '0 ≤ lists[i].length ≤ 500', '-10⁴ ≤ lists[i][j] ≤ 10⁴', 'lists[i] is sorted in ascending order.'],
    starterCode: `function mergeKLists(lists) {
  // Min-heap / divide and conquer approach
  if (!lists.length) return null;
  
  function mergeTwoLists(l1, l2) {
    // merge two sorted lists
  }
  
  // Divide and conquer
  while (lists.length > 1) {
    
  }
  return lists[0];
}`,
    expectedOutputKeyword: 'divide and conquer',
    tags: ['Linked List', 'Divide & Conquer', 'Heap'],
    timeLimitMs: 3000
  }
];

export const mockLiveInterviewSessions: LiveInterviewSession[] = [
  {
    id: 'live_int_001',
    studentId: 'usr_student_1',
    studentName: 'Alex Chen',
    studentRollNo: '4VV21CS042',
    studentDept: 'Computer Science & Engineering (VVCE)',
    mentorId: 'usr_faculty_1',
    mentorName: 'Dr. Sarah Jenkins',
    startedAt: '2026-08-23 10:00',
    submittedAt: '2026-08-23 10:42',
    problemId: 'prob_001',
    problemTitle: 'Two Sum',
    problemDifficulty: 'Easy',
    studentCode: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`,
    codeScore: 92,
    testCasesPassed: 4,
    totalTestCases: 5,
    faceSnapshots: 12,
    postureWarnings: 1,
    focusLostCount: 0,
    durationSeconds: 2520,
    overallScore: 88,
    proctorStatus: 'clean',
    aiFeedback: 'Excellent use of a hash map for O(n) time complexity. The solution correctly handles all edge cases including duplicate values and correctly returns indices. Code is clean and well-structured. Minor improvement: could add input validation for empty arrays.',
    codeComplexity: 'O(n)',
    status: 'submitted',
    mentorRemarks: ''
  }
];
