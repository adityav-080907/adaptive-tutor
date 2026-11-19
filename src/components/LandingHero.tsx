import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Code2,
  Binary,
  Atom,
  ChevronRight,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Target,
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
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'mathematics':
        return <Binary className="w-5 h-5 text-cyan-300" />;
      case 'science':
        return <Atom className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12">
      {/* Ambient Atmospheric Specular Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[840px] h-[340px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* =========================================================================
          HERO SECTION: INTELLIGENCE DESIGNED TO EVOLVE (Obsidian Cybernetics)
         ========================================================================= */}
      <section className="relative z-10 flex flex-col items-center text-center gap-6 pt-4 pb-8">
        {/* Telemetry Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-hairline)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="font-mono text-xs text-[var(--text-primary)] tracking-wider uppercase font-semibold">
            Adaptive Neural Curriculum v3.4
          </span>
          <span className="text-[var(--text-muted)] font-mono text-[11px]">
            • LATENCY 8ms
          </span>
        </div>

        {/* Primary Display Headline */}
        <div className="space-y-2 max-w-4xl">
          <div className="font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase flex items-center justify-center gap-2">
            <span className="text-[var(--text-primary)] font-bold">[SYS//CATALOG_ROOT]</span>
            <span>:: COGNITIVE ROUTER ENGAGED</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] uppercase leading-[1.08]">
            Intelligence
            <br />
            <span className="text-[var(--text-secondary)]">Designed to Evolve.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto pt-2 leading-relaxed">
            Mastery-based adaptive education powered by Bayesian Knowledge Tracing, real-time cognitive modeling, algorithmic difficulty steering, and live verification.
          </p>
        </div>

        {/* Command Search Dock & Primary Capsule CTA */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 pt-2">
          {/* Terminal Search Input */}
          <div className="relative flex-1 w-full">
            <div className="relative flex items-center group">
              <span className="absolute left-4 font-mono text-sm text-[var(--text-muted)] font-bold">
                &gt;
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, modules, or formulas..."
                className="w-full bg-[var(--bg-surface-low)] border border-[var(--border-hairline)] focus:border-[var(--text-primary)] rounded-full pl-9 pr-12 py-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] focus:outline-none transition-all font-mono"
              />
              <button
                onClick={() => {
                  if (searchResults.length > 0) onSelectTopic(searchResults[0].id);
                }}
                className="absolute right-2.5 p-2 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] transition-all"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-surface-low)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl overflow-hidden z-30 text-left divide-y divide-[var(--border-subtle)]">
                {searchResults.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t.id);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-3 hover:bg-[var(--bg-surface-high)] flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-white font-mono">
                        {t.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] truncate max-w-md font-sans">
                        {t.subtitle}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-white" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => onSelectCategory('coding')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Brand Medallion Accent */}
        <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-subtle)]">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--border-hairline)]">
            <img src={airavataLogo} alt="Airavata" className="w-full h-full object-cover" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
            AIRAVATA // Autonomous Cognitive Progression Architecture
          </span>
        </div>
      </section>

      {/* =========================================================================
          STATS / TELEMETRY ROW (Matched to intelligence_designed_to_evolve_1)
         ========================================================================= */}
      <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl">
        <div className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center text-[var(--text-primary)] flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-lg font-bold text-[var(--text-primary)]">3 Disciplines</span>
            <span className="font-sans text-[11px] text-[var(--text-muted)]">Python, Math, Science</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center text-[var(--text-primary)] flex-shrink-0">
            <Cpu className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-lg font-bold text-[var(--text-primary)]">BKT Engine</span>
            <span className="font-sans text-[11px] text-[var(--text-muted)]">Realtime Tracing</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center text-[var(--text-primary)] flex-shrink-0">
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-lg font-bold text-[var(--text-primary)]">Zero Guessing</span>
            <span className="font-sans text-[11px] text-[var(--text-muted)]">Misconception Traps</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center text-[var(--text-primary)] flex-shrink-0">
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-lg font-bold text-[var(--text-primary)]">Adaptive Steps</span>
            <span className="font-sans text-[11px] text-[var(--text-muted)]">Dynamic Scaffolding</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CURRICULUM DISCIPLINES (Obsidian Cybernetics Catalog Grid)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              // LEVEL 01 - CURRICULUM CATALOG
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Sequential Subject Tracks
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            3 ACTIVE DOMAINS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] hover:border-[var(--border-hairline)] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] group"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {getSubjectIcon(category.id)}
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[var(--bg-surface-high)] border border-[var(--border-main)] text-[var(--text-secondary)] uppercase tracking-wider">
                    {category.branches.length} Tracks
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide">
                    {category.name}
                  </h3>
                  <p className="font-sans text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Subtopic Branch Chips */}
                <div className="space-y-2 pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                    Curriculum Pathways:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => onSelectBranch(category.id, branch.id)}
                        className="font-mono text-[11px] px-3 py-1 rounded-full bg-[var(--bg-surface-high)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-all"
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
                className="w-full py-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface-high)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] font-mono text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
              >
                <span>Enter {category.name} Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
