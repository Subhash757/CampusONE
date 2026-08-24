import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Shield,
  ArrowRight,
  CalendarCheck,
  FileCheck2,
  Trophy,
  Mic,
  Building2,
  Lock,
  LogIn,
  Compass,
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { VVCECollegeNavbar } from './VVCECollegeNavbar';
import { SubhashDeveloperCard } from '../common/SubhashDeveloperCard';

export const LandingPage: React.FC = () => {
  const { setShowAuthModal, setActiveScreen } = useApp();

  const handleLaunchRole = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] dark:bg-[#1F2933] text-slate-900 dark:text-white selection:bg-[#10B981] selection:text-white relative overflow-hidden transition-colors duration-250">
      {/* VVCE Official College Navbar & Code Banner */}
      <VVCECollegeNavbar />

      {/* Background Spatial Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF6B6B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Showcase */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-16 text-center space-y-8 z-10 relative">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#10B981] dark:text-[#F4C95D]" />
          <span>Official Digital Campus Portal for Vidya Vardhaka College of Engineering</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto font-heading">
          Unified Digital Campus for <span className="bg-gradient-to-r from-[#10B981] to-[#FF6B6B] bg-clip-text text-transparent">VVCE Students, Faculty & Admins</span>
        </h1>

        {/* VVCE Email Requirement Card */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-white dark:bg-[#324148] border border-slate-200 dark:border-white/10 text-xs text-left space-y-2 shadow-lg">
          <div className="flex items-center space-x-2 font-bold text-[#10B981] dark:text-[#F4C95D] font-mono">
            <Lock className="w-4 h-4 text-[#10B981] dark:text-[#F4C95D]" />
            <span>VVCE Institutional Login Rule:</span>
          </div>
          <p className="text-[11px] text-[#667085] dark:text-slate-300 leading-relaxed">
            All valid student and faculty logins MUST start with <strong className="text-slate-900 dark:text-white font-mono">vvce</strong> and belong to the domain <strong className="text-[#10B981] dark:text-[#F4C95D] font-mono">@vvce.ac.in</strong> (e.g. <code className="text-[#10B981] dark:text-[#F4C95D] font-mono bg-slate-100 dark:bg-[#1F2933] px-1 py-0.5 rounded">vvce.alex.chen@vvce.ac.in</code>).
          </p>
        </div>

        {/* Role Portal Selector */}
        <div className="pt-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Student Role Card */}
          <div
            onClick={handleLaunchRole}
            className="glass-panel-interactive rounded-3xl p-6 border border-slate-200 dark:border-white/10 text-left space-y-4 cursor-pointer group hover:border-[#10B981] shadow-md bg-white dark:bg-[#324148]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">VVCE Student Portal</h3>
              <p className="text-xs text-[#667085] dark:text-slate-300 mt-1">Track attendance (min 75%), take mid-terms, practice mock interviews & earn quiz badges.</p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#10B981] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Sign In / Register to Access</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Faculty Role Card */}
          <div
            onClick={handleLaunchRole}
            className="glass-panel-interactive rounded-3xl p-6 border border-slate-200 dark:border-white/10 text-left space-y-4 cursor-pointer group hover:border-[#FF6B6B] shadow-md bg-white dark:bg-[#324148]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B6B] transition-colors">VVCE Faculty Lounge</h3>
              <p className="text-xs text-[#667085] dark:text-slate-300 mt-1">Mark roster attendance with QR simulation, grade essay exams & publish class notices.</p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#FF6B6B] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Sign In / Register to Access</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Admin Role Card */}
          <div
            onClick={handleLaunchRole}
            className="glass-panel-interactive rounded-3xl p-6 border border-slate-200 dark:border-white/10 text-left space-y-4 cursor-pointer group hover:border-[#F4C95D] shadow-md bg-white dark:bg-[#324148]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#F4C95D] transition-colors">VVCE Admin Tower</h3>
              <p className="text-xs text-[#667085] dark:text-slate-300 mt-1">Manage institutional departments, policies, user roles & security audit logs.</p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-[#F4C95D] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Sign In / Register to Access</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10 border-t border-slate-200 dark:border-white/10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vidyavardhaka College of Engineering Academic Modules</h2>
          <p className="text-xs text-[#667085] dark:text-slate-300">Seamless digital campus navigation paired with responsive accessibility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <CalendarCheck className="w-8 h-8 text-[#10B981]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Attendance Hall</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">75% shortage alert threshold, leave approvals, QR scanner simulator & audit trail.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <FileCheck2 className="w-8 h-8 text-[#FF6B6B]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Examination Center</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">Proctored online exams with countdown timers, autosave protection & objective auto-grading.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <Trophy className="w-8 h-8 text-[#F4C95D]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Quiz Arena</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">Topic-based rapid challenges, streaks, global campus leaderboard & achievement badges.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <Mic className="w-8 h-8 text-[#10B981]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Interview Studio</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">AI voice practice simulator, speech recognition, spider radar charts & keyword analysis.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <Briefcase className="w-8 h-8 text-[#FF6B6B]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Faculty Lounge</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">Subject roster management, essay grading rubrics & instant notice broadcasting.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
            <Building2 className="w-8 h-8 text-[#F4C95D]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Administration Tower</h3>
            <p className="text-xs text-[#667085] dark:text-slate-300">Institution-wide metrics, user permissions matrix & downloadable CSV audit logs.</p>
          </div>
        </div>
      </section>

      {/* About VVCE Campus Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center shrink-0">
                <img src="/vvce-logo.png" alt="VVCE Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30">
                  Vidyavardhaka Sangha ®, Mysuru
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  About Vidyavardhaka College of Engineering (VVCE)
                </h2>
                <p className="text-xs text-[#667085] dark:text-slate-300">
                  Autonomous Institute Affiliated to VTU, Belagavi | Accredited NAAC 'A' Grade & NBA
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://vvce.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#FF6B6B] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#10B981]/25 transition-all flex items-center space-x-1.5"
              >
                <Globe className="w-4 h-4" />
                <span>vvce.ac.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                <Award className="w-4 h-4 text-[#10B981]" />
                <span>Autonomous & Accredited</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Autonomous status granted by VTU Belagavi from 2020. NAAC Grade 'A' and NBA accredited programs for CSE, ISE, ECE, EEE, and Mechanical Engineering.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                <GraduationCap className="w-4 h-4 text-[#F4C95D]" />
                <span>State-of-the-Art Mysuru Campus</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                23+ acre elevated campus in Gokulam, Mysuru equipped with advanced research centers, incubation ecosystem, digital library & active sports facilities.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-[#FF6B6B]" />
                <span>Institutional Codes</span>
              </div>
              <p className="text-[11px] font-mono leading-relaxed">
                CET: <strong>E071</strong> | COMED-K: <strong>E147</strong> | PGCET MBA: <strong>B315</strong> | PGCET MTech: <strong>T886</strong> | PGCET MCA: <strong>C613</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer & Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <SubhashDeveloperCard />
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 dark:border-white/10 text-center space-y-2 relative z-10">
        <p className="text-xs text-[#667085] dark:text-slate-400 font-medium">
          VVCE CampusONE &copy; {new Date().getFullYear()} Vidyavardhaka College of Engineering, Mysuru.
        </p>
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
          All Rights Reserved by <span className="bg-gradient-to-r from-[#10B981] via-[#F4C95D] to-[#FF6B6B] bg-clip-text text-transparent font-extrabold tracking-wide">Subhash K M</span>
        </p>
      </footer>
    </div>
  );
};
