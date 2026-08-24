import React, { useState } from 'react';
import {
  Bell,
  Search,
  CheckCircle,
  Shield,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  LogIn,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchRole,
    activeScreen,
    setActiveScreen,
    notifications,
    markNotificationRead,
    isAuthenticated,
    setShowAuthModal,
    logout,
    theme,
    toggleTheme
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleConfigs: Record<UserRole, { label: string; icon: React.FC<{ className?: string }>; color: string }> = {
    student: { label: 'Student Portal', icon: GraduationCap, color: 'from-teal-600 to-cyan-600' },
    faculty: { label: 'Faculty Lounge', icon: Briefcase, color: 'from-violet-600 to-purple-600' },
    admin: { label: 'Administrator Tower', icon: Shield, color: 'from-amber-600 to-rose-600' }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-white/10 px-4 lg:px-6 py-2.5 flex items-center justify-between backdrop-blur-xl">
      {/* Brand Logo & VVCE Institution Title */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveScreen('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200 dark:border-white/10 shadow-xs flex items-center justify-center shrink-0">
          <img src="/vvce-logo.png" alt="VVCE Official Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              VVCE <span className="bg-gradient-to-r from-[#10B981] to-[#FF6B6B] bg-clip-text text-transparent">CampusONE</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 font-bold">
              Official Portal
            </span>
          </div>
          <p className="text-[11px] text-[#667085] font-medium hidden sm:block">
            Vidyavardhaka College of Engineering, Mysuru
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
          <input
            type="text"
            placeholder="Search VVCE subjects, exams, attendance, mock interviews..."
            className="w-full bg-[#FFFDF7] dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-[#667085] focus:outline-none focus:border-[#10B981] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Back to Hub Navigation Button */}
        {activeScreen !== 'dashboard' && activeScreen !== 'landing' && (
          <button
            onClick={() => setActiveScreen('dashboard')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#324148] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-[#10B981]/30 text-xs font-semibold transition-all shadow-sm active:scale-[0.98]"
            title="Return to Digital Campus Hub"
          >
            <ArrowLeft className="w-4 h-4 text-[#10B981]" />
            <span className="hidden sm:inline">Back to Hub</span>
          </button>
        )}



        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-xl z-50 border border-slate-200 dark:border-white/15 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">VVCE Notifications</h3>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">{unreadCount} Unread</span>
              </div>
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      n.read
                        ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 opacity-60'
                        : 'bg-white dark:bg-slate-800/80 border-teal-300 dark:border-teal-500/30 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-teal-700 dark:text-teal-300">{n.title}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile or Login Button */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 hover:border-teal-500 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-teal-500/50"
              />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-teal-600 dark:text-teal-400 font-mono capitalize">{currentUser.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl p-3 shadow-xl z-50 border border-slate-200 dark:border-white/15 animate-in fade-in bg-white dark:bg-[#324148]">
                <div className="px-3 py-2 border-b border-slate-200 dark:border-white/10 mb-2">
                  <p className="text-[10px] uppercase font-mono text-[#10B981] font-bold">VVCE Authenticated User</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-[#667085] dark:text-slate-300 truncate">{currentUser.email}</p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveScreen('profile');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#3D4C54] font-medium transition-all"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
                    <span>Profile & Preferences</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-[#FF6B6B] hover:bg-[#FF6B6B]/15 font-semibold transition-all"
                  >
                    <LogOut className="w-4 h-4 text-[#FF6B6B]" />
                    <span>Sign Out of VVCE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#FF6B6B] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#10B981]/25 active:scale-[0.98] transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>VVCE Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
