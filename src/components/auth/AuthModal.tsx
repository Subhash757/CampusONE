import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, User } from '../../types';

interface AuthModalProps {
  onClose?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { setCurrentUser, setActiveScreen, setIsAuthenticated, users, pendingUsers, registerUser } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateVVCEEmail = (emailStr: string): boolean => {
    const trimmed = emailStr.trim().toLowerCase();
    return trimmed.startsWith('vvce') && trimmed.endsWith('@vvce.ac.in');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!validateVVCEEmail(cleanEmail)) {
      setValidationError("VVCE email MUST start with 'vvce' and end with '@vvce.ac.in' (e.g., vvce.student@vvce.ac.in)");
      return;
    }

    if (password.length < 4) {
      setValidationError("Password must be at least 4 characters.");
      return;
    }

    if (mode === 'register') {
      // Check if already exists in active or pending
      const isAlreadyActive = users.some(u => u.email.toLowerCase() === cleanEmail);
      const isAlreadyPending = pendingUsers.some(u => u.email.toLowerCase() === cleanEmail);

      if (isAlreadyActive) {
        setValidationError("An account with this email is already registered. Please Sign In.");
        return;
      }
      if (isAlreadyPending) {
        setValidationError("A registration request for this email is already pending Admin approval.");
        return;
      }

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name || cleanEmail.split('@')[0].replace('vvce.', '').replace('.', ' '),
        email: cleanEmail,
        role: role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        departmentId: 'dept_cs',
        departmentName: 'Computer Science & Engineering (VVCE)',
        rollNumber: role === 'student' ? '4VV21CS' + Math.floor(100 + Math.random() * 900) : undefined,
        employeeId: role !== 'student' ? 'VVCE-EMP-' + Math.floor(1000 + Math.random() * 9000) : undefined,
        semester: 6,
        classGroup: 'CSE-6A',
        status: 'pending'
      };

      registerUser(newUser);
      setSuccessMsg("Registration submitted successfully! Your account is pending Admin approval.");
      setEmail('');
      setPassword('');
      setName('');
      setTimeout(() => {
        setMode('login');
      }, 2500);
      return;
    }

    // Login Mode
    const isPending = pendingUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (isPending) {
      setValidationError("Your account registration is currently pending approval from a VVCE Administrator.");
      return;
    }

    const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      setCurrentUser(existingUser);
      setIsAuthenticated(true);
      setSuccessMsg("Welcome to VVCE CampusONE!");
      setTimeout(() => {
        if (onClose) onClose();
        setActiveScreen('dashboard');
      }, 1000);
    } else {
      setValidationError("Account not found. Please register first to submit an account request for Admin approval.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2933]/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="w-full max-w-lg bg-white dark:bg-[#324148] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Official VVCE Logo Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-white p-2 border border-slate-200 dark:border-white/10 shadow-md mb-1">
            <img src="/vvce-logo.png" alt="VVCE Official Logo" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            VVCE <span className="bg-gradient-to-r from-[#10B981] to-[#FF6B6B] bg-clip-text text-transparent">CampusONE</span> Portal
          </h2>
          <p className="text-xs text-[#667085] dark:text-slate-300">
            Vidyavardhaka College of Engineering, Mysuru
          </p>
        </div>

        {/* Email Rule Notice Badge */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white space-y-1">
          <div className="flex items-center space-x-1.5 font-bold font-mono text-[#10B981] dark:text-[#F4C95D]">
            <Lock className="w-3.5 h-3.5" />
            <span>Institutional Email Requirements:</span>
          </div>
          <p className="text-[11px] text-[#667085] dark:text-slate-300">
            Must start with <code className="text-[#10B981] dark:text-[#F4C95D] font-bold bg-slate-200 dark:bg-[#324148] px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10">vvce</code> and end with <code className="text-[#10B981] dark:text-[#F4C95D] font-bold bg-slate-200 dark:bg-[#324148] px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10">@vvce.ac.in</code>
          </p>
        </div>

        {/* Official Admin Login Info */}
        {mode === 'login' && (
          <div className="p-3 rounded-2xl bg-[#F4C95D]/10 border border-[#F4C95D]/30 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F4C95D] font-mono">Official VVCE Admin Login:</span>
              <button
                type="button"
                onClick={() => {
                  setEmail('vvce.admin@vvce.ac.in');
                  setPassword('admin123');
                }}
                className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-lg border border-[#10B981]/30 hover:bg-[#10B981]/30 transition-all"
              >
                Use Admin Credentials
              </button>
            </div>
            <p className="text-[11px] text-[#667085] dark:text-slate-300">
              Email: <code className="font-mono font-bold text-slate-900 dark:text-white">vvce.admin@vvce.ac.in</code> (or <code className="font-mono font-bold text-slate-900 dark:text-white">vvce.marcus.vance@vvce.ac.in</code>) | Password: <code className="font-mono font-bold text-slate-900 dark:text-white">admin123</code>
            </p>
          </div>
        )}

        {/* Error / Success Alerts */}
        {validationError && (
          <div className="p-3 rounded-2xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/40 text-[#FF6B6B] text-xs flex items-start space-x-2 animate-in zoom-in-95 font-semibold">
            <AlertTriangle className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/50 text-[#10B981] dark:text-[#F4C95D] text-xs flex items-center space-x-2 animate-in zoom-in-95 font-semibold">
            <CheckCircle className="w-4 h-4 text-[#10B981] dark:text-[#F4C95D] shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full bg-slate-100 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-[#667085] focus:border-[#10B981] outline-none transition-all"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">
              VVCE Email Address <span className="text-[#10B981] dark:text-[#F4C95D] font-mono text-[10px]">(vvce*@vvce.ac.in)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vvce.alex.chen@vvce.ac.in"
                className="w-full bg-slate-100 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-[#667085] focus:border-[#10B981] outline-none font-mono transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-100 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl pl-9 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-[#667085] focus:border-[#10B981] outline-none transition-all"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Institutional Persona Role</label>
              <div className="grid grid-cols-2 gap-2">
                {(['student', 'faculty'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      role === r
                        ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm'
                        : 'bg-slate-100 dark:bg-[#1F2933] border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center space-x-1">
                <span>🔒</span>
                <span>Admin accounts are managed internally and cannot be self-registered.</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>{mode === 'login' ? 'Sign In to VVCE Portal' : 'Submit Registration for Admin Approval'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="text-center text-xs text-[#667085] dark:text-slate-300 pt-1">
          {mode === 'login' ? (
            <p>
              New VVCE student or faculty?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-[#10B981] font-bold hover:underline transition-colors"
              >
                Register Here
              </button>
            </p>
          ) : (
            <p>
              Already have a VVCE account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[#10B981] font-bold hover:underline transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
