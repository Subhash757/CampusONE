import React, { useState } from 'react';
import { Check, X, ShieldCheck, Search, ArrowLeft, Clock, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserManagement: React.FC = () => {
  const { setActiveScreen, users, pendingUsers, approveUser, rejectUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: string, name: string) => {
    approveUser(id);
    setActionSuccess(`Approved ${name}'s account registration.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleReject = (id: string, name: string) => {
    rejectUser(id);
    setActionSuccess(`Rejected ${name}'s account registration.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveScreen('admin_tower')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>User & Registration Approval Matrix</span>
            </h1>
            <p className="text-xs text-slate-400">Review & Approve New VVCE Account Registrations, Manage Student & Faculty Roles.</p>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Pending Account Registration Approvals Card */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-4 shadow-xl bg-amber-950/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Pending Registration Requests</h2>
              <p className="text-xs text-slate-400">New VVCE accounts requiring Administrator verification before login access is granted.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
            {pendingUsers.length} Request(s) Pending
          </span>
        </div>

        {pendingUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {pendingUsers.map(usr => (
              <div
                key={usr.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/40" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{usr.name}</h4>
                      <p className="text-xs text-amber-400 font-mono">{usr.email}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{usr.departmentName}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    usr.role === 'faculty' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  }`}>
                    {usr.role}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: <strong className="text-slate-200">{usr.rollNumber || usr.employeeId || 'N/A'}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleReject(usr.id, usr.name)}
                      className="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-500/30 transition-all flex items-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(usr.id, usr.name)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Account</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400 space-y-1">
            <UserCheck className="w-8 h-8 text-teal-400 mx-auto opacity-80 mb-2" />
            <p className="font-semibold text-slate-300">All Registration Requests Handled!</p>
            <p className="text-[11px] text-slate-500">No unapproved user registration requests currently in the queue.</p>
          </div>
        )}
      </div>

      {/* Active User Roster Matrix */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Active Institutional Users</h2>
            <p className="text-xs text-slate-400">Approved Student & Faculty Accounts with Active Portal Access</p>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active user name or email..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Identifier ID</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map(usr => (
                <tr key={usr.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img src={usr.avatar} alt={usr.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-100">{usr.name}</p>
                      <p className="text-[10px] text-slate-400">{usr.email}</p>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      usr.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      usr.role === 'faculty' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                      'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}>
                      {usr.role}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-300">{usr.departmentName}</td>
                  <td className="py-3 px-4 font-mono text-teal-400">{usr.rollNumber || usr.employeeId || 'SYS-01'}</td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Approved & Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
