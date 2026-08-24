import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck2,
  BookOpenCheck,
  FileCheck2,
  Trophy,
  Mic,
  Briefcase,
  Building2,
  Users,
  Calendar,
  Megaphone,
  Settings,
  AlertCircle
} from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.FC<{ className?: string }>;
  rolesAllowed?: ('student' | 'faculty' | 'admin')[];
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeScreen, setActiveScreen, currentUser, getStudentAttendanceSummary } = useApp();

  const attendanceSummary = currentUser.role === 'student' ? getStudentAttendanceSummary(currentUser.id) : null;
  const hasAttendanceShortage = attendanceSummary ? attendanceSummary.subjectStats.some(s => s.isShortage) : false;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Digital Campus Hub', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance Hall', icon: CalendarCheck2, badge: hasAttendanceShortage ? 'Alert' : undefined, badgeColor: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30' },
    { id: 'mark_attendance', label: 'Mark Attendance', icon: BookOpenCheck, rolesAllowed: ['faculty', 'admin'] },
    { id: 'exams', label: 'Examination Center', icon: FileCheck2 },
    { id: 'quizzes', label: 'Quiz Arena', icon: Trophy, badge: 'Live', badgeColor: 'bg-[#F4C95D]/15 text-[#F4C95D] dark:text-[#F4C95D] border-[#F4C95D]/30' },
    { id: 'interviews', label: 'Interview Studio', icon: Mic, badge: 'AI', badgeColor: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30' },
    { id: 'faculty_lounge', label: 'Faculty Lounge', icon: Briefcase, rolesAllowed: ['faculty', 'admin'] },
    { id: 'admin_tower', label: 'Admin Tower', icon: Building2, rolesAllowed: ['admin'] },
    { id: 'user_management', label: 'User & System Data', icon: Users, rolesAllowed: ['admin'] },
    { id: 'timetable', label: 'Class Timetable', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'settings', label: 'System & Preferences', icon: Settings },
  ];

  const visibleItems = navItems.filter(item => {
    if (!item.rolesAllowed) return true;
    return item.rolesAllowed.includes(currentUser.role);
  });

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 dark:border-white/10 flex flex-col justify-between py-4 px-3 select-none shrink-0 hidden md:flex">
      <div className="space-y-6">
        <div className="px-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#667085] font-bold">
            Campus Zones & Modules
          </p>
        </div>

        <nav className="space-y-1">
          {visibleItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/20 border border-[#10B981]/40'
                    : 'text-[#667085] dark:text-[#A0AEC0] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#3D4C54] border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-[#667085] group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {currentUser.role === 'student' && attendanceSummary && (
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#324148] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
            <span>Overall Attendance</span>
            <span className={attendanceSummary.overallPercent < 75 ? 'text-[#FF6B6B] font-mono font-bold' : 'text-[#10B981] font-mono font-bold'}>
              {attendanceSummary.overallPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-[#1F2933] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                attendanceSummary.overallPercent < 75 ? 'bg-[#FF6B6B]' : 'bg-[#10B981]'
              }`}
              style={{ width: `${attendanceSummary.overallPercent}%` }}
            />
          </div>
          {hasAttendanceShortage && (
            <div className="flex items-center space-x-1.5 text-[10px] text-[#FF6B6B] font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Shortage Alert in 1+ subjects</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
