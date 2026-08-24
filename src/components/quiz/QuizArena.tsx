import React from 'react';
import {
  Trophy,
  Zap,
  Award,
  Play,
  Flame,
  Star,
  Users,
  Timer,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockLeaderboard } from '../../data/mockData';

export const QuizArena: React.FC = () => {
  const { quizzes, setActiveQuizId, setActiveScreen, userPoints, userBadges } = useApp();

  const handleStartQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setActiveScreen('take_quiz');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 transition-all flex items-center space-x-1"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-[#F4C95D]" />
            </button>
            <span className="p-2 rounded-xl bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30">
              <Trophy className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quiz Arena & Leaderboards</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Gamified rapid skill challenges, points, achievement badges & campus rankings.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
            <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 font-bold font-mono text-sm">
              <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>5 Day Streak</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10" />
            <div className="flex items-center space-x-1 text-violet-700 dark:text-violet-400 font-bold font-mono text-sm">
              <Zap className="w-4 h-4" />
              <span>{userPoints} PTS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Quizzes List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Available Rapid Quizzes</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30 font-semibold">
                {quizzes.length} Quizzes Live
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="glass-panel-interactive rounded-3xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-teal-500/20">
                      {quiz.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Timer className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                      <span>{quiz.timeLimitSeconds}s</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{quiz.questions.length} Objective Questions • Difficulty: {quiz.difficulty}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400">Reward:</span>
                    <span className="font-bold text-slate-900 dark:text-amber-300 font-mono text-[11px]">
                      +{quiz.rewardPoints} PTS • {quiz.badgeReward}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Enter Quiz Challenge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* User Badges Collection */}
          <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Earned Achievement Badges</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {userBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-xs font-bold font-mono shadow-xs flex items-center space-x-1.5"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Campus Leaderboard */}
        <div className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Campus Leaderboard</span>
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">This Week</span>
          </div>

          <div className="space-y-2">
            {mockLeaderboard.map(entry => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-all ${
                  entry.rank === 1
                    ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    entry.rank === 1 ? 'bg-amber-500 text-white' :
                    entry.rank === 2 ? 'bg-slate-400 text-white' :
                    entry.rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {entry.rank}
                  </span>
                  <img src={entry.avatar} alt={entry.studentName} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-200">{entry.studentName}</p>
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">{entry.badge}</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-black text-violet-700 dark:text-violet-400 text-sm">{entry.score}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 block">{entry.timeSpentSeconds}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
