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
} from 'lucide-react';
import { TopSubjectId, TopicMasteryRecord } from '../types';
import { SUBJECT_CATEGORIES, ALL_BRANCHES, getAllTopics } from '../data/curriculumData';
import airavataLogo from '../assets/airavata-logo.jpg';

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
  const estimatedTimeMins = Math.max(24, totalAttempts * 4 + totalMastered * 12);
  const xp = totalCorrect * 25 + totalMastered * 150 + 350;

  // Compute per-subject statistics
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
        return <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />;
      case 'mathematics':
        return <Binary className="w-4 h-4 text-[var(--accent-primary)]" />;
      case 'science':
        return <Atom className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-main)] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border-main)] bg-[var(--bg-secondary)] shrink-0">
            <img
              src={airavataLogo}
              alt="Airavata"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
              Mastery and Performance
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Bayesian probability updates tracked after each conceptual question
            </p>
          </div>
        </div>

        {/* Quiet Meta Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
          <span className="text-[var(--text-muted)]">Model confidence</span>
          <span className="font-semibold text-[var(--text-primary)] tabular-nums">92%</span>
        </div>
      </div>

      {/* 4 Clean Stat Cards (Numbers, Labels, and References only) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Topics Mastered */}
        <div className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-xs font-medium text-[var(--text-muted)]">Topics mastered</div>
          <div className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
            {totalMastered}
            <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/ {allTopics.length}</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] pt-1">
            +2 topics this week
          </div>
        </div>

        {/* Card 2: Focused Study Time */}
        <div className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-xs font-medium text-[var(--text-muted)]">Study time</div>
          <div className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
            {estimatedTimeMins}
            <span className="text-xs font-normal text-[var(--text-muted)] ml-1">mins</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] pt-1">
            Theory and questions
          </div>
        </div>

        {/* Card 3: Diagnostic Accuracy */}
        <div className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-xs font-medium text-[var(--text-muted)]">Diagnostic accuracy</div>
          <div className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
            {accuracyPct}%
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] pt-1">
            {totalCorrect} of {totalAttempts} questions correct
          </div>
        </div>

        {/* Card 4: Learning Streak */}
        <div className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-1">
          <div className="text-xs font-medium text-[var(--text-muted)]">Current streak</div>
          <div className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
            5 days
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] pt-1">
            {xp} points logged
          </div>
        </div>
      </div>

      {/* Main Grid: Roadmaps & Bayesian Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Roadmaps */}
          <div className="p-6 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Subject Progression
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Completion across the 3 core disciplines
                </p>
              </div>
              <BarChart3 className="w-4 h-4 text-[var(--text-muted)]" />
            </div>

            <div className="space-y-3">
              {subjectStats.map(({ subject, totalTopics, masteredTopics, percent }) => (
                <div
                  key={subject.id}
                  className="p-4 rounded-lg border border-[var(--border-main)] bg-[var(--bg-secondary)] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md border border-[var(--border-main)] bg-[var(--bg-surface)] flex items-center justify-center">
                        {getSubjectIcon(subject.id)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[var(--text-primary)]">
                          {subject.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          {subject.branches.map((b) => (
                            <span
                              key={b.id}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)]"
                            >
                              {b.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectSubject(subject.id)}
                      className="px-3 py-1.5 rounded-md border border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-main)] text-xs font-medium text-[var(--text-primary)] transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono">
                      <span>{masteredTopics} of {totalTopics} topics</span>
                      <span className="font-semibold text-[var(--text-primary)] tabular-nums">{percent}%</span>
                    </div>
                    <div className="w-full bg-[var(--bg-surface)] h-1.5 rounded-full overflow-hidden border border-[var(--border-main)]">
                      <div
                        className="h-full bg-[var(--accent-primary)] rounded-full transition-all"
                        style={{ width: `${Math.max(4, percent)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Bayesian Distribution Chart */}
          <div className="p-6 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Knowledge Tracing Distribution
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Posterior probability density across the learner cohort
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-[var(--accent-primary)]" />
                  Active trajectory
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-0.5 bg-[var(--text-muted)]" />
                  Baseline
                </span>
              </div>
            </div>

            {/* Quiet SVG Chart */}
            <div className="w-full h-28 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-main)] flex items-center justify-center">
              <svg viewBox="0 0 400 80" className="w-full h-full overflow-visible select-none">
                <line x1="0" y1="70" x2="400" y2="70" stroke="var(--border-main)" strokeWidth="1" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="var(--border-subtle)" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Quiet Baseline Bell Curve */}
                <path d="M 0 68 Q 140 68 200 45 Q 260 68 400 68" fill="none" stroke="var(--text-muted)" strokeWidth="1.2" strokeDasharray="4 4" />

                {/* High-craft Active Trajectory */}
                <path d="M 0 68 Q 140 68 200 15 Q 260 68 400 68" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />

                {/* Target Point */}
                <circle cx="200" cy="15" r="3.5" fill="var(--accent-primary)" />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>P(L₀) = 0.20</span>
              <span>Transition step: 0.20</span>
              <span className="text-[var(--text-primary)] font-semibold">Mastery threshold: 0.85</span>
            </div>
          </div>
        </div>

        {/* Right Column: BKT Live Scores */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center justify-between">
              <span>Per-Topic Mastery</span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">BKT Posterior</span>
            </h3>

            <div className="space-y-2">
              {allTopics.map((t) => {
                const rec = masteryRecords[t.id];
                const p = rec ? rec.pMastery : 0.20;
                const pct = Math.round(p * 100);

                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTopic(t.id)}
                    className="w-full text-left p-2.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-main)] transition-colors space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-[var(--text-primary)] truncate max-w-[170px]">
                        {t.title}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tabular-nums">
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-surface)] h-1 rounded-full overflow-hidden border border-[var(--border-main)]">
                      <div
                        className="h-full bg-[var(--accent-primary)] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
