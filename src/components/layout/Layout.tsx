import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { SpatialPhysicsDashboard } from '../spatial/SpatialPhysicsDashboard';
import { AuthModal } from '../auth/AuthModal';

// Screen Imports
import { LandingPage } from '../landing/LandingPage';
import { AttendanceHall } from '../attendance/AttendanceHall';
import { MarkAttendanceScreen } from '../attendance/MarkAttendanceScreen';
import { ExamCenter } from '../exams/ExamCenter';
import { ExamTakingScreen } from '../exams/ExamTakingScreen';
import { ExamCreatorScreen } from '../exams/ExamCreatorScreen';
import { QuizArena } from '../quiz/QuizArena';
import { QuizTakingScreen } from '../quiz/QuizTakingScreen';
import { InterviewStudio } from '../interview/InterviewStudio';
import { MockInterviewPractice } from '../interview/MockInterviewPractice';
import { InterviewFeedbackReport } from '../interview/InterviewFeedbackReport';
import { LiveInterviewSessionScreen } from '../interview/LiveInterviewSession';
import { LiveInterviewReview } from '../interview/LiveInterviewReview';
import { ProblemBankExplorer } from '../interview/ProblemBankExplorer';
import { LiveCameraExam } from '../exams/LiveCameraExam';
import { FacultyLounge } from '../faculty/FacultyLounge';
import { DescriptiveEvaluation } from '../faculty/DescriptiveEvaluation';
import { AdminTower } from '../admin/AdminTower';
import { UserManagement } from '../admin/UserManagement';
import { TimetableScreen } from '../timetable/TimetableScreen';
import { AnnouncementsScreen } from '../notifications/AnnouncementsScreen';
import { ProfileSettings } from '../profile/ProfileSettings';

export const Layout: React.FC = () => {
  const { activeScreen, showAuthModal, setShowAuthModal } = useApp();

  if (activeScreen === 'landing') {
    return (
      <>
        <LandingPage />
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </>
    );
  }

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <SpatialPhysicsDashboard />;

      case 'attendance':
        return <AttendanceHall />;
      case 'mark_attendance':
        return <MarkAttendanceScreen />;
      case 'exams':
        return <ExamCenter />;
      case 'take_exam':
        return <ExamTakingScreen />;
      case 'create_exam':
        return <ExamCreatorScreen />;
      case 'quizzes':
      case 'take_quiz':
        return activeScreen === 'take_quiz' ? <QuizTakingScreen /> : <QuizArena />;
      case 'interviews':
        return <InterviewStudio />;
      case 'interview_practice':
        return <MockInterviewPractice />;
      case 'interview_report':
        return <InterviewFeedbackReport />;
      case 'live_interview':
        return <LiveInterviewSessionScreen />;
      case 'live_interview_review':
        return <LiveInterviewReview />;
      case 'problem_bank':
        return <ProblemBankExplorer />;
      case 'take_live_camera_exam':
        return <LiveCameraExam />;
      case 'faculty_lounge':
        return <FacultyLounge />;
      case 'descriptive_eval':
        return <DescriptiveEvaluation />;
      case 'admin_tower':
        return <AdminTower />;
      case 'user_management':
        return <UserManagement />;
      case 'timetable':
        return <TimetableScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'profile':
      case 'settings':
        return <ProfileSettings />;
      default:
        return <SpatialPhysicsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] dark:bg-[#1F2933] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#10B981] selection:text-white transition-colors duration-250">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-y-auto bg-[#FFFDF7] dark:bg-[#1F2933]">
          {renderActiveScreen()}
        </main>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};
