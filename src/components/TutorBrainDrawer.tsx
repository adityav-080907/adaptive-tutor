import React from 'react';
import {
  Brain,
  Activity,
  AlertTriangle,
  Compass,
  Cpu,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { TopicMasteryRecord, DecisionLog } from '../types';
import { getAllTopics } from '../data/curriculumData';
import { DEFAULT_BKT_PARAMS, MASTERY_THRESHOLD } from '../engine/bktEngine';

interface TutorBrainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  masteryRecords: Record<string, TopicMasteryRecord>;
  logs: DecisionLog[];
  activeTopicId: string;
  onReset: () => void;
  onSimulateStruggling: () => void;
  onSimulateMastery: () => void;
}

export const TutorBrainDrawer: React.FC<TutorBrainDrawerProps> = ({
  isOpen,
  onClose,
  masteryRecords,
  logs,
  activeTopicId,
  onReset,
  onSimulateStruggling,
  onSimulateMastery,
}) => {
  if (!isOpen) return null;

  const allTopics = getAllTopics();
  const activeRecord = masteryRecords[activeTopicId];
  const activeTopic = allTopics.find((t) => t.id === activeTopicId) || allTopics[0];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[var(--bg-surface)] border-l border-[var(--border-main)] shadow-2xl z-50 flex flex-col overflow-hidden text-[var(--text-primary)] transition-colors">
      {/* Top Header */}
      <div className="p-4 bg-[var(--bg-main)] border-b border-[var(--border-main)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              Tutor Brain Inspector
              <span className="text-[10px] bg-indigo-900/40 border border-indigo-700/60 text-indigo-400 px-1.5 py-0.5 rounded font-mono">
                Judge Mode
              </span>
            </h2>
            <p className="text-[11px] text-[var(--text-secondary)]">Glass-Box Bayesian Knowledge Tracing & Decision Engine</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Quick Simulation Presets for Judges */}
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-3 rounded-xl">
          <div className="text-[11px] font-semibold text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Judge Demo Shortcuts</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onSimulateStruggling}
              className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-500 font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              Simulate Misconception
            </button>
            <button
              onClick={onSimulateMastery}
              className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-500 font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              Simulate High Mastery
            </button>
          </div>
        </div>

        {/* Real-Time BKT Mastery Gauges */}
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-3.5 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Per-Topic BKT Mastery
            </span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">
              Threshold: {Math.round(MASTERY_THRESHOLD * 100)}%
            </span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {allTopics.map((topic) => {
              const record = masteryRecords[topic.id];
              const p = record ? record.pMastery : DEFAULT_BKT_PARAMS.pL0;
              const pct = Math.round(p * 100);
              const isMastered = pct >= Math.round(MASTERY_THRESHOLD * 100);
              const isActive = topic.id === activeTopicId;

              return (
                <div
                  key={topic.id}
                  className={`p-2.5 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)]'
                      : 'bg-[var(--bg-surface)]/60 border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-[var(--text-primary)] truncate max-w-[240px]">
                      {topic.title}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span
                        className={`font-bold ${
                          isMastered
                            ? 'text-emerald-500'
                            : pct < 45
                            ? 'text-rose-500'
                            : 'text-[var(--accent-primary)]'
                        }`}
                      >
                        {pct}%
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)]">
                        (P={p.toFixed(2)})
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[var(--bg-main)] h-2 rounded-full overflow-hidden border border-[var(--border-main)]">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isMastered
                          ? 'bg-emerald-500'
                          : pct < 45
                          ? 'bg-rose-500'
                          : 'bg-[var(--accent-primary)]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                    <span>Attempts: {record?.totalAttempts || 0}</span>
                    <span>Correct: {record?.correctCount || 0}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-medium uppercase tracking-wider text-[9px] ${
                        isMastered
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {isMastered ? 'Mastered' : 'Learning'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Active Strategy & Detected Misconceptions */}
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
            <Compass className="w-3.5 h-3.5 text-cyan-500" />
            <span>Active Pedagogical Strategy</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] leading-relaxed">
            {activeRecord && activeRecord.pMastery < 0.45 ? (
              <div className="text-amber-600 dark:text-amber-300 space-y-1">
                <p className="font-semibold text-amber-500">
                  ⚡ Remediation Strategy Activated
                </p>
                <p className="text-[var(--text-secondary)]">
                  Learner mastery is currently below 45%. The tutor shifts to visual set diagrams, step-by-step breakdowns, and guided hints.
                </p>
              </div>
            ) : activeRecord && activeRecord.pMastery >= MASTERY_THRESHOLD ? (
              <div className="text-emerald-600 dark:text-emerald-300 space-y-1">
                <p className="font-semibold text-emerald-500">
                  🏆 Mastery Achieved
                </p>
                <p className="text-[var(--text-secondary)]">
                  Bayesian belief exceeds 85%. Ready to advance to the next sequential chapter node in the roadmap.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-semibold text-[var(--text-primary)]">
                  🧭 Diagnostic & Discovery Mode
                </p>
                <p className="text-[var(--text-secondary)]">
                  Evaluating baseline conceptual comprehension through interactive questions and adaptive hint scaffolding.
                </p>
              </div>
            )}

            {activeRecord?.detectedMisconceptions && activeRecord.detectedMisconceptions.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] space-y-1">
                <span className="font-semibold text-rose-500 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Detected Misconceptions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeRecord.detectedMisconceptions.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-500 font-mono text-[9px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BKT Math Engine Parameters */}
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
            <Cpu className="w-3.5 h-3.5 text-purple-500" />
            <span>Mathematical Learner Model Parameters</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)] block text-[10px]">P(L0) Prior:</span>
              <span className="font-bold text-[var(--text-primary)]">{DEFAULT_BKT_PARAMS.pL0}</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)] block text-[10px]">P(T) Transit:</span>
              <span className="font-bold text-[var(--text-primary)]">{DEFAULT_BKT_PARAMS.pT}</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)] block text-[10px]">P(G) Guess:</span>
              <span className="font-bold text-[var(--text-primary)]">{DEFAULT_BKT_PARAMS.pG}</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[var(--text-secondary)] block text-[10px]">P(S) Slip:</span>
              <span className="font-bold text-[var(--text-primary)]">{DEFAULT_BKT_PARAMS.pS}</span>
            </div>
          </div>
        </div>

        {/* Real-Time Decision Logs */}
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--text-primary)]">
              Audit Decision Trace ({logs.length})
            </span>
            <button
              onClick={onReset}
              className="text-[10px] text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-[10px]">
            {logs.length === 0 ? (
              <p className="text-[var(--text-secondary)] italic">
                No question responses logged yet. Answer a question in any topic to trigger Bayesian state updates.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1"
                >
                  <div className="flex items-center justify-between text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-primary)] font-bold">{log.ruleFired}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-[var(--text-primary)] font-sans">{log.reason}</p>
                  <div className="flex items-center justify-between text-[9px] text-[var(--text-secondary)]">
                    <span>
                      BKT: {(log.bktBefore * 100).toFixed(0)}% → {(log.bktAfter * 100).toFixed(0)}%
                    </span>
                    <span>Topic: {log.topicId}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
