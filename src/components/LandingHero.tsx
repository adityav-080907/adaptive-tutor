import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Code2,
  Binary,
  Atom,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';
import { TopSubjectId, BranchId } from '../types';
import { SUBJECT_CATEGORIES, getAllTopics } from '../data/curriculumData';
import airavataLogo from '../assets/airavata-logo.jpg';

interface LandingHeroProps {
  onSelectCategory: (subjectId: TopSubjectId) => void;
  onSelectBranch: (subjectId: TopSubjectId, branchId: BranchId) => void;
  onSelectTopic: (topicId: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onSelectCategory,
  onSelectBranch,
  onSelectTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allTopics = getAllTopics();

  const searchResults = searchQuery.trim()
    ? allTopics.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subtopics.some((st) => st.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const getSubjectIcon = (id: TopSubjectId) => {
    switch (id) {
      case 'coding':
        return <Code2 className="w-5 h-5 text-[var(--accent-blue)]" />;
      case 'mathematics':
        return <Binary className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case 'science':
        return <Atom className="w-5 h-5 text-[var(--accent-gold)]" />;
    }
  };

  const getSubjectCardBorder = (id: TopSubjectId) => {
    switch (id) {
      case 'coding':
        return 'hover:border-[var(--accent-blue)] hover:shadow-lg dark:hover:shadow-[0_0_30px_-5px_rgba(67,97,238,0.25)]';
      case 'mathematics':
        return 'hover:border-[var(--accent-cyan)] hover:shadow-lg dark:hover:shadow-[0_0_30px_-5px_rgba(76,201,240,0.25)]';
      case 'science':
        return 'hover:border-[var(--accent-gold)] hover:shadow-lg dark:hover:shadow-[0_0_30px_-5px_rgba(229,195,120,0.25)]';
    }
  };

  return (
    <div className="relative pt-6 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* =========================================================================
          HERO BANNER: ILLUMINATED AIRAVATA MEDALLION & EMBERAI PRECISION DASHBOARD
         ========================================================================= */}
      <div className="relative rounded-3xl p-8 sm:p-12 border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-xl overflow-hidden transition-all duration-300">
        {/* Architectural Blueprint Dot Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Nebula Depth Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--accent-primary)]/10 dark:bg-[var(--accent-primary)]/15 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[var(--accent-gold)]/10 blur-[110px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand & Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-main)] bg-[var(--bg-secondary)]/90 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-mint)] animate-ping" />
              <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)]">
                BKT Dynamic Engine Active • Bayesian Mastery System
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-wider text-[var(--text-primary)] leading-[1.1]">
                <span className="text-gold-gradient">AIRAVATA</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Adaptive Intelligence for <span className="text-cyan-gradient">Deep Mastery</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed font-sans">
              A mathematical learning platform powered by Bayesian Knowledge Tracing. Explore sequential curricula, interact with visual proof models, and master complex ideas with adaptive diagnostic tracking.
            </p>

            {/* Command Search Bar */}
            <div className="relative max-w-xl pt-1">
              <div className="relative flex items-center group">
                <Search className="w-4 h-4 text-[var(--accent-primary)] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search concepts, algorithms, formulas (e.g. Functions, Memory, Newton)..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] hover:border-[var(--accent-primary)]/70 focus:border-[var(--accent-primary)] rounded-2xl pl-11 pr-24 py-3.5 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] shadow-inner focus:outline-none transition-all"
                />
                <div className="absolute right-3 flex items-center gap-1.5">
                  <span className="hidden sm:inline keycap">⌘K</span>
                  <button
                    onClick={() => {
                      if (searchResults.length > 0) onSelectTopic(searchResults[0].id);
                    }}
                    className="p-2 rounded-xl bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity shadow-xs"
                    aria-label="Search"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Search Suggestions Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl shadow-2xl overflow-hidden z-30 text-left divide-y divide-[var(--border-subtle)] animate-fadeIn">
                  {searchResults.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTopic(t.id);
                        setSearchQuery('');
                      }}
                      className="w-full px-4 py-3 hover:bg-[var(--bg-secondary)] flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] truncate max-w-md">
                          {t.subtitle}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[var(--text-secondary)] font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-main)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                5 Coding Languages
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-main)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                Pure & Applied Mathematics
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-main)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                Natural Sciences
              </span>
            </div>
          </div>

          {/* Right Column: Airavata Medallion + EmberAI Multi-Color Wave Curve Widget */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            {/* The Illuminated Airavata Medallion */}
            <div className="relative group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#E5C378] via-[#00B4D8] to-[#7209B7] opacity-30 dark:opacity-45 blur-xl group-hover:opacity-60 transition duration-500" />

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-[3px] bg-gradient-to-tr from-[#B8860B] via-[#E5C378] to-[#00B4D8] shadow-2xl">
                <img
                  src={airavataLogo}
                  alt="Airavata Medallion"
                  className="w-full h-full object-cover rounded-full bg-[#001233] select-none pointer-events-none"
                />
              </div>

              {/* Orbiting Tech Badges */}
              <div className="absolute -bottom-2 -left-2 px-3 py-1 rounded-xl bg-[var(--bg-surface)]/95 border border-[var(--accent-gold)]/40 shadow-lg text-[10px] font-mono text-[var(--accent-gold)] font-bold flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
                <span>BKT Learner Model</span>
              </div>

              <div className="absolute -top-1 -right-2 px-3 py-1 rounded-xl bg-[var(--bg-surface)]/95 border border-[var(--accent-cyan)]/40 shadow-lg text-[10px] font-mono text-[var(--accent-cyan)] font-bold flex items-center gap-1.5 backdrop-blur-md">
                <Cpu className="w-3 h-3 text-[var(--accent-cyan)]" />
                <span>Zero Hallucination</span>
              </div>
            </div>

            {/* Multi-Color Neon Wave Widget */}
            <div className="w-full max-w-xs p-3.5 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] shadow-md space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                <span className="flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-mint)]" />
                  Cohort Mastery Trajectory
                </span>
                <span className="text-[var(--accent-mint)] font-bold">+18.4% this week</span>
              </div>

              {/* Multi-Color Wave Curve Lines */}
              <div className="w-full h-14 flex items-center justify-center">
                <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible select-none">
                  <line x1="0" y1="52" x2="200" y2="52" stroke="var(--border-main)" strokeWidth="0.8" />
                  <line x1="0" y1="28" x2="200" y2="28" stroke="var(--border-subtle)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Wave Lines */}
                  <path d="M 0 52 Q 60 52 100 12 Q 140 52 200 52" fill="none" stroke="#059669" className="dark:stroke-[#80FFDB]" strokeWidth="2.5" />
                  <path d="M 0 52 Q 60 52 100 20 Q 140 52 200 52" fill="none" stroke="#0096C7" className="dark:stroke-[#4CC9F0]" strokeWidth="2" opacity="0.9" />
                  <path d="M 0 52 Q 60 52 100 28 Q 140 52 200 52" fill="none" stroke="#3A56D4" className="dark:stroke-[#4361EE]" strokeWidth="1.8" opacity="0.8" />
                  <path d="M 0 52 Q 60 52 100 36 Q 140 52 200 52" fill="none" stroke="#7209B7" strokeWidth="1.8" opacity="0.7" />
                  <path d="M 0 52 Q 60 52 100 44 Q 140 52 200 52" fill="none" stroke="#D81B60" className="dark:stroke-[#F72585]" strokeWidth="1.5" opacity="0.6" />

                  <circle cx="100" cy="12" r="3" fill="#059669" className="dark:fill-[#80FFDB]" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)] pt-0.5">
                <span>Prior: 0.20</span>
                <span>Active Tracing</span>
                <span className="text-[var(--accent-mint)] font-bold">Mastery: 0.94</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3 CORE CURRICULUM DISCIPLINES
         ========================================================================= */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              Curriculum Disciplines
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Sequential prerequisite pathways designed for continuous comprehension
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">3 Supported Domains</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-md ${getSubjectCardBorder(
                category.id
              )}`}
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl border border-[var(--border-main)] bg-[var(--bg-main)] flex items-center justify-center shadow-xs">
                    {getSubjectIcon(category.id)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-secondary)] font-semibold">
                    {category.branches.length} Curricula
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed font-sans">
                    {category.description}
                  </p>
                </div>

                {/* Subtopic Branch Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Supported Pathways:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => onSelectBranch(category.id, branch.id)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--accent-primary)] hover:text-white border border-[var(--border-main)] text-[var(--text-secondary)] transition-all"
                      >
                        {branch.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectCategory(category.id)}
                className="w-full py-2.5 rounded-xl border border-[var(--border-main)] hover:border-[var(--accent-primary)] bg-[var(--bg-main)] hover:bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all group"
              >
                <span>Explore {category.name} Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
