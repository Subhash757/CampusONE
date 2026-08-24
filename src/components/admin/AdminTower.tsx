import React from 'react';
import {
  Building2,
  Users,
  Shield,
  Download,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockDepartments, mockAuditLogs } from '../../data/mockData';

export const AdminTower: React.FC = () => {
  const { setActiveScreen, auditLogs } = useApp();

  const exportSystemAuditCSV = () => {
    const headers = ['User', 'Action', 'Target', 'Timestamp', 'IP Address'];
    const rows = auditLogs.map(l => [l.user, l.action, l.targetEntity, l.timestamp, l.ipAddress]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VVCE_Institutional_Audit_Logs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <Building2 className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Administration Tower</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Institution-wide statistics, department controls, user permission matrix & security audit trails.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveScreen('user_management')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Manage Users & Roles</span>
          </button>

          <button
            onClick={exportSystemAuditCSV}
            className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs border border-slate-300 dark:border-white/10"
          >
            <Download className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Export Institutional CSV</span>
          </button>
        </div>
      </div>

      {/* Institution Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-2">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Total Enrolled Students</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">1,380</p>
          <p className="text-xs text-teal-700 dark:text-teal-400 font-mono">Across 4 Engineering Depts</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-2">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Total Active Faculty</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">69</p>
          <p className="text-xs text-violet-700 dark:text-violet-400 font-mono">100% Verified Credentials</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-2">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Campus Attendance Avg</p>
          <p className="text-3xl font-black text-teal-700 dark:text-teal-400 font-mono">88.4%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Required Policy: 75%</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-2">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">Security Audit Status</p>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">ACTIVE</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{auditLogs.length} System Actions Logged</p>
        </div>
      </div>

      {/* Departments Overview Matrix */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Academic Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDepartments.map(dept => (
            <div key={dept.id} className="glass-panel rounded-3xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700">
                  {dept.code}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{dept.totalFaculty} Faculty</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{dept.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">HOD: {dept.headOfDepartment}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <span>{dept.totalStudents} Students</span>
                <span className="text-teal-700 dark:text-teal-400 font-mono font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Security Audit Log Feed */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Institution System Audit Log</span>
          </h3>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Real-time Session Logger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Action Description</th>
                <th className="py-2.5 px-3">Target Entity</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-200">{log.user}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{log.action}</td>
                  <td className="py-2.5 px-3 text-teal-700 dark:text-teal-400 font-mono">{log.targetEntity}</td>
                  <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 font-mono">{log.timestamp}</td>
                  <td className="py-2.5 px-3 text-slate-400 dark:text-slate-500 font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
