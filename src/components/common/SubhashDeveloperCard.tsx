import React from 'react';
import { Code2, Mail, Phone, Heart, ShieldCheck, Sparkles, ExternalLink, Globe } from 'lucide-react';

export const SubhashDeveloperCard: React.FC<{ compact?: boolean }> = ({ compact }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148] shadow-xl relative overflow-hidden space-y-4">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#10B981]/15 to-[#FF6B6B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#38bdf8] via-[#10B981] to-[#FF6B6B] p-0.5 shadow-lg shrink-0 group hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[14px] bg-[#0f172a] p-1.5 flex items-center justify-center overflow-hidden">
              <img src="/subhash-logo.svg" alt="Subhash K M Autobot Insignia Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Subhash K M
              </h3>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] dark:text-[#F4C95D] border border-[#10B981]/30">
                Lead Creator & Architect
              </span>
            </div>
            <p className="text-xs text-[#667085] dark:text-slate-300 font-medium mt-0.5">
              Creator & Lead Engineer of VVCE CampusONE Unified Portal
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* GitHub Link */}
          <a
            href="https://github.com/Subhash757"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 active:scale-[0.98]"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>GitHub Profile (@Subhash757)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 text-xs">
        <a
          href="https://github.com/Subhash757"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 hover:border-[#10B981] transition-all flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-[#10B981] flex items-center justify-center shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">GitHub Repository</p>
            <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-[#10B981] transition-colors">
              github.com/Subhash757
            </p>
          </div>
        </a>

        <a
          href="mailto:subhashkmsubhash4@gmail.com"
          className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 hover:border-[#FF6B6B] transition-all flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-[#FF6B6B] flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Email Contact</p>
            <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-[#FF6B6B] transition-colors">
              subhashkmsubhash4@gmail.com
            </p>
          </div>
        </a>

        <a
          href="tel:+918951069414"
          className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 hover:border-[#F4C95D] transition-all flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-[#F4C95D] flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Phone Number</p>
            <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-[#F4C95D] transition-colors">
              +91 89510 69414
            </p>
          </div>
        </a>
      </div>

      {/* Copyright Notice */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium relative z-10">
        <div className="flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>All Rights Reserved by <strong className="text-slate-900 dark:text-white font-bold">Subhash K M</strong></span>
        </div>
        <span className="font-mono text-[10px] text-[#10B981] font-bold">VVCE CampusONE &copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};
