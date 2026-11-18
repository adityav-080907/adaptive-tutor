import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Award,
  Zap,
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
  const pct = record ? Math.round(record.pMastery * 100) : 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-8 animate-fadeIn">
      {/* Top Congratulatory Icon & Header (Screen 5 Reference) */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          Great job!
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-sans">
          You've completed the conceptual foundation for: <strong className="text-[var(--text-primary)]">{topic.title}</strong>
        </p>
      </div>

      {/* Quick Summary Card (Matching Reference Screen 5) */}
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 shadow-xs text-left space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
          <span>Quick Summary</span>
        </div>
        <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
          {topic.lesson.recap.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance & Mastery Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-4 shadow-xs">
          <span className="text-[11px] text-[var(--text-muted)] block mb-1">Performance</span>
          <span className="text-lg font-bold text-[var(--text-primary)] font-mono">
            {record?.correctCount || 1}/{record?.totalAttempts || 1}
          </span>
          <span className="text-[10px] text-emerald-500 block">Mastery Check</span>
        </div>

        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-4 shadow-xs">
          <span className="text-[11px] text-[var(--text-muted)] block mb-1">BKT Mastery</span>
          <span className="text-lg font-bold text-[var(--accent-primary)] font-mono">{pct}%</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Prob. of Knowing</span>
        </div>

        <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-4 shadow-xs">
          <span className="text-[11px] text-[var(--text-muted)] block mb-1">Learning XP</span>
          <span className="text-lg font-bold text-[var(--accent-amber)] font-mono">+10 XP</span>
          <span className="text-[10px] text-emerald-500 block flex items-center justify-center gap-0.5">
            <Zap className="w-3 h-3" /> Level Up
          </span>
        </div>
      </div>

      {/* What Would You Like to Do Next? (3 Actions from Screen 5 Reference) */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          What would you like to do next?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Action 1: Move to Questions */}
          <button
            onClick={onProceedToQuestions}
            className="p-4 rounded-2xl border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white hover:opacity-90 transition-all text-center space-y-1 shadow-sm"
          >
            <span className="text-xs font-bold block">Start Questions</span>
            <span className="text-[11px] opacity-80 block">Adaptive Assessment</span>
          </button>

          {/* Action 2: Revisit Topic */}
          <button
            onClick={onRevisitTopic}
            className="p-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all text-center space-y-1 shadow-xs"
          >
            <span className="text-xs font-bold block">Revisit Topic</span>
            <span className="text-[11px] text-[var(--text-muted)] block">Try a different style</span>
          </button>

          {/* Action 3: Next Topic */}
          <button
            onClick={onNextTopic}
            className="p-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all text-center space-y-1 shadow-xs"
          >
            <span className="text-xs font-bold block">Next Topic</span>
            <span className="text-[11px] text-[var(--text-muted)] block">Advance on Roadmap</span>
          </button>
        </div>
      </div>

      {/* Back to Roadmap Link */}
      <div className="pt-2">
        <button
          onClick={onBackToRoadmap}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Roadmap</span>
        </button>
      </div>
    </div>
  );
};
