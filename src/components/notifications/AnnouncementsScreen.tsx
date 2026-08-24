import React, { useState } from 'react';
import {
  Megaphone,
  Clock,
  User,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X,
  Shield,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';

// ─── Types ────────────────────────────────────────────────────────────────────
type Priority = 'normal' | 'high' | 'urgent';

interface FormState {
  title: string;
  content: string;
  priority: Priority;
}

const EMPTY_FORM: FormState = { title: '', content: '', priority: 'normal' };

// ─── Priority Badge ────────────────────────────────────────────────────────────
const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const cfg: Record<Priority, { label: string; cls: string }> = {
    urgent: {
      label: 'URGENT',
      cls: 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/40'
    },
    high: {
      label: 'HIGH',
      cls: 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/40'
    },
    normal: {
      label: 'NORMAL',
      cls: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40'
    }
  };
  const { label, cls } = cfg[priority];
  return (
    <span
      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${cls}`}
    >
      {label} PRIORITY
    </span>
  );
};

// ─── Delete Confirmation Dialog ────────────────────────────────────────────────
interface ConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2933]/80 backdrop-blur-sm animate-in fade-in"
    onClick={(e) => e.target === e.currentTarget && onCancel()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="confirm-dialog-title"
  >
    <div className="w-full max-w-sm bg-white dark:bg-[#324148] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl space-y-5 animate-in zoom-in-95">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/15 border border-[#FF6B6B]/30 flex items-center justify-center">
          <Trash2 className="w-7 h-7 text-[#FF6B6B]" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <h3 id="confirm-dialog-title" className="text-base font-bold text-slate-900 dark:text-white">
          Delete Entry?
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          You are about to permanently delete:
        </p>
        <p className="text-xs font-semibold text-[#FF6B6B] px-3 py-2 rounded-xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 line-clamp-2">
          "{title}"
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          This action cannot be undone.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <button
          id="confirm-cancel-btn"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-white/10 transition-all"
        >
          Cancel
        </button>
        <button
          id="confirm-delete-btn"
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#EE5253] text-white text-xs font-bold shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Yes, Delete</span>
        </button>
      </div>
    </div>
  </div>
);

// ─── Entry Form ────────────────────────────────────────────────────────────────
interface EntryFormProps {
  initial?: FormState;
  onSave: (data: FormState) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({ initial = EMPTY_FORM, onSave, onCancel, isEditing }) => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (form.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }
    if (form.content.trim().length < 20) {
      newErrors.content = 'Content must be at least 20 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form, title: form.title.trim(), content: form.content.trim() });
    }
  };

  const priorities: Priority[] = ['normal', 'high', 'urgent'];

  const priorityConfig: Record<Priority, { label: string; activeClass: string; inactiveClass: string }> = {
    normal: {
      label: 'Normal',
      activeClass: 'bg-[#10B981] text-white border-[#10B981] shadow-sm shadow-[#10B981]/30',
      inactiveClass: 'bg-slate-100 dark:bg-[#1F2933] text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10 hover:border-[#10B981]/50'
    },
    high: {
      label: 'High',
      activeClass: 'bg-[#F4C95D] text-[#1F2933] border-[#F4C95D] shadow-sm shadow-[#F4C95D]/30',
      inactiveClass: 'bg-slate-100 dark:bg-[#1F2933] text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10 hover:border-[#F4C95D]/50'
    },
    urgent: {
      label: 'Urgent',
      activeClass: 'bg-[#FF6B6B] text-white border-[#FF6B6B] shadow-sm shadow-[#FF6B6B]/30',
      inactiveClass: 'bg-slate-100 dark:bg-[#1F2933] text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10 hover:border-[#FF6B6B]/50'
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[#10B981]/30 dark:border-[#10B981]/25 shadow-xl bg-white dark:bg-[#324148] animate-in slide-in-from-top-4 fade-in">
      {/* Form Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30">
            <FileText className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isEditing ? 'Edit Entry' : 'New Entry'}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {isEditing ? 'Update the entry details below.' : 'Fill in the details to publish a new announcement.'}
            </p>
          </div>
        </div>
        <button
          id="entry-form-cancel-btn"
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/10 transition-all"
          title="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="entry-title" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Entry Title <span className="text-[#FF6B6B]">*</span>
          </label>
          <input
            id="entry-title"
            type="text"
            value={form.title}
            onChange={(e) => { setForm(f => ({ ...f, title: e.target.value })); setErrors(err => ({ ...err, title: undefined })); }}
            placeholder="e.g. Important Campus Notice for All Students"
            className={`w-full bg-slate-50 dark:bg-[#1F2933] border rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${
              errors.title
                ? 'border-[#FF6B6B] focus:border-[#FF6B6B]'
                : 'border-slate-300 dark:border-white/10 focus:border-[#10B981]'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-[11px] text-[#FF6B6B] flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="entry-content" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Content / Body <span className="text-[#FF6B6B]">*</span>
          </label>
          <textarea
            id="entry-content"
            value={form.content}
            onChange={(e) => { setForm(f => ({ ...f, content: e.target.value })); setErrors(err => ({ ...err, content: undefined })); }}
            rows={4}
            placeholder="Write the full announcement content here (minimum 20 characters)..."
            className={`w-full bg-slate-50 dark:bg-[#1F2933] border rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none resize-none transition-all leading-relaxed ${
              errors.content
                ? 'border-[#FF6B6B] focus:border-[#FF6B6B]'
                : 'border-slate-300 dark:border-white/10 focus:border-[#10B981]'
            }`}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.content ? (
              <p className="text-[11px] text-[#FF6B6B] flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.content}</span>
              </p>
            ) : (
              <span />
            )}
            <span className={`text-[10px] font-mono ml-auto ${form.content.trim().length < 20 ? 'text-[#FF6B6B]' : 'text-[#10B981]'}`}>
              {form.content.trim().length} / 20+ chars
            </span>
          </div>
        </div>

        {/* Priority Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {priorities.map(p => (
              <button
                key={p}
                type="button"
                id={`priority-${p}-btn`}
                onClick={() => setForm(f => ({ ...f, priority: p }))}
                className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                  form.priority === p
                    ? priorityConfig[p].activeClass
                    : priorityConfig[p].inactiveClass
                }`}
              >
                {priorityConfig[p].label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            id="entry-form-submit-btn"
            type="submit"
            className="flex-2 flex-1 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Publish Entry'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Main Screen ───────────────────────────────────────────────────────────────
export const AnnouncementsScreen: React.FC = () => {
  const {
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    setActiveScreen,
    currentUser
  } = useApp();

  const isAdmin = currentUser.role === 'admin';

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const editingEntry = editingId ? announcements.find(a => a.id === editingId) : null;

  const initialForm = (entry: Announcement): FormState => ({
    title: entry.title,
    content: entry.content,
    priority: entry.priority as Priority
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSave = (data: FormState) => {
    if (!isAdmin) return;
    if (editingId) {
      updateAnnouncement(editingId, {
        title: data.title,
        content: data.content,
        priority: data.priority
      });
      showToast('success', 'Entry updated successfully.');
      setEditingId(null);
    } else {
      addAnnouncement({
        title: data.title,
        content: data.content,
        priority: data.priority,
        authorName: currentUser.name,
        authorRole: currentUser.departmentName
      });
      showToast('success', 'New entry published successfully.');
    }
    setShowForm(false);
  };

  const handleEditClick = (entry: Announcement) => {
    if (!isAdmin) return;
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDeleteClick = (entry: Announcement) => {
    if (!isAdmin) return;
    setDeleteTarget(entry);
  };

  const handleDeleteConfirm = () => {
    if (!isAdmin || !deleteTarget) return;
    deleteAnnouncement(deleteTarget.id);
    setDeleteTarget(null);
    showToast('success', 'Entry deleted successfully.');
  };

  const handleNewEntry = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">

      {/* ── Header Banner ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <button
              id="announcements-back-btn"
              onClick={() => setActiveScreen('dashboard')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 transition-all"
              title="Back to Dashboard"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-[#F4C95D]" />
            </button>
            <span className="p-2 rounded-xl bg-[#F4C95D]/15 text-[#F4C95D] border border-[#F4C95D]/30">
              <Megaphone className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Campus Notices &amp; Announcements
              </h1>
              {isAdmin && (
                <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-[#F4C95D] bg-[#F4C95D]/10 border border-[#F4C95D]/30 px-2.5 py-0.5 rounded-full mt-0.5">
                  <Shield className="w-2.5 h-2.5" />
                  <span>Admin Management View</span>
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pl-[4.5rem]">
            Institutional broadcasts, department alerts &amp; academic notifications.
          </p>
        </div>

        {/* New Entry Button — admin only */}
        {isAdmin && (
          <button
            id="new-entry-btn"
            onClick={handleNewEntry}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all shrink-0"
            aria-label="Create new entry"
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        )}
      </div>

      {/* ── Toast Notification ─────────────────────────────────────────────── */}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className={`flex items-center space-x-3 p-4 rounded-2xl border text-xs font-semibold animate-in slide-in-from-top-2 fade-in shadow-lg ${
            toast.type === 'success'
              ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981] dark:text-[#10B981]'
              : 'bg-[#FF6B6B]/15 border-[#FF6B6B]/40 text-[#FF6B6B]'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ── Entry Form (admin only, shown when showForm is true) ──────────── */}
      {isAdmin && showForm && (
        <EntryForm
          initial={editingEntry ? initialForm(editingEntry) : EMPTY_FORM}
          onSave={handleSave}
          onCancel={handleFormCancel}
          isEditing={!!editingId}
        />
      )}

      {/* ── Entries List ───────────────────────────────────────────────────── */}
      {announcements.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-4 text-center bg-white dark:bg-[#324148]">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1F2933] border border-slate-200 dark:border-white/10 flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No announcements yet</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {isAdmin
                ? 'Use the "New Entry" button above to publish the first announcement.'
                : 'Check back later for campus updates and notices.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map(anc => (
            <div
              key={anc.id}
              className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 bg-white dark:bg-[#324148] hover:border-[#10B981]/30 transition-all duration-200 group"
            >
              {/* Card top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                  <PriorityBadge priority={anc.priority as Priority} />
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{anc.createdAt}</span>
                  </span>
                </div>

                {/* Admin-only Edit & Delete buttons */}
                {isAdmin && (
                  <div className="flex items-center space-x-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      id={`edit-entry-${anc.id}-btn`}
                      onClick={() => handleEditClick(anc)}
                      className="p-2 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/25 transition-all"
                      title="Edit entry"
                      aria-label={`Edit entry: ${anc.title}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`delete-entry-${anc.id}-btn`}
                      onClick={() => handleDeleteClick(anc)}
                      className="p-2 rounded-xl bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/25 transition-all"
                      title="Delete entry"
                      aria-label={`Delete entry: ${anc.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {anc.title}
              </h2>

              {/* Content */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {anc.content}
              </p>

              {/* Footer */}
              <div className="flex items-center space-x-2 pt-3 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5 text-[#10B981]" />
                <span>
                  Published by{' '}
                  <strong className="text-slate-700 dark:text-slate-300">{anc.authorName}</strong>
                  {anc.authorRole ? ` · ${anc.authorRole}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete Confirmation Dialog ─────────────────────────────────────── */}
      {deleteTarget && (
        <ConfirmDialog
          title={deleteTarget.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
