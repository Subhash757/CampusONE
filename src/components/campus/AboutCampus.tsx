import React from 'react';
import {
  Building2,
  Award,
  GraduationCap,
  ExternalLink,
  BookOpen,
  MapPin,
  CheckCircle,
  Sparkles,
  Users,
  Compass,
  Briefcase,
  FlaskConical,
  Heart,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubhashDeveloperCard } from '../common/SubhashDeveloperCard';

export const AboutCampus: React.FC = () => {
  const { setActiveScreen } = useApp();

  const codes = [
    { label: 'CET Code', value: 'E071', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    { label: 'COMED-K Code', value: 'E147', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
    { label: 'PGCET (MBA)', value: 'B315', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' },
    { label: 'PGCET (MTech)', value: 'T886', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' },
    { label: 'PGCET (MCA)', value: 'C613', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' },
  ];

  const departments = [
    { name: 'Computer Science & Engineering (CSE)', code: 'UG & PG', badge: 'NBA Accredited' },
    { name: 'Computer Science & Engineering (AI & ML)', code: 'UG', badge: 'Specialized Tech' },
    { name: 'Information Science & Engineering (ISE)', code: 'UG', badge: 'NBA Accredited' },
    { name: 'Electronics & Communication Engineering (ECE)', code: 'UG & PG', badge: 'NBA Accredited' },
    { name: 'Electrical & Electronics Engineering (EEE)', code: 'UG', badge: 'NBA Accredited' },
    { name: 'Mechanical Engineering (ME)', code: 'UG & PG', badge: 'NBA Accredited' },
    { name: 'Civil Engineering (CV)', code: 'UG & PG', badge: 'VTU Affiliated' },
    { name: 'Department of Business Administration (MBA)', code: 'PG', badge: 'Management' },
    { name: 'Department of Computer Applications (MCA)', code: 'PG', badge: 'Software Systems' },
    { name: 'Basic Sciences (Physics, Chemistry, Maths)', code: 'BS & H', badge: 'Research Centers' },
  ];

  const highlights = [
    {
      title: 'Autonomous Freedom',
      desc: 'Granted autonomous status from VTU, Belagavi in 2020. Frame CBCS outcome-based curriculum aligned with global industry demands.',
      icon: GraduationCap,
      color: 'text-[#10B981]'
    },
    {
      title: 'NAAC "A" Grade & NBA Accredited',
      desc: 'Accredited with Grade "A" by NAAC and NBA accreditation across major engineering branches ensuring superior education standards.',
      icon: Award,
      color: 'text-[#F4C95D]'
    },
    {
      title: '23+ Acre Modern Mysuru Campus',
      desc: 'Located in Gokulam, Mysuru with cutting-edge laboratories, digital smart classrooms, high-speed Wi-Fi & modern sports amenities.',
      icon: MapPin,
      color: 'text-[#FF6B6B]'
    },
    {
      title: 'Training & Placements',
      desc: 'Dedicated Training & Placement Cell providing aptitude training, mock interviews & recruiting visits from 50+ top tier-1 tech firms.',
      icon: Briefcase,
      color: 'text-[#10B981]'
    },
    {
      title: 'Research & Innovation Hub',
      desc: 'VTU recognized Ph.D. research centers, incubation ecosystem, student startup grants & active industry-institute partnerships.',
      icon: FlaskConical,
      color: 'text-[#F4C95D]'
    },
    {
      title: 'Vibrant Life @ VVCE',
      desc: 'Host of "VIDYUTH" annual flagship cultural fest, technical clubs, IEEE/ACM chapters, NSS, NCC & Red Cross youth activities.',
      icon: Sparkles,
      color: 'text-[#FF6B6B]'
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      {/* Hero Banner */}
      <div className="relative glass-panel rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-slate-200 dark:border-white/10 shadow-md flex items-center justify-center shrink-0">
                <img src="/vvce-logo.png" alt="VVCE Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 font-bold">
                  Vidyavardhaka Sangha ®, Mysuru
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  Vidyavardhaka College of Engineering
                </h1>
                <p className="text-xs md:text-sm text-[#667085] dark:text-slate-300 font-medium">
                  Autonomous Institute Affiliated to VTU, Belagavi | Approved by AICTE & Govt. of Karnataka | Estd. 1997
                </p>
              </div>
            </div>

            <a
              href="https://vvce.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#FF6B6B] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 transition-all flex items-center space-x-2 shrink-0 active:scale-[0.98]"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Official Website (vvce.ac.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CET / COMED-K Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
            {codes.map(c => (
              <span key={c.label} className={`text-xs font-mono font-semibold px-3 py-1 rounded-xl border ${c.color}`}>
                {c.label}: <strong className="font-bold">{c.value}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4 shadow-md">
          <div className="flex items-center space-x-3 text-[#10B981]">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Campus Vision</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            "To be a leading autonomous institution in engineering and management education, enabling individuals to make significant, ethically grounded contributions to society through knowledge, innovation, and leadership."
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4 shadow-md">
          <div className="flex items-center space-x-3 text-[#FF6B6B]">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Campus Mission</h2>
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>Provide state-of-the-art teaching-learning ecosystems through competent faculty and modern infrastructure.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>Inculcate professional ethics, leadership qualities, communication skills, and entrepreneurial mindsets.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>Promote applied research, innovation, and strong industry-institute collaborations.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">VVCE Key Pillars & Accreditation Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map(h => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-3 shadow-md hover:border-[#10B981]/50 transition-all">
                <Icon className={`w-8 h-8 ${h.color}`} />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{h.title}</h3>
                <p className="text-xs text-[#667085] dark:text-slate-300 leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Departments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Departments & Programs</h2>
          <span className="text-xs font-mono text-[#10B981] font-bold">7 UG | 3 PG | Ph.D. Centers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((d, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#324148] border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-xs text-[#10B981]">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{d.name}</h4>
                  <span className="text-[10px] text-[#667085] dark:text-slate-400 font-mono">{d.code}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30 font-bold">
                {d.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Quick Links Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] space-y-4 shadow-md">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <ExternalLink className="w-4 h-4 text-[#10B981]" />
          <span>Official VVCE Quick Links (vvce.ac.in)</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Autonomous Scheme & Syllabus', url: 'https://vvce.ac.in/autonomous-scheme-syllabus/' },
            { label: 'Admissions 2026-27', url: 'https://vvce.ac.in/admissions/' },
            { label: 'Training & Placements', url: 'https://vvce.ac.in/placements/' },
            { label: 'Contact & Location', url: 'https://vvce.ac.in/contact-us/' }
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 hover:border-[#10B981] text-slate-800 dark:text-slate-200 font-medium flex items-center justify-between group transition-all"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#10B981] transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Developer & Contact Section */}
      <div className="pt-2">
        <SubhashDeveloperCard />
      </div>

      {/* Developer Credit Footer */}
      <div className="text-center pt-4 border-t border-slate-200 dark:border-white/10 space-y-1">
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
          All Rights Reserved by <span className="bg-gradient-to-r from-[#10B981] via-[#F4C95D] to-[#FF6B6B] bg-clip-text text-transparent font-extrabold">Subhash K M</span>
        </p>
        <p className="text-[11px] text-[#667085] dark:text-slate-400 font-medium">
          VVCE CampusONE &copy; {new Date().getFullYear()} Vidyavardhaka College of Engineering, Mysuru.
        </p>
      </div>
    </div>
  );
};
