import React from 'react';
import { User as UserIcon, Settings, Sliders, Sun, Moon, Check, Laptop, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileSettings: React.FC = () => {
  const { currentUser, theme, setTheme, setActiveScreen } = useApp();

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
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
              <Settings className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile & Accessibility Settings</h1>
          </div>
          <p className="text-xs text-[#667085] dark:text-slate-300">Configure Light & Dark themes & User Persona preferences.</p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex items-center space-x-5 shadow-xl bg-white dark:bg-[#324148]">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#10B981]/50 shadow-md"
        />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{currentUser.name}</h2>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 font-semibold">
              {currentUser.role}
            </span>
          </div>
          <p className="text-xs text-[#667085] dark:text-slate-300">{currentUser.email}</p>
          <p className="text-xs font-mono text-[#10B981]">{currentUser.departmentName} • {currentUser.rollNumber || currentUser.employeeId}</p>
        </div>
      </div>

      {/* Theme Preference */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-xl bg-white dark:bg-[#324148]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider flex items-center space-x-2">
          <Moon className="w-4 h-4 text-[#10B981]" />
          <span>Active System Theme</span>
        </h3>

        <div className="p-5 rounded-2xl bg-[#1F2933] border border-[#10B981] ring-2 ring-[#10B981]/40 shadow-lg text-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-sm text-white">
              <Moon className="w-5 h-5 text-[#10B981]" />
              <span>Graphite Dark Mode (Active)</span>
            </div>
            <Check className="w-4 h-4 text-[#10B981] font-bold" />
          </div>
          <p className="text-xs text-slate-300">Sleek graphite background (#1F2933) with charcoal glass panels and emerald accents.</p>
        </div>
      </div>
    </div>
  );
};
