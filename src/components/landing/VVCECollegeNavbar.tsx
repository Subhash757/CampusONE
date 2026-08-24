import React, { useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
  Users,
  Compass,
  FileText,
  Briefcase,
  Phone,
  Mail,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DropdownGroup {
  label: string;
  items: { label: string; url: string; isInternal?: boolean }[];
}

export const VVCECollegeNavbar: React.FC = () => {
  const { setActiveScreen, setShowAuthModal } = useApp();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const codes = [
    { label: 'CET Code', value: 'E071' },
    { label: 'COMED-K Code', value: 'E147' },
    { label: 'PGCET Code (MBA)', value: 'B315' },
    { label: 'PGCET Code (MTech)', value: 'T886' },
    { label: 'PGCET Code (MCA)', value: 'C613' },
    { label: 'Working Professional Code', value: 'E722' },
  ];

  const aboutItems = [
    { label: 'College & Management', url: 'https://vvce.ac.in/about/' },
    { label: 'Principal', url: 'https://vvce.ac.in/principal/' },
    { label: 'College Council', url: 'https://vvce.ac.in/college-council/' },
    { label: 'Statutory Committees', url: 'https://vvce.ac.in/statutory-committees/' },
    { label: 'Service Rules', url: 'https://vvce.ac.in/service-rules/' },
    { label: 'Organizational Structure', url: 'https://vvce.ac.in/wp-content/uploads/2026/05/IMG-20260520-WA0019.jpg' },
  ];

  const departmentItems = [
    { label: 'Computer Science & Eng (CSE)', url: 'https://vvce.ac.in/departments/department-of-computer-science-engineering/' },
    { label: 'CSE (AI & ML)', url: 'https://vvce.ac.in/departments/department-of-computer-science-engineering-ai-ml/' },
    { label: 'Information Science & Eng (ISE)', url: 'https://vvce.ac.in/departments/department-of-information-science-engineering/' },
    { label: 'Electronics & Comm Eng (ECE)', url: 'https://vvce.ac.in/departments/department-of-electronics-communication-engineering/' },
    { label: 'Electrical & Electronics Eng (EEE)', url: 'https://vvce.ac.in/departments/department-of-electrical-electronics-engineering/' },
    { label: 'Mechanical Eng (ME)', url: 'https://vvce.ac.in/departments/department-of-mechanical-engineering/' },
    { label: 'Civil Engineering (CV)', url: 'https://vvce.ac.in/departments/department-of-civil-engineering/' },
    { label: 'Department of Business Admin (MBA)', url: 'https://vvce.ac.in/departments/department-of-business-administration/' },
    { label: 'Department of Computer Apps (MCA)', url: 'https://vvce.ac.in/departments/department-of-computer-applications/' },
    { label: 'Department of Humanities', url: 'https://vvce.ac.in/departments/department-of-humanities/' },
    { label: 'Department of Physics', url: 'https://vvce.ac.in/departments/department-of-physics/' },
    { label: 'Department of Chemistry', url: 'https://vvce.ac.in/departments/department-of-chemistry/' },
    { label: 'Department of Mathematics', url: 'https://vvce.ac.in/departments/department-of-mathematics/' },
    { label: 'Library & Information Center', url: 'https://vvce.ac.in/departments/library-information-center/' },
  ];

  const autonomousItems = [
    { label: 'Autonomous Regulations', url: 'https://vvce.ac.in/autonomous-regulations/' },
    { label: 'Scheme & Syllabus', url: 'https://vvce.ac.in/autonomous-scheme-syllabus/' },
    { label: 'Academic Council', url: 'https://vvce.ac.in/acm-meeting-proceedings/' },
    { label: 'Calendar of Events', url: 'https://vvce.ac.in/academic-calendar/' },
    { label: 'Assessment / Evaluation Methods', url: 'https://vvce.ac.in/assessment-evaluation-methods/' },
    { label: 'Model Question Papers', url: 'https://vvce.ac.in/model-question-papers/' },
    { label: 'Exam Notifications', url: 'https://vvce.ac.in/exam-notifications/' },
    { label: 'Results', url: 'https://vvce.ac.in/results/' },
  ];

  const lifeItems = [
    { label: 'Best Practices', url: 'https://sites.google.com/vvce.ac.in/vvce-best-practices/home' },
    { label: 'Student Clubs', url: 'https://vvce.ac.in/student-clubs-all/' },
    { label: 'Facilities', url: 'https://vvce.ac.in/facilities/' },
    { label: 'Careers', url: 'https://vvce.ac.in/careers/' },
    { label: 'VVCE Times', url: 'https://times.vvce.ac.in/' },
    { label: 'VIDYUTH Fest 2026', url: 'https://vvce.ac.in/wp-content/uploads/2026/05/Vidyuth_2026_Event_Report.pdf' },
    { label: 'NSS & Red Cross', url: 'http://nss.vvce.ac.in' },
    { label: 'NCC Wing', url: 'https://vvce.ac.in/wp-content/uploads/2025/05/NCC-Website-Details_compressed.pdf' },
    { label: 'Vismaya Magazine 2025', url: 'https://vvce.ac.in/wp-content/uploads/2026/04/VISMAYA-2025.pdf' },
  ];

  const corporateItems = [
    { label: 'Overview', url: 'https://vvce.ac.in/overview/' },
    { label: 'International Affairs', url: 'https://vvce.ac.in/international-affairs/' },
    { label: 'Academic Collaborations', url: 'https://vvce.ac.in/academic-collaborations/' },
  ];

  const topDirectLinks = [
    { label: 'Admissions', url: 'https://vvce.ac.in/admissions/' },
    { label: 'Placements', url: 'https://vvce.ac.in/placements/' },
    { label: 'NIRF', url: 'https://vvce.ac.in/nirf/' },
    { label: 'NAAC', url: 'https://vvce.ac.in/naac-criterions/' },
    { label: 'IQAC', url: 'https://vvce.ac.in/iqac/' },
    { label: 'Virtual Tour', url: 'https://virtualtour.vvce.ac.in/' },
    { label: 'Alumni Portal', url: 'https://alumni.vvce.ac.in/' },
    { label: 'VVCE Journals', url: 'https://vvcejournals.com/' },
    { label: 'Contact Us', url: 'https://vvce.ac.in/contact-us/' },
    { label: 'Exam Backlog Fee', url: 'http://vvce.ion-education.in' },
    { label: 'NBA DCS', url: 'https://www.nba.vvce.ac.in' }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#1a232a] border-b border-slate-200 dark:border-white/10 shadow-xs z-30 relative select-none">
      {/* Top Banner Bar - Institutional Codes */}
      <div className="bg-[#F5EDFF] dark:bg-[#251b33] text-slate-800 dark:text-purple-200 text-[11px] py-1.5 px-4 font-mono font-medium border-b border-purple-200 dark:border-purple-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          {codes.map((c, idx) => (
            <span key={c.label} className="inline-flex items-center space-x-1">
              <span className="text-slate-600 dark:text-purple-300">{c.label}:</span>
              <strong className="font-bold text-purple-900 dark:text-purple-100">{c.value}</strong>
              {idx < codes.length - 1 && <span className="ml-3 text-purple-300 dark:text-purple-700">|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Main Official Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo Brand Header - CampusONE */}
          <div className="flex items-center space-x-3 shrink-0 cursor-pointer group" onClick={() => setActiveScreen('landing')}>
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img src="/vvce-logo.png" alt="VVCE CampusONE Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  VVCE <span className="bg-gradient-to-r from-[#10B981] via-[#F4C95D] to-[#FF6B6B] bg-clip-text text-transparent">CampusONE</span>
                </h1>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 font-bold">
                  Official
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Vidyavardhaka College of Engineering, Mysuru</p>
            </div>
          </div>

          {/* Nav Links Grid */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-3 gap-y-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
            {/* About Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => setActiveScreen('about_campus')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all"
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-[#324148] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl z-50 py-2 animate-in fade-in">
                  {aboutItems.map(item => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#1F2933] hover:text-[#10B981] transition-all"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Departments Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('depts')} onMouseLeave={() => setActiveDropdown(null)}>
              <button
                onClick={() => setActiveScreen('about_campus')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all"
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {activeDropdown === 'depts' && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-white dark:bg-[#324148] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl z-50 py-2 max-h-80 overflow-y-auto animate-in fade-in">
                  <div className="px-3 py-1 text-[9px] font-mono font-bold uppercase text-[#10B981]">Engineering & PG Departments</div>
                  {departmentItems.map(item => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-1.5 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#1F2933] hover:text-[#10B981] transition-all"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Autonomous Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('auton')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all">
                <span>Autonomous</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {activeDropdown === 'auton' && (
                <div className="absolute left-0 top-full mt-1 w-60 bg-white dark:bg-[#324148] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl z-50 py-2 animate-in fade-in">
                  {autonomousItems.map(item => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#1F2933] hover:text-[#10B981] transition-all"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Life @ VVCE Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('life')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all">
                <span>Life @ VVCE</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {activeDropdown === 'life' && (
                <div className="absolute left-0 top-full mt-1 w-60 bg-white dark:bg-[#324148] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl z-50 py-2 animate-in fade-in">
                  {lifeItems.map(item => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#1F2933] hover:text-[#10B981] transition-all"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Corporate & International Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('corp')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all">
                <span>Corporate & International</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {activeDropdown === 'corp' && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-[#324148] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl z-50 py-2 animate-in fade-in">
                  {corporateItems.map(item => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#1F2933] hover:text-[#10B981] transition-all"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            {topDirectLinks.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#324148] hover:text-[#10B981] transition-all flex items-center space-x-1"
              >
                <span>{link.label}</span>
              </a>
            ))}

            {/* VVCE Login / Register Action Button */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#FF6B6B] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#10B981]/25 active:scale-[0.98] transition-all flex items-center space-x-2 shrink-0 ml-2"
            >
              <LogIn className="w-4 h-4" />
              <span>VVCE Login / Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
