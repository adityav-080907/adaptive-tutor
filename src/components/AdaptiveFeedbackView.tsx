import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Timer,
  Verified,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Topic, TopicMasteryRecord } from '../types';

interface AdaptiveFeedbackViewProps {
  topic: Topic;
  onProceedToQuestions: () => void;
  onRevisitTopic: () => void;
  onNextTopic: () => void;
  onBackToRoadmap: () => void;
  record?: TopicMasteryRecord;
}

export const AdaptiveFeedbackView: React.FC<AdaptiveFeedbackViewProps> = ({
  topic,
  onProceedToQuestions,
  onRevisitTopic,
  onNextTopic,
  onBackToRoadmap,
  record,
}) => {
  const pct = record ? Math.round(record.pMastery * 100) : 92;
  const attempts = record?.totalAttempts || 4;
  const correct = record?.correctCount || 4;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 text-left">
      {/* =========================================================================
          TOP RETRO TERMINAL DEBRIEF BANNER (Matched to Stitch)
         ========================================================================= */}
      <section className="flex flex-col gap-4 pb-4 border-b border-[var(--border-main)]">
        {/* Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            <span className="tracking-widest uppercase text-[var(--text-primary)] font-bold">
              SYNAPSE_DEBRIEF // SESSION_ID: #{topic.id.slice(-6).toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-primary)] font-semibold">
              <Verified className="w-3.5 h-3.5 text-emerald-400" />
              <span>OBJECTIVE VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase">
            <span>CURRICULUM MODULE</span>
            <span>&gt;</span>
            <span className="text-[var(--text-primary)] font-bold">{topic.title.toUpperCase()}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
            Topic Session Complete
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            The adaptive engine calculated your fluency probability at{' '}
            <span className="text-[var(--text-primary)] font-bold underline underline-offset-4">
              {pct}%
            </span>
            . You have demonstrated conceptual foundation and cleared the diagnostic threshold.
          </p>
        </div>
      </section>

      {/* =========================================================================
          4 STAT CARDS BENTO GRID (Session Metrics Overview)
         ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Resolution */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-widest uppercase">STAT_01 // RESOLUTION</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              {correct} <span className="text-base text-[var(--text-muted)]">/ {attempts}</span>
            </div>
            <div className="font-sans text-xs text-[var(--text-secondary)] mt-1">Objectives Cleared</div>
          </div>
          <div className="w-full bg-[var(--bg-surface-high)] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((correct / Math.max(1, attempts)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Scaffolding */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-widest uppercase">STAT_02 // SCAFFOLDING</span>
            <BookOpen className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              1 Card
            </div>
            <div className="font-sans text-xs text-[var(--text-secondary)] mt-1">Concept Model Referenced</div>
          </div>
          <div className="w-full bg-[var(--bg-surface-high)] rounded-full h-1.5 overflow-hidden">
            <div className="bg-white h-full rounded-full w-full" />
          </div>
        </div>

        {/* Stat 3: BKT Mastery */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-widest uppercase">STAT_03 // BKT MASTERY</span>
            <Verified className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              {pct}%
            </div>
            <div className="font-sans text-xs text-[var(--text-secondary)] mt-1">Probability of Knowing</div>
          </div>
          <div className="w-full bg-[var(--bg-surface-high)] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Stat 4: Estimated Focus Time */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] shadow-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
            <span className="tracking-widest uppercase">STAT_04 // EFFORT</span>
            <Timer className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text-primary)]">
              {topic.estimatedMinutes} min
            </div>
            <div className="font-sans text-xs text-[var(--text-secondary)] mt-1">Focused Learning Time</div>
          </div>
          <div className="w-full bg-[var(--bg-surface-high)] rounded-full h-1.5 overflow-hidden">
            <div className="bg-white h-full rounded-full w-4/5" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY TAKEAWAYS & SUMMARY CARD
         ========================================================================= */}
      <section className="rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 lg:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-main)]">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h2 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Cognitive Retrospective &amp; Core Takeaways
          </h2>
        </div>

        <ul className="space-y-3 font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
          {topic.lesson.recap.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="font-mono text-emerald-400 font-bold mt-0.5">✓</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* =========================================================================
          ACTIONS & NAVIGATION DOCK
         ========================================================================= */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-main)]">
        <button
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Curriculum Roadmap</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRevisitTopic}
            className="px-5 py-2.5 rounded-full bg-[var(--bg-surface-high)] border border-[var(--border-hairline)] hover:border-white text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Review Lesson</span>
          </button>

          <button
            onClick={onProceedToQuestions}
            className="px-5 py-2.5 rounded-full bg-[var(--bg-surface-high)] border border-[var(--border-hairline)] hover:border-white text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <span>Retest Diagnostic</span>
          </button>

          <button
            onClick={onNextTopic}
            className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-105 transition-all"
          >
            <span>Next Topic In Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
