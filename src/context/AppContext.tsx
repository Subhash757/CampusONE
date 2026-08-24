import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  AttendanceRecord,
  LeaveRequest,
  Exam,
  ExamAttempt,
  Quiz,
  InterviewAttempt,
  Announcement,
  NotificationItem,
  SpatialWidget,
  AuditLog,
  LiveInterviewSession
} from '../types';
import {
  mockUsers,
  mockPendingUsers,
  mockSubjects,
  mockAttendanceRecords,
  mockLeaveRequests,
  mockExams,
  mockQuizzes,
  mockInterviewAttempts,
  mockAnnouncements,
  mockNotifications,
  mockSpatialWidgets,
  mockAuditLogs,
  mockLiveInterviewSessions
} from '../data/mockData';

export type ScreenId =
  | 'landing'
  | 'dashboard'
  | 'attendance'
  | 'mark_attendance'
  | 'exams'
  | 'take_exam'
  | 'create_exam'
  | 'quizzes'
  | 'take_quiz'
  | 'interviews'
  | 'interview_practice'
  | 'interview_report'
  | 'live_interview'
  | 'live_interview_review'
  | 'problem_bank'
  | 'take_live_camera_exam'
  | 'faculty_lounge'
  | 'descriptive_eval'
  | 'admin_tower'
  | 'user_management'
  | 'timetable'
  | 'announcements'
  | 'profile'
  | 'settings';

