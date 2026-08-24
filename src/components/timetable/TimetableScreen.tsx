import React from 'react';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSchedule } from '../../data/mockData';

export const TimetableScreen: React.FC = () => {
  const { setActiveScreen } = useApp();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
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
              <Calendar className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Class Timetable Schedule</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Weekly lecture slots, lab locations & faculty schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map(day => {
          const dayItems = mockSchedule.filter(s => s.day === day);
          return (
            <div key={day} className="glass-panel rounded-3xl p-4 border border-slate-200 dark:border-white/10 space-y-3">
              <h2 className="text-sm font-bold text-teal-700 dark:text-teal-400 font-mono pb-2 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider text-center">
                {day}
              </h2>

              <div className="space-y-2">
                {dayItems.length > 0 ? (
                  dayItems.map(item => (
                    <div key={item.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                        <span>{item.startTime} - {item.endTime}</span>
                      </span>

                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{item.subjectName}</p>
                        <p className="text-[10px] text-teal-700 dark:text-teal-300 font-mono">{item.subjectCode}</p>
                      </div>

                      <div className="flex items-center space-x-1 text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/5">
                        <MapPin className="w-3 h-3 text-violet-600 dark:text-violet-400 shrink-0" />
                        <span>{item.room}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">No lectures</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
