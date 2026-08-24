import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Code2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Zap,
  ArrowLeft,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAllProblems, PROBLEM_CATEGORIES, TOP_COMPANIES } from '../../data/problemGenerator';
import { CodingProblem } from '../../types';

const PROBLEMS_PER_PAGE = 20;

export const ProblemBankExplorer: React.FC = () => {
  const { setActiveScreen, setActiveLiveSessionId } = useApp();

  const allProblems = useMemo(() => getAllProblems(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered problems computation
  const filteredProblems = useMemo(() => {
    return allProblems.filter(p => {
      // Search query
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'All' ||
        p.tags.includes(selectedCategory);

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        p.difficulty === selectedDifficulty;

      // Company
      const matchesCompany =
        selectedCompany === 'All' ||
        (p.companyTags && p.companyTags.includes(selectedCompany));

      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany;
    });
  }, [allProblems, searchQuery, selectedCategory, selectedDifficulty, selectedCompany]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE));
  const currentPageProblems = useMemo(() => {
    const start = (currentPage - 1) * PROBLEMS_PER_PAGE;
    return filteredProblems.slice(start, start + PROBLEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  const handleSelectProblem = (problem: CodingProblem) => {
    // Navigate to live proctored interview mode with this problem
    setActiveScreen('live_interview');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#324148]">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveScreen('interviews')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] hover:bg-slate-200 dark:hover:bg-[#3D4C54] text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 transition-all"
              title="Back to Interview Studio"
            >
              <ArrowLeft className="w-5 h-5 text-[#10B981]" />
            </button>
            <span className="p-2 rounded-xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <Code2 className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">600+ VVCE Interview Problem Bank</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Curated LeetCode &amp; System Design question repository categorized across 15 DSA tracks &amp; top tech leaders.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right font-mono px-4 py-2 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="text-2xl font-black text-[#10B981]">{allProblems.length}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">TOTAL PROBLEMS</span>
          </div>
        </div>
      </div>

      {/* Controls & Filter Panel */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 bg-white dark:bg-[#324148] shadow-lg">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search 600+ problems by title, topic, algorithm or company tag..."
            className="w-full bg-slate-50 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#10B981] transition-all"
          />
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">
              <BookOpen className="w-3 h-3 text-[#10B981]" />
              <span>DSA Category ({PROBLEM_CATEGORIES.length} Tracks)</span>
            </label>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-[#10B981]"
            >
              <option value="All">All Categories ({allProblems.length} Problems)</option>
              {PROBLEM_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-[#F4C95D]" />
              <span>Difficulty Level</span>
            </label>
            <select
              value={selectedDifficulty}
              onChange={e => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-[#10B981]"
            >
              <option value="All">All Difficulties (Easy / Medium / Hard)</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Company Tag Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">
              <Building2 className="w-3 h-3 text-[#FF6B6B]" />
              <span>Top Tech Company Tag</span>
            </label>
            <select
              value={selectedCompany}
              onChange={e => { setSelectedCompany(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 dark:bg-[#1F2933] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-[#10B981]"
            >
              <option value="All">All Companies (Google, Meta, Amazon...)</option>
              {TOP_COMPANIES.map(comp => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter summary & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredProblems.length}</strong> matching problems out of 600+
          </div>
          {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedCompany !== 'All' || searchQuery !== '') && (
            <button
              onClick={handleResetFilters}
              className="text-[#FF6B6B] hover:underline font-semibold text-xs"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Problem Cards List */}
      {currentPageProblems.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 space-y-3 bg-white dark:bg-[#324148]">
          <Code2 className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Matching Problems Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your category, difficulty or company filters.</p>
          <button onClick={handleResetFilters} className="px-4 py-2 rounded-xl bg-[#10B981] text-white text-xs font-bold">Reset Filters</button>
        </div>
      ) : (
        <div className="space-y-3">
          {currentPageProblems.map((prob, idx) => {
            const diffClass =
              prob.difficulty === 'Easy'
                ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                : prob.difficulty === 'Medium'
                ? 'bg-[#F4C95D]/15 text-[#F4C95D] border-[#F4C95D]/30'
                : 'bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30';

            return (
              <div
                key={prob.id}
                className="glass-panel-interactive rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#324148]"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                    <span className="text-xs font-mono font-bold text-slate-400">{prob.id.toUpperCase()}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{prob.title}</h3>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${diffClass}`}>
                      {prob.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {prob.description}
                  </p>

                  <div className="flex items-center space-x-2 flex-wrap gap-1.5 pt-1">
                    {prob.tags.map(t => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1F2933] text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-white/10">
                        {t}
                      </span>
                    ))}
                    {prob.companyTags?.map(comp => (
                      <span key={comp} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20">
                        🏢 {comp}
                      </span>
                    ))}
                    <span className="text-[10px] font-mono text-slate-400 ml-auto">
                      Acceptance: <strong className="text-[#10B981]">{prob.acceptanceRate}%</strong>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center space-x-3">
                  <button
                    onClick={() => handleSelectProblem(prob)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 active:scale-[0.98] transition-all"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Practice in Live Studio</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#324148]">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1F2933] text-xs font-semibold disabled:opacity-40 border border-slate-300 dark:border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
            Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#10B981] text-white text-xs font-semibold disabled:opacity-40 shadow-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