export type ThemeMode = 'dark' | 'light';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  pendingUsers: User[];
  registerUser: (user: User) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (val: boolean) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  
  // Theme & View Mode
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  
  // Data lists & mutations
  attendanceRecords: AttendanceRecord[];
  markAttendance: (records: Partial<AttendanceRecord>[]) => void;
  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => void;
  approveLeaveRequest: (id: string, approvedBy: string) => void;
  
  exams: Exam[];
  addExam: (exam: Exam) => void;
  activeExamId: string | null;
  setActiveExamId: (id: string | null) => void;
  examAttempts: ExamAttempt[];
  submitExamAttempt: (attempt: ExamAttempt) => void;
  
  quizzes: Quiz[];
  activeQuizId: string | null;
  setActiveQuizId: (id: string | null) => void;
  userPoints: number;
  userBadges: string[];
  
  interviewAttempts: InterviewAttempt[];
  addInterviewAttempt: (attempt: InterviewAttempt) => void;
  activeInterviewAttemptId: string | null;
  setActiveInterviewAttemptId: (id: string | null) => void;
  
  announcements: Announcement[];
  addAnnouncement: (anc: Omit<Announcement, 'id' | 'createdAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  updateAnnouncement: (id: string, updates: Partial<Omit<Announcement, 'id' | 'createdAt'>>) => void;
  
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  
  spatialWidgets: SpatialWidget[];
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  
  auditLogs: AuditLog[];
  addAuditLog: (action: string, targetEntity: string) => void;

  liveInterviewSessions: LiveInterviewSession[];
  submitLiveSession: (session: LiveInterviewSession) => void;
  updateSessionRemarks: (id: string, remarks: string) => void;
  sendMentorFeedbackPhoto: (id: string, photoUrl: string, remark: string) => void;
  activeLiveSessionId: string | null;
  setActiveLiveSessionId: (id: string | null) => void;

  getStudentAttendanceSummary: (studentId: string) => {
    totalClasses: number;
    attendedClasses: number;
    overallPercent: number;
    subjectStats: {
      subjectId: string;
      subjectName: string;
      subjectCode: string;
      total: number;
      attended: number;
      percent: number;
      isShortage: boolean;
    }[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('vvce_user');
    return saved ? JSON.parse(saved) : mockUsers[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('vvce_auth'));
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vvce_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('landing');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pendingUsers, setPendingUsers] = useState<User[]>(mockPendingUsers);

  const registerUser = (newUser: User) => {
    const userWithStatus: User = { ...newUser, status: 'pending' };
    setPendingUsers(prev => [userWithStatus, ...prev]);
    addAuditLog(`User Registered (Pending Admin Approval)`, `Email: ${newUser.email}`);
  };

  const approveUser = (userId: string) => {
    const userToApprove = pendingUsers.find(u => u.id === userId);
    if (userToApprove) {
      const approved: User = { ...userToApprove, status: 'active' };
      setUsers(prev => [...prev, approved]);
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      addAuditLog(`Approved User Registration`, `Email: ${approved.email}`);
    }
  };

  const rejectUser = (userId: string) => {
    const target = pendingUsers.find(u => u.id === userId);
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    if (target) {
      addAuditLog(`Rejected User Registration`, `Email: ${target.email}`);
    }
  };

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [quizzes] = useState<Quiz[]>(mockQuizzes);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number>(420);
  const [userBadges] = useState<string[]>(['⚡ VVCE DSA Champion', '🎓 VVCE Scholar']);
  const [interviewAttempts, setInterviewAttempts] = useState<InterviewAttempt[]>(mockInterviewAttempts);
  const [activeInterviewAttemptId, setActiveInterviewAttemptId] = useState<string | null>(mockInterviewAttempts[0].id);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [spatialWidgets, setSpatialWidgets] = useState<SpatialWidget[]>(mockSpatialWidgets);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [liveInterviewSessions, setLiveInterviewSessions] = useState<LiveInterviewSession[]>(mockLiveInterviewSessions);
  const [activeLiveSessionId, setActiveLiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('vvce_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('vvce_auth', 'true');
    } else {
      localStorage.removeItem('vvce_auth');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('vvce_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const setTheme = (t: ThemeMode) => setThemeState(t);
  const toggleTheme = () => setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));

  const switchRole = (role: UserRole) => {
    const targetUser = mockUsers.find(u => u.role === role) || mockUsers[0];
    setCurrentUser(targetUser);
    setIsAuthenticated(true);
    if (activeScreen === 'landing') {
      setActiveScreen('dashboard');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveScreen('landing');
    setShowAuthModal(true);
  };

  const markAttendance = (newRecords: Partial<AttendanceRecord>[]) => {
    const createdRecords: AttendanceRecord[] = newRecords.map((r, i) => ({
      id: `att_new_${Date.now()}_${i}`,
      studentId: r.studentId || 'usr_student_1',
      studentName: r.studentName || 'Student',
      subjectId: r.subjectId || 'sub_cs601',
      subjectName: r.subjectName || 'Distributed Systems',
      date: r.date || new Date().toISOString().split('T')[0],
      status: r.status || 'present',
      markedByFacultyId: currentUser.id,
      markedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      method: r.method || 'manual'
    }));

    setAttendanceRecords(prev => [...createdRecords, ...prev]);
    addAuditLog(`Marked class attendance (${createdRecords.length} records)`, `Subject: ${newRecords[0]?.subjectName}`);
  };

  const submitLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...req,
      id: `lve_${Date.now()}`,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
    addAuditLog('Submitted Leave Request', `Reason: ${req.reason}`);
  };

  const approveLeaveRequest = (id: string, approvedBy: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'approved', approvedBy } : l));
    addAuditLog('Approved Leave Request', `LeaveID: ${id}`);
  };

  const addExam = (exam: Exam) => {
    setExams(prev => [exam, ...prev]);
    addAuditLog(`Created New Exam: ${exam.title}`, `Subject: ${exam.subjectName}`);
  };

  const submitExamAttempt = (attempt: ExamAttempt) => {
    setExamAttempts(prev => [attempt, ...prev]);
    addAuditLog(`Submitted Exam Attempt`, `ExamID: ${attempt.examId}`);
  };

  const addInterviewAttempt = (attempt: InterviewAttempt) => {
    setInterviewAttempts(prev => [attempt, ...prev]);
    setActiveInterviewAttemptId(attempt.id);
    setUserPoints(pts => pts + Math.round(attempt.scores.overall * 1.5));
    addAuditLog(`Completed Mock Interview Practice`, `Score: ${attempt.scores.overall}%`);
  };

  const addAnnouncement = (anc: Omit<Announcement, 'id' | 'createdAt'>) => {
    if (currentUser.role !== 'admin') return;
    const newAnc: Announcement = {
      ...anc,
      id: `anc_${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    addAuditLog(`Published Announcement: ${anc.title}`, `Author: ${anc.authorName}`);
  };

  const deleteAnnouncement = (id: string) => {
    if (currentUser.role !== 'admin') return;
    const target = announcements.find(a => a.id === id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    if (target) addAuditLog(`Deleted Announcement: ${target.title}`, `AnnouncementID: ${id}`);
  };

  const updateAnnouncement = (id: string, updates: Partial<Omit<Announcement, 'id' | 'createdAt'>>) => {
    if (currentUser.role !== 'admin') return;
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    addAuditLog(`Updated Announcement ID: ${id}`, `Title: ${updates.title || 'unchanged'}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const updateWidgetPosition = (id: string, x: number, y: number) => {
    setSpatialWidgets(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const addAuditLog = (action: string, targetEntity: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      user: currentUser.name,
      action,
      targetEntity,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '127.0.0.1 (VVCE Local Session)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const submitLiveSession = (session: LiveInterviewSession) => {
    setLiveInterviewSessions(prev => [session, ...prev.filter(s => s.id !== session.id)]);
    addAuditLog(`Submitted Live Proctored Interview: ${session.problemTitle}`, `Student: ${session.studentName} | Score: ${session.overallScore}%`);
  };

  const updateSessionRemarks = (id: string, remarks: string) => {
    setLiveInterviewSessions(prev => prev.map(s =>
      s.id === id
        ? { ...s, mentorRemarks: remarks, mentorReviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16), status: 'reviewed' as const }
        : s
    ));
    addAuditLog(`Faculty Reviewed Live Interview Session`, `SessionID: ${id}`);
  };

  const sendMentorFeedbackPhoto = (id: string, photoUrl: string, remark: string) => {
    setLiveInterviewSessions(prev => prev.map(s =>
      s.id === id
        ? {
            ...s,
            facultyFeedbackPhoto: photoUrl,
            mentorRemarks: remark ? `${s.mentorRemarks || ''} [Faculty Photo Note: ${remark}]` : s.mentorRemarks,
            status: 'reviewed' as const
          }
        : s
    ));
    addAuditLog(`Faculty Sent Photo Feedback to Mentee`, `SessionID: ${id}`);
  };

  const getStudentAttendanceSummary = (studentId: string) => {

    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    
    const subjectStats = mockSubjects.map(subj => {
      const records = studentRecords.filter(r => r.subjectId === subj.id);
      const total = Math.max(records.length, 16);
      const attended = records.filter(r => r.status === 'present' || r.status === 'on_leave').length + (subj.id === 'sub_cs604' ? 11 - records.length : 15 - records.length);
      const percent = Math.round((attended / total) * 100);
      const isShortage = percent < subj.requiredAttendancePercent;

      return {
        subjectId: subj.id,
        subjectName: subj.name,
        subjectCode: subj.code,
        total,
        attended,
        percent,
        isShortage
      };
    });

    const totalClasses = subjectStats.reduce((acc, curr) => acc + curr.total, 0);
    const attendedClasses = subjectStats.reduce((acc, curr) => acc + curr.attended, 0);
    const overallPercent = Math.round((attendedClasses / totalClasses) * 100);

    return {
      totalClasses,
      attendedClasses,
      overallPercent,
      subjectStats
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        pendingUsers,
        registerUser,
        approveUser,
        rejectUser,
        isAuthenticated,
        setIsAuthenticated,
        showAuthModal,
        setShowAuthModal,
        switchRole,
        logout,
        theme,
        setTheme,
        toggleTheme,
        activeScreen,
        setActiveScreen,
        selectedZone,
        setSelectedZone,
        attendanceRecords,
        markAttendance,
        leaveRequests,
        submitLeaveRequest,
        approveLeaveRequest,
        exams,
        addExam,
        activeExamId,
        setActiveExamId,
        examAttempts,
        submitExamAttempt,
        quizzes,
        activeQuizId,
        setActiveQuizId,
        userPoints,
        userBadges,
        interviewAttempts,
        addInterviewAttempt,
        activeInterviewAttemptId,
        setActiveInterviewAttemptId,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        updateAnnouncement,
        notifications,
        markNotificationRead,
        spatialWidgets,
        updateWidgetPosition,
        auditLogs,
        addAuditLog,
        liveInterviewSessions,
        submitLiveSession,
        updateSessionRemarks,
        sendMentorFeedbackPhoto,
        activeLiveSessionId,
        setActiveLiveSessionId,
        getStudentAttendanceSummary
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
