import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  ChevronRight,
  Search,
  BookOpen,
  Sparkles,
  Clock,
  Compass,
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
  const currentBranch = ALL_BRANCHES.find((b) => b.id === selectedBranch) || ALL_BRANCHES.find((b) => b.subjectId === selectedSubject)!;

  // Selected Chapter / Active Preview
  const [activeChapterId, setActiveChapterId] = useState<string>(
    currentBranch.chapters[0]?.id || ''
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Breadcrumbs (Matching Reference Screen 2) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-main)] pb-4">
        <div>
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
            {subjectMeta.name} Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Build your foundation. Explore deeper. Master each concept sequentially.
          </p>
        </div>

        {/* Search within Subject */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Search within ${subjectMeta.name}...`}
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
          />
        </div>
      </div>

      {/* Branch Selection Pills (e.g. All, Python, C, C++ or Functions, Algebra, Calculus) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mr-1">
          Branch:
        </span>
        {subjectMeta.branches.map((branch) => {
          const isSelected = branch.id === currentBranch.id;
          return (
            <button
              key={branch.id}
              onClick={() => {
                onSelectBranch(branch.id);
                const targetBranch = ALL_BRANCHES.find((b) => b.id === branch.id);
                if (targetBranch && targetBranch.chapters.length > 0) {
                  setActiveChapterId(targetBranch.chapters[0].id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-xs'
                  : 'bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]'
              }`}
            >
              <span>{branch.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}`}>
                {branch.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Roadmap Grid (Screen 2: Timeline + Chapter Accordion + Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sequential Chapter Flowchart (7 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>{currentBranch.name} Learning Path</span>
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {currentBranch.chapters.length} Chapters
            </span>
          </div>

          {/* Sequential Chapter Roadmap Timeline */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[var(--border-main)]">
            {currentBranch.chapters.map((chapter, cIdx) => {
              const isChapterActive = chapter.id === activeChapterId;
              const hasTopics = chapter.topics.length > 0;

              return (
                <div key={chapter.id} className="relative pl-10 space-y-3">
                  {/* Timeline Node Circle */}
                  <div
                    className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-[var(--bg-surface)] ${
                      hasTopics
                        ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/10'
                        : 'border-[var(--border-main)] text-[var(--text-muted)]'
                    }`}
                  />

                  {/* Chapter Header Card */}
                  <div
                    onClick={() => setActiveChapterId(chapter.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChapterActive
                        ? 'bg-[var(--bg-secondary)] border-[var(--accent-primary)] shadow-xs'
                        : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-main)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                          Chapter 0{chapter.order}
                        </span>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          {chapter.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {chapter.description}
                      </p>
                    </div>

                    <span className="text-xs text-[var(--text-muted)] font-mono whitespace-nowrap ml-4">
                      {chapter.topics.length > 0 ? `${chapter.topics.length} topics` : 'Roadmap node'}
                    </span>
                  </div>

                  {/* Nested Topics Flow (Directly matching Screen 2 in Reference!) */}
                  {chapter.topics.length > 0 && (
                    <div className="space-y-2 pt-1 pl-2">
                      {chapter.topics.map((topic) => {
                        const rec = masteryRecords[topic.id];
                        const isMastered = rec && rec.pMastery >= 0.85;
                        const isStudied = rec && rec.totalAttempts > 0;

                        return (
                          <div
                            key={topic.id}
                            onClick={() => onSelectTopic(topic.id)}
                            className="p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              {/* Status Check / Node indicator */}
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                {isMastered ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : (
                                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                                )}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                  {topic.title}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {topic.estimatedMinutes} min
                                  </span>
                                  <span>•</span>
                                  <span>{topic.subtopics.slice(0, 2).join(', ')}</span>
                                </div>
                              </div>
                            </div>

                            <button className="px-3 py-1 rounded-lg bg-[var(--accent-primary)] text-white text-xs font-semibold flex items-center gap-1 group-hover:opacity-90 transition-opacity">
                              <span>Learn</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Lesson Spotlight / Info Panel (Screen 2 reference right card) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 shadow-xs space-y-4 sticky top-24">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
            <span>Recommended Next Lesson</span>
          </div>

          {currentBranch.chapters.some((c) => c.topics.length > 0) ? (
            (() => {
              const activeTopic = currentBranch.chapters.flatMap((c) => c.topics)[0];
              const rec = masteryRecords[activeTopic.id];
              const pct = rec ? Math.round(rec.pMastery * 100) : 20;

              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {activeTopic.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                      {activeTopic.subtitle}
                    </p>
                  </div>

                  {/* Mastery Indicator */}
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--text-primary)]">BKT Mastery Estimate</span>
                      <span className="font-mono font-bold text-[var(--accent-primary)]">{pct}%</span>
                    </div>
                    <div className="w-full bg-[var(--border-main)] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {activeTopic.prerequisites && (
                    <div className="text-xs space-y-1">
                      <span className="text-[11px] text-[var(--text-muted)] font-mono block">PREREQUISITES:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeTopic.prerequisites.map((p, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectTopic(activeTopic.id)}
                    className="w-full py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <span>Start This Lesson</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })()
          ) : (
            <div className="p-6 text-center text-xs text-[var(--text-muted)] space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-[var(--text-muted)]" />
              <p>Select a chapter on the left to inspect its learning objectives.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
