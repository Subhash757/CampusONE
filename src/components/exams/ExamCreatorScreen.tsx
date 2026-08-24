import React, { useState } from 'react';
import { Plus, Trash2, Save, FilePlus2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question, QuestionType, Exam } from '../../types';
import { mockSubjects } from '../../data/mockData';

export const ExamCreatorScreen: React.FC = () => {
  const { addExam, setActiveScreen, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(mockSubjects[0].id);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [passingMarks, setPassingMarks] = useState(20);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: `q_new_1`,
      type: 'mcq',
      category: 'General',
      questionText: 'Sample question text...',
      options: [
        { id: 'opt_1', text: 'Option A', isCorrect: true },
        { id: 'opt_2', text: 'Option B' },
        { id: 'opt_3', text: 'Option C' }
      ],
      maxMarks: 5
    }
  ]);

  const handleAddQuestion = () => {
    const newQ: Question = {
      id: `q_new_${Date.now()}`,
      type: 'mcq',
      category: 'General',
      questionText: 'Enter question formulation here...',
      options: [
        { id: `opt_${Date.now()}_1`, text: 'Choice 1', isCorrect: true },
        { id: `opt_${Date.now()}_2`, text: 'Choice 2' }
      ],
      maxMarks: 5
    };
    setQuestions(prev => [...prev, newQ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || questions.length === 0) return;

    const selectedSubject = mockSubjects.find(s => s.id === subjectId) || mockSubjects[0];
    const totalMarks = questions.reduce((acc, q) => acc + q.maxMarks, 0);

    const newExam: Exam = {
      id: `ex_${Date.now()}`,
      title,
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      createdById: currentUser.id,
      createdByName: currentUser.name,
      durationMinutes,
      totalMarks,
      passingMarks,
      negativeMarking,
      negativeMarkValue: 0.25,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 86400000).toISOString(),
      status: 'active',
      allowedAttempts: 1,
      questions
    };

    addExam(newExam);
    setActiveScreen('exams');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <FilePlus2 className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-white">Create Online Assessment</h1>
          </div>
          <p className="text-xs text-slate-400">Configure questions, timer, auto-grading rubrics, and publish to students.</p>
        </div>

        <button
          onClick={handlePublish}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs border border-pink-400 shadow-glow-alert hover:opacity-90"
        >
          <Save className="w-4 h-4" />
          <span>Publish Exam Now</span>
        </button>
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        {/* Basic Exam Meta */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Exam Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mid-Semester Exam: Neural Networks & Deep Learning"
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-teal-500 outline-none"
            >
              {mockSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (Minutes)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-teal-500 outline-none font-mono"
            />
          </div>
        </div>

        {/* Questions Suite */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100">Exam Questions ({questions.length})</h2>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs border border-white/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

          {questions.map((q, idx) => (
            <div key={q.id} className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono font-bold text-teal-400">Question #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(q.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={q.questionText}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[idx].questionText = e.target.value;
                  setQuestions(updated);
                }}
                placeholder="Question text..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-teal-500 outline-none"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
