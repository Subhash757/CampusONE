export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  departmentId: string;
  departmentName: string;
  rollNumber?: string; // For students
  employeeId?: string; // For faculty/admin
  semester?: number;
  classGroup?: string;
  status?: 'active' | 'pending' | 'rejected';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  totalStudents: number;
  totalFaculty: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  facultyId: string;
  facultyName: string;
  credits: number;
  semester: number;
  requiredAttendancePercent: number; // e.g. 75
}

export interface ClassScheduleItem {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  facultyName: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // e.g., "09:00 AM"
  endTime: string;   // e.g., "10:00 AM"
  room: string;
  classGroup: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'on_leave';
  markedByFacultyId: string;
  markedAt: string;
  method: 'manual' | 'qr_code' | 'student_id';
}

export interface AttendanceAuditLog {
  id: string;
  attendanceRecordId: string;
  modifiedBy: string;
  modifiedAt: string;
  oldStatus: string;
  newStatus: string;
  reason: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  approvedBy?: string;
}

export type QuestionType = 'mcq' | 'tf' | 'short' | 'descriptive';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: string; // e.g., "Data Structures", "Web Dev", "Aptitude"
  questionText: string;
  codeSnippet?: string;
  options?: QuestionOption[];
  correctAnswerText?: string;
  maxMarks: number;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  createdById: string;
  createdByName: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  negativeMarking: boolean;
  negativeMarkValue?: number; // e.g. 0.25
  startTime: string; // ISO string
  endTime: string;
  questions: Question[];
  status: 'upcoming' | 'active' | 'completed';
  allowedAttempts: number;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  submittedAt?: string;
  answers: Record<string, string | string[]>; // questionId -> answer text or optionId
  totalScore?: number;
  obtainedScore?: number;
  status: 'in_progress' | 'submitted' | 'evaluated';
  descriptiveGrades?: Record<string, { marks: number; feedback: string }>;
}

export interface Quiz {
  id: string;
  title: string;
  category: string; // "Data Structures", "Algorithms", "React", "AI & ML", "HR Aptitude"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
  timeLimitSeconds: number;
  rewardPoints: number;
  badgeReward?: string;
}

export interface QuizLeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatar: string;
  score: number;
  timeSpentSeconds: number;
  badge: string;
}

export interface InterviewCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  sampleQuestionsCount: number;
}

export interface InterviewQuestion {
  id: string;
  categoryId: string;
  title: string;
  questionText: string;
  hints: string[];
  expectedKeywords: string[];
  sampleModelAnswer: string;
}

export interface InterviewAttempt {
  id: string;
  studentId: string;
  categoryId: string;
  questionId: string;
  questionTitle: string;
  userAnswerText: string;
  userAudioSimulated?: boolean;
  durationSeconds: number;
  scores: {
    technicalAccuracy: number; // 0-100
    communication: number;    // 0-100
    structure: number;        // 0-100
    confidence: number;       // 0-100
    overall: number;
  };
  matchedKeywords: string[];
  aiFeedback: string;
  improvementTips: string[];
  completedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  targetDepartment?: string;
  targetClass?: string;
  priority: 'high' | 'normal' | 'urgent';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'attendance' | 'exam' | 'quiz' | 'interview' | 'announcement';
}

export interface SpatialWidget {
  id: string;
  title: string;
  zone: 'attendance' | 'exam' | 'quiz' | 'interview' | 'faculty' | 'admin';
  x: number;
  y: number;
  w: number;
  h: number;
  pinned: boolean;
  visible: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  targetEntity: string;
  timestamp: string;
  ipAddress: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  expectedOutputKeyword: string;
  tags: string[];
  timeLimitMs: number;
  companyTags?: string[];
  acceptanceRate?: number;
}

export interface LiveInterviewSession {
  id: string;
  studentId: string;
  studentName: string;
  studentRollNo: string;
  studentDept: string;
  mentorId: string;
  mentorName: string;
  startedAt: string;
  submittedAt?: string;
  problemId: string;
  problemTitle: string;
  problemDifficulty: 'Easy' | 'Medium' | 'Hard';
  studentCode: string;
  codeScore: number;
  testCasesPassed: number;
  totalTestCases: number;
  faceSnapshots: number;
  postureWarnings: number;
  focusLostCount: number;
  durationSeconds: number;
  overallScore: number;
  proctorStatus: 'clean' | 'warnings' | 'flagged';
  aiFeedback: string;
  codeComplexity: string;
  status: 'in_progress' | 'submitted' | 'reviewed';
  mentorRemarks?: string;
  mentorReviewedAt?: string;
  capturedPhotos?: string[];
  facultyFeedbackPhoto?: string;
}
