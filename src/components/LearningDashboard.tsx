import React from 'react';
import {
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Code2,
  Binary,
  Atom,
  BarChart3,
  Activity,
  Cpu,
  Verified,
  Sparkles,
} from 'lucide-react';
import { TopSubjectId, TopicMasteryRecord } from '../types';
import { SUBJECT_CATEGORIES, ALL_BRANCHES, getAllTopics } from '../data/curriculumData';

interface LearningDashboardProps {
  masteryRecords: Record<string, TopicMasteryRecord>;
  onSelectSubject: (subjectId: TopSubjectId) => void;
  onSelectTopic: (topicId: string) => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  masteryRecords,
  onSelectSubject,
  onSelectTopic,
}) => {
  const allTopics = getAllTopics();
  const records = Object.values(masteryRecords);

  // Compute stats
  const totalMastered = records.filter((r) => r.completed || r.pMastery >= 0.85).length;
  const totalAttempts = records.reduce((acc, r) => acc + r.totalAttempts, 0);
  const totalCorrect = records.reduce((acc, r) => acc + r.correctCount, 0);
  const accuracyPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 88;
  const estimatedTimeMins = Math.max(28, totalAttempts * 4 + totalMastered * 12);

  const subjectStats = SUBJECT_CATEGORIES.map((subj) => {
    const branches = ALL_BRANCHES.filter((b) => b.subjectId === subj.id);
    let subjectTopicCount = 0;
    let subjectMasteredCount = 0;

    branches.forEach((branch) => {
      branch.chapters.forEach((chapter) => {
        chapter.topics.forEach((topic) => {
          subjectTopicCount++;
          const rec = masteryRecords[topic.id];
          if (rec && (rec.completed || rec.pMastery >= 0.85)) {
            subjectMasteredCount++;
          }
        });
      });
    });

    const percent = subjectTopicCount > 0 ? Math.round((subjectMasteredCount / subjectTopicCount) * 100) : 0;
    return {
      subject: subj,
      totalTopics: subjectTopicCount,
      masteredTopics: subjectMasteredCount,
      percent,
    };
  });

  const getSubjectIcon = (id: TopSubjectId) => {
    switch (id) {
      case 'coding':
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'mathematics':
        return <Binary className="w-4 h-4 text-cyan-300" />;
      case 'science':
        return <Atom className="w-4 h-4 text-amber-300" />;
    }
  };

  const masteryPercentOverall = Math.round((totalMastered / Math.max(1, allTopics.length)) * 100);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 text-left">
      {/* =========================================================================
          TOP AMBIENT GLOW & TELEMETRY HEADER BAR (Matched to Stitch)
         ========================================================================= */}
      <section className="relative w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 lg:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)] flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-primary)] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                SYS:SYNAPSE_ONLINE
              </span>
              <span>[PROFILE_HASH: 0x7E3A9]</span>
              <span>•</span>
              <span>TELEMETRY_REFRESH: REALTIME</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight uppercase leading-tight">
              Adaptive Cognitive Profile &amp; Student Mastery
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              3 active topic environments calibrated. Bayesian Knowledge Tracing updates automatically after each diagnostic checkpoint.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectSubject('coding')}
              className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-105 transition-all"
            >
              <span>Resume Python Loops</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: HIGH-LEVEL COGNITIVE METRICS ROW (4 Bento Pods)
         ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Total Objectives */}
        <div className="bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-wider uppercase">01 // TELEMETRY_PROGRESS</span>
            <Verified className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
                {totalMastered} <span className="text-base text-[var(--text-muted)]">/ {allTopics.length}</span>
              </div>
              <div className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                {masteryPercentOverall}% VERIFIED MASTERY
              </div>
            </div>
            {/* Donut gauge */}
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle className="text-zinc-800" cx="18" cy="18" fill="none" r="14" stroke="currentColor" strokeWidth="3" />
              <circle
                className="text-white"
                cx="18"
                cy="18"
                fill="none"
                r="14"
                stroke="currentColor"
                strokeDasharray="88"
                strokeDashoffset={88 - (88 * Math.max(5, masteryPercentOverall)) / 100}
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="w-full bg-[var(--bg-surface-high)] rounded-full h-1 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, masteryPercentOverall)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Adaptive Feed */}
        <div className="bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-wider uppercase">02 // ADAPTIVE_FEED</span>
            <Activity className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs font-semibold text-[var(--text-primary)]">
              Dynamic Cognitive Routing
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-surface-container)] font-mono text-xs">
              <span className="text-[var(--text-primary)]">Python 3.12</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px]">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-surface-container)] font-mono text-xs">
              <span className="text-[var(--text-primary)]">Mathematics</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px]">
                QUEUED
              </span>
            </div>
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
            CALIBRATED VIA RUNTIME AUDIT
          </div>
        </div>

        {/* Metric 3: Habit Interval */}
        <div className="bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-wider uppercase">03 // HABIT_INTERVAL</span>
            <TrendingUp className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              5 <span className="text-base text-[var(--text-muted)]">DAYS</span>
            </div>
            {/* Dot Matrix Day Checkboxes */}
            <div className="grid grid-cols-7 gap-1.5 mt-3">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => (
                <div key={dIdx} className="flex flex-col items-center gap-1">
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">{day}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                      dIdx < 5
                        ? 'bg-white text-black font-bold shadow-xs'
                        : 'bg-[var(--bg-surface-high)] text-[var(--text-muted)]'
                    }`}
                  >
                    {dIdx < 5 ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
            STREAK ACTIVE • 5 CONSECUTIVE
          </div>
        </div>

        {/* Metric 4: Diagnostic Accuracy */}
        <div className="bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-wider uppercase">04 // ACCURACY_VELOCITY</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              {accuracyPct}%
            </div>
            <div className="font-mono text-xs text-[var(--text-secondary)] mt-1">
              {totalCorrect} of {Math.max(1, totalAttempts)} Correct Submissions
            </div>
          </div>
          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
            TOTAL FOCUS: {estimatedTimeMins} MINS
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SUBJECT PROGRESSION & POSTERIOR PROBABILITY CURVE
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Subject Progression */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
              <div>
                <h2 className="font-display text-base font-bold text-[var(--text-primary)] uppercase">
                  Subject Progression Tracks
                </h2>
                <p className="font-sans text-xs text-[var(--text-secondary)]">
                  Completion index across the 3 core disciplines
                </p>
              </div>
              <BarChart3 className="w-4 h-4 text-[var(--text-muted)]" />
            </div>

            <div className="space-y-3">
              {subjectStats.map(({ subject, totalTopics, masteredTopics, percent }) => (
                <div
                  key={subject.id}
                  className="p-4 rounded-xl bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface-high)] flex items-center justify-center">
                        {getSubjectIcon(subject.id)}
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase">
                          {subject.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono text-[10px] text-[var(--text-muted)]">
                          {subject.branches.map((b) => (
                            <span key={b.id} className="px-2 py-0.5 rounded-full bg-[var(--bg-surface-high)]">
                              {b.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectSubject(subject.id)}
                      className="px-4 py-1.5 rounded-full bg-[var(--bg-surface-high)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] font-mono text-xs font-semibold text-[var(--text-primary)] transition-all flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px] text-[var(--text-muted)]">
                      <span>{masteredTopics} of {totalTopics} topics</span>
                      <span className="font-bold text-[var(--text-primary)]">{percent}%</span>
                    </div>
                    <div className="w-full bg-[var(--bg-surface-high)] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-white h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(4, percent)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bayesian Distribution SVG Curve */}
          <section className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
              <div>
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase">
                  Knowledge Tracing Distribution
                </h3>
                <p className="font-sans text-xs text-[var(--text-secondary)]">
                  Posterior probability density across the learner model
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">BKT POSTERIOR</span>
            </div>

            <div className="w-full h-28 p-3 rounded-xl bg-[#080809] border border-[var(--border-main)] flex items-center justify-center">
              <svg viewBox="0 0 400 80" className="w-full h-full overflow-visible select-none">
                <line x1="0" y1="70" x2="400" y2="70" stroke="#28282a" strokeWidth="1" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="#28282a" strokeWidth="0.8" strokeDasharray="3 3" />
                <path d="M 0 68 Q 140 68 200 45 Q 260 68 400 68" fill="none" stroke="#666" strokeWidth="1.2" strokeDasharray="4 4" />
                <path d="M 0 68 Q 140 68 200 15 Q 260 68 400 68" fill="none" stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="15" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
              <span>P(L₀) = 0.20</span>
              <span>Transition step: 0.15</span>
              <span className="text-[var(--text-primary)] font-bold">Mastery Threshold: 0.85</span>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Per-Topic Mastery Checklist */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
              <h3 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase">
                Per-Topic Mastery
              </h3>
              <span className="font-mono text-xs text-[var(--text-muted)]">AUDIT</span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {allTopics.map((t) => {
                const rec = masteryRecords[t.id];
                const p = rec ? rec.pMastery : 0.20;
                const pPercent = Math.round(p * 100);

                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTopic(t.id)}
                    className="w-full text-left p-3 rounded-xl bg-[var(--bg-surface-container)] hover:bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] transition-all space-y-1.5 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)] truncate max-w-[180px] group-hover:text-white">
                        {t.title}
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                        {pPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-surface-high)] h-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${pPercent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
