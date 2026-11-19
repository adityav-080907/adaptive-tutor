import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Search,
  BookOpen,
  Clock,
  Compass,
  Verified,
} from 'lucide-react';
import { TopSubjectId, BranchId, TopicMasteryRecord } from '../types';
import { SUBJECT_CATEGORIES, ALL_BRANCHES } from '../data/curriculumData';

interface SubjectRoadmapProps {
  selectedSubject: TopSubjectId;
  selectedBranch: BranchId;
  onSelectBranch: (branchId: BranchId) => void;
  onSelectTopic: (topicId: string) => void;
  onBackToHome: () => void;
  masteryRecords: Record<string, TopicMasteryRecord>;
}

export const SubjectRoadmap: React.FC<SubjectRoadmapProps> = ({
  selectedSubject,
  selectedBranch,
  onSelectBranch,
  onSelectTopic,
  onBackToHome,
  masteryRecords,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const subjectMeta = SUBJECT_CATEGORIES.find((s) => s.id === selectedSubject)!;
  const currentBranch =
    ALL_BRANCHES.find((b) => b.id === selectedBranch) ||
    ALL_BRANCHES.find((b) => b.subjectId === selectedSubject)!;

  const allBranchTopics = currentBranch.chapters.flatMap((c) => c.topics);
  const masteredCount = allBranchTopics.filter(
    (t) => masteryRecords[t.id] && masteryRecords[t.id].pMastery >= 0.85
  ).length;
  const attemptedCount = allBranchTopics.filter(
    (t) => masteryRecords[t.id] && masteryRecords[t.id].totalAttempts > 0
  ).length;

  const totalMasteryPercent =
    allBranchTopics.length > 0
      ? Math.round((masteredCount / allBranchTopics.length) * 100)
      : 0;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* =========================================================================
          SECTION 1: TOP MASTER HEADER & BLUEPRINT TELEMETRY (Matched to Stitch)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Directives, Title & Mastery Legend */}
        <div className="lg:col-span-7 flex flex-col gap-4 text-left">
          {/* Back button & Breadcrumbs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-high)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] text-[var(--text-secondary)] font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <span>LANGUAGES</span>
              <span>/</span>
              <span className="text-[var(--text-secondary)] uppercase">{currentBranch.name}</span>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-bold">CURRICULUM TOPICS</span>
            </div>

            <span className="px-3 py-0.5 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-primary)] font-mono text-[10px] uppercase tracking-wider">
              NODE 03 ACTIVE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] uppercase tracking-tight leading-tight">
            {currentBranch.name} Core Curriculum &amp; Mastery Blueprint
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Core topics structured around practical application. Each verified across 4 cognitive mastery stages from declarative intake to autonomous implementation.
          </p>

          {/* Mastery Stages Legend Bar Island */}
          <div className="mt-2 inline-flex items-center gap-4 p-2 px-3 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-md w-fit flex-wrap">
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
              STAGES:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="font-mono text-xs text-[var(--text-muted)]">00 Not Started</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs text-[var(--text-primary)]">01 Learning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="font-mono text-xs text-[var(--text-secondary)]">02 Practised</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="font-mono text-xs text-[var(--text-primary)] font-bold">03 Mastered</span>
            </div>
          </div>
        </div>

        {/* Right Column: Proficiency Telemetry Bento Card */}
        <div className="lg:col-span-5 bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col gap-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Verified className="w-4 h-4 text-[var(--text-primary)]" />
              <span className="font-mono text-[11px] tracking-widest text-[var(--text-muted)] uppercase">
                TELEMETRY // SYNC READY
              </span>
            </div>
            <span className="font-mono text-[11px] text-[var(--text-primary)] px-2 py-0.5 rounded bg-[var(--bg-surface-high)]">
              {currentBranch.badge || 'CORE'}-COGNITIVE
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                {totalMasteryPercent}%
              </div>
              <div className="font-sans text-xs text-[var(--text-secondary)] mt-0.5">
                Total Track Mastered
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-bold text-[var(--text-primary)]">
                {masteredCount} <span className="text-[var(--text-muted)] text-sm">/ {allBranchTopics.length}</span>
              </div>
              <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                Verifiable Objectives
              </div>
            </div>
          </div>

          {/* Retention Stability Gradient Curve (SVG) */}
          <div className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>RETENTION STABILITY GRADIENT</span>
              <span className="text-[var(--text-primary)] font-bold">▲ ACTIVE TRACKING</span>
            </div>
            <div className="w-full h-14 relative">
              <svg className="w-full h-full text-white" fill="none" preserveAspectRatio="none" viewBox="0 0 300 64">
                <defs>
                  <linearGradient id="gradientRetention" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,52 C30,50 60,42 90,44 C120,46 150,30 180,28 C210,26 240,16 270,12 L300,10 L300,64 L0,64 Z"
                  fill="url(#gradientRetention)"
                />
                <path
                  d="M0,52 C30,50 60,42 90,44 C120,46 150,30 180,28 C210,26 240,16 270,12 L300,10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <circle cx="180" cy="28" r="3.5" fill="#ffffff" />
                <circle cx="300" cy="10" r="3.5" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {/* Tri-Metric Telemetry Stats */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-left">
            <div className="bg-[var(--bg-surface-high)] rounded-xl p-2.5 flex flex-col">
              <span className="font-mono text-xl font-bold text-[var(--text-primary)]">
                {attemptedCount}
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase mt-0.5">
                Attempted
              </span>
            </div>
            <div className="bg-[var(--bg-surface-high)] rounded-xl p-2.5 flex flex-col">
              <span className="font-mono text-xl font-bold text-[var(--text-primary)]">
                {masteredCount}
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase mt-0.5">
                Mastered
              </span>
            </div>
            <div className="bg-[var(--bg-surface-high)] rounded-xl p-2.5 flex flex-col">
              <span className="font-mono text-xl font-bold text-amber-300">
                {attemptedCount - masteredCount > 0 ? attemptedCount - masteredCount : 0}
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase mt-0.5">
                In Review
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BRANCH SWITCHING PILLS & FILTER BAR
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        {/* Branch Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mr-1">
            Tracks:
          </span>
          {subjectMeta.branches.map((branch) => {
            const isSelected = branch.id === currentBranch.id;
            return (
              <button
                key={branch.id}
                onClick={() => onSelectBranch(branch.id)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[var(--text-primary)] text-[var(--text-on-primary)] font-bold shadow-[0_0_16px_rgba(255,255,255,0.15)]'
                    : 'bg-[var(--bg-surface-low)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)] border border-[var(--border-subtle)]'
                }`}
              >
                <span>{branch.name}</span>
                <span className="text-[10px] opacity-75">({branch.tag})</span>
              </button>
            );
          })}
        </div>

        {/* Search within curriculum */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${currentBranch.name} topics...`}
            className="w-full bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] focus:border-[var(--text-primary)] rounded-full pl-9 pr-4 py-2 font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          CHAPTERS & TOPICS MATRIX (Sequential Adaptive Syllabus)
         ========================================================================= */}
      <div className="space-y-8 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-[var(--text-primary)] uppercase">
              Core Syllabus
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              // LEVEL 01 - SEQUENTIAL FOUNDATIONS
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {currentBranch.chapters.length} CHAPTERS ACTIVE
          </span>
        </div>

        <div className="space-y-6">
          {currentBranch.chapters.map((chapter) => {
            const filteredTopics = filterQuery.trim()
              ? chapter.topics.filter(
                  (t) =>
                    t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    t.subtitle.toLowerCase().includes(filterQuery.toLowerCase())
                )
              : chapter.topics;

            if (filterQuery.trim() && filteredTopics.length === 0) return null;

            return (
              <div
                key={chapter.id}
                className="rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-4"
              >
                {/* Chapter Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-main)] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold">
                        CHAPTER 0{chapter.order}
                      </span>
                      <h2 className="font-display text-base font-bold text-[var(--text-primary)] uppercase">
                        {chapter.title}
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-[var(--text-secondary)] mt-1">
                      {chapter.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {chapter.topics.length} Objectives
                  </span>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTopics.map((topic) => {
                    const rec = masteryRecords[topic.id];
                    const isMastered = rec && rec.pMastery >= 0.85;
                    const isStarted = rec && rec.totalAttempts > 0;
                    const pVal = rec ? Math.round(rec.pMastery * 100) : 20;

                    return (
                      <div
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.id)}
                        className="p-4 rounded-xl bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] hover:border-[var(--border-hairline)] transition-all cursor-pointer flex flex-col justify-between gap-4 group hover:shadow-md"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-muted)] uppercase">
                              MODULE #{topic.id.slice(-4).toUpperCase()}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {isMastered ? (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> MASTERED
                                </span>
                              ) : isStarted ? (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-300 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" /> IN PROGRESS
                                </span>
                              ) : (
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                                  NOT STARTED
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">
                            {topic.title}
                          </h3>

                          <p className="font-sans text-xs text-[var(--text-secondary)] line-clamp-2">
                            {topic.subtitle}
                          </p>

                          <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[var(--text-muted)]">
                            <Clock className="w-3 h-3" />
                            <span>{topic.estimatedMinutes} min</span>
                            <span>•</span>
                            <span>{topic.subtopics.length} key subtopics</span>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-main)]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-[var(--text-muted)]">
                              Mastery:
                            </span>
                            <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                              {pVal}%
                            </span>
                          </div>

                          <button className="px-3 py-1 rounded-full bg-[var(--bg-surface-high)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--text-on-primary)] font-mono text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1 transition-all">
                            <span>Open Lesson</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
