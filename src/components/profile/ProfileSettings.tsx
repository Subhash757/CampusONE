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

      {/* Theme Preference Selector */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-xl bg-white dark:bg-[#324148]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider flex items-center space-x-2">
          <Sun className="w-4 h-4 text-[#F4C95D]" />
          <span>Appearance & Theme Mode</span>
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Light Theme Card */}
          <div
            onClick={() => setTheme('light')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
              theme === 'light'
                ? 'bg-[#FFFDF7] border-[#10B981] ring-2 ring-[#10B981]/30 shadow-md text-[#111827]'
                : 'bg-slate-50 dark:bg-[#1F2933] border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#10B981]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Sun className="w-5 h-5 text-[#F4C95D]" />
                <span>Warm Light Mode</span>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-[#10B981] font-bold" />}
            </div>
            <p className="text-xs opacity-80 text-[#667085]">Clean warm-white (#FFFDF7) backgrounds with soft black typography and emerald accents.</p>
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => setTheme('dark')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
              theme === 'dark'
                ? 'bg-[#1F2933] border-[#10B981] ring-2 ring-[#10B981]/40 shadow-lg text-white'
                : 'bg-slate-50 dark:bg-[#1F2933] border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#10B981]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-sm text-white">
                <Moon className="w-5 h-5 text-[#10B981]" />
                <span>Graphite Dark Mode</span>
              </div>
              {theme === 'dark' && <Check className="w-4 h-4 text-[#10B981] font-bold" />}
            </div>
            <p className="text-xs text-slate-300">Sleek graphite background (#1F2933) with charcoal cards and emerald/coral accents.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
