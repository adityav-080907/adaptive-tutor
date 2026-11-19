import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Code2,
  Lock,
  Target,
  Sparkles,
} from 'lucide-react';
import { Topic, Question, QuestionChoice, TopicMasteryRecord } from '../types';
import { MathRenderer } from './MathRenderer';

interface AdaptiveQuestionViewProps {
  topic: Topic;
  onQuestionCompleted: (isCorrect: boolean, misconceptionId?: string) => void;
  onAllQuestionsFinished: () => void;
  onBackToLesson: () => void;
  masteryRecord?: TopicMasteryRecord;
}

export const AdaptiveQuestionView: React.FC<AdaptiveQuestionViewProps> = ({
  topic,
  onQuestionCompleted,
  onAllQuestionsFinished,
  onBackToLesson,
  masteryRecord,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{
    isCorrect: boolean;
    choice: QuestionChoice;
    reasoning: string;
  } | null>(null);

  const questions = topic.questions;
  const currentQuestion: Question | undefined = questions[currentIdx] || questions[0];

  const pct = masteryRecord ? Math.round(masteryRecord.pMastery * 100) : 20;
  const correctCount = masteryRecord?.correctCount || 0;
  const totalAnswered = masteryRecord?.totalAttempts || 0;

  const handleSelectChoice = (choice: QuestionChoice) => {
    if (isSubmitted) return;
    setSelectedChoiceId(choice.id);
  };

  const handleSubmit = () => {
    if (!selectedChoiceId || !currentQuestion || isSubmitted) return;

    const chosen = currentQuestion.choices.find((c) => c.id === selectedChoiceId);
    if (!chosen) return;

    setIsSubmitted(true);

    let reasonMsg = '';
    if (chosen.isCorrect) {
      reasonMsg = `Mastery updated to ${Math.min(99, pct + 20)}%. Verified competence on objective.`;
      if (pct >= 60) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      reasonMsg = chosen.misconceptionId
        ? `Cognitive gap detected: [${chosen.misconceptionId}]. Difficulty calibrated.`
        : `Answer incorrect. Prerequisite relation flagged for reinforcement.`;
    }

    setLastFeedback({
      isCorrect: chosen.isCorrect,
      choice: chosen,
      reasoning: reasonMsg,
    });

    onQuestionCompleted(chosen.isCorrect, chosen.misconceptionId);
  };

  const handleNext = () => {
    setSelectedChoiceId(null);
    setIsSubmitted(false);
    setShowHint(false);
    setLastFeedback(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onAllQuestionsFinished();
    }
  };

  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8 text-left">
      {/* =========================================================================
          CALIBRATION TELEMETRY TOP BAR & PROGRESS METER (Matched to Stitch)
         ========================================================================= */}
      <section className="w-full flex flex-col gap-3 pb-2 border-b border-[var(--border-main)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLesson}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-high)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)] text-[var(--text-secondary)] font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson</span>
            </button>

            <div className="px-3 py-1 rounded-full bg-[var(--bg-surface-high)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="font-mono text-xs text-[var(--text-primary)] font-bold uppercase tracking-wider">
                Calibration Phase
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--text-primary)] font-bold">
                0{currentIdx + 1} // 0{questions.length}
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase hidden sm:inline">
                • Calibrating Baseline Difficulty
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
              DIFFICULTY: <span className="text-[var(--text-primary)] font-bold uppercase">{currentQuestion.difficulty}</span>
            </span>
          </div>
        </div>

        {/* Linear Specular Progress Meter */}
        <div className="relative w-full h-1.5 bg-[var(--bg-surface-high)] rounded-full overflow-hidden mt-1">
          <div
            className="absolute top-0 left-0 h-full bg-[var(--text-primary)] shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* =========================================================================
          MAIN ASYMMETRIC WORKSPACE (Left: Task, Right: Telemetry & BKT)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Assessment Task (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Target Objective Card */}
          <div className="p-4 bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] rounded-2xl shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-surface-high)] flex items-center justify-center text-[var(--text-primary)]">
                <Target className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  Diagnostic Target #0{currentIdx + 1}
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  {topic.title} Verification
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)] px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-high)]">
              WEIGHT: 1.4x
            </span>
          </div>

          {/* Question Prompt Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                EVAL_PROMPT_ID::{topic.id.toUpperCase()}_0{currentIdx + 1}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-relaxed">
              <MathRenderer content={currentQuestion.prompt} />
            </h2>

            <p className="font-sans text-xs text-[var(--text-secondary)]">
              Evaluate the objective carefully. Identify any conceptual misconception in the distracted options.
            </p>
          </div>

          {/* Code Snippet Card (Monochrome Obsidian Well) */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-2xl bg-[#080809] border border-[var(--border-main)] p-4 shadow-xl relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="font-mono text-xs text-[var(--text-muted)] ml-2">
                    diagnostic_eval.py • read-only
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                  <Lock className="w-3 h-3" />
                  <span>RUNTIME ENVIRONMENT</span>
                </div>
              </div>

              <div className="font-mono text-xs text-[var(--text-primary)] overflow-x-auto p-2 leading-relaxed">
                <pre>{currentQuestion.codeSnippet}</pre>
              </div>
            </div>
          )}

          {/* Multiple Choice Options (Option A, B, C, D) */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block">
              Select Evaluated Output Option:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;

                let cardStyle =
                  'bg-[var(--bg-surface-low)] border-[var(--border-subtle)] hover:border-[var(--border-hairline)] text-[var(--text-primary)]';

                if (isSubmitted) {
                  if (choice.isCorrect) {
                    cardStyle =
                      'bg-emerald-950/40 border-emerald-400 text-emerald-200 font-semibold shadow-[0_0_16px_rgba(52,211,153,0.2)]';
                  } else if (isSelected && !choice.isCorrect) {
                    cardStyle =
                      'bg-rose-950/40 border-rose-400 text-rose-200 font-semibold shadow-[0_0_16px_rgba(251,113,133,0.2)]';
                  } else {
                    cardStyle =
                      'bg-[var(--bg-surface-low)] opacity-40 border-[var(--border-subtle)] text-[var(--text-muted)]';
                  }
                } else if (isSelected) {
                  cardStyle =
                    'bg-[var(--bg-surface-high)] border-white text-white shadow-[0_0_16px_rgba(255,255,255,0.15)] ring-1 ring-white/50';
                }

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    disabled={isSubmitted}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        OPTION [{choice.id.toUpperCase()}]
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-white bg-white' : 'border-zinc-600'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </div>

                    <div className="font-sans text-xs sm:text-sm leading-relaxed">
                      <MathRenderer content={choice.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hint Accordion */}
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="font-mono text-xs text-amber-300 hover:underline inline-flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Need an adaptive hint?</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-[var(--bg-surface-low)] border border-amber-400/30 text-xs text-amber-200 space-y-1">
                <div className="font-mono font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                  <span>Cognitive Hint:</span>
                </div>
                <p className="font-sans leading-relaxed">{currentQuestion.hint}</p>
              </div>
            )}
          </div>

          {/* Feedback & Reasoning Output */}
          {lastFeedback && (
            <div className="p-5 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-main)] space-y-3">
              <div className="font-mono text-xs font-bold flex items-center gap-2">
                {lastFeedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">ANSWER VERIFIED // COMPETENCE DEMONSTRATED</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-300">
                      {lastFeedback.choice.misconceptionId
                        ? `MISCONCEPTION IDENTIFIED: [${lastFeedback.choice.misconceptionId}]`
                        : 'SUBMISSION INCORRECT'}
                    </span>
                  </>
                )}
              </div>

              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                {lastFeedback.choice.explanation}
              </p>

              <div className="font-mono text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-main)]">
                🧠 Bayesian Reasoner: {lastFeedback.reasoning}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-main)]">
            <button
              onClick={handleNext}
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Skip Objective
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedChoiceId}
                className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-40 hover:scale-105 transition-all"
              >
                <span>Evaluate Submission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Objective' : 'Finish Diagnostic'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnostic Telemetry & BKT Reasoning (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
          <section className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-300" />
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">
                  Telemetry Intelligence
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">BKT-PROBABILITY</span>
            </div>

            {/* Circular Mastery Dial */}
            <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] space-y-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-zinc-800"
                    cx="24"
                    cy="24"
                    fill="none"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <circle
                    className="text-white"
                    cx="24"
                    cy="24"
                    fill="none"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (125.6 * pct) / 100}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    {pct}%
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase">
                    P(Mastery)
                  </span>
                </div>
              </div>

              <div className="text-center font-mono text-xs text-[var(--text-secondary)]">
                {correctCount} / {Math.max(1, totalAnswered)} Verified Correct
              </div>
            </div>

            {/* Realtime Classification Status */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase block">
                Adaptive Decision Classifier:
              </span>
              <div className="p-3 rounded-xl bg-[var(--bg-surface-high)] font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Slip Probability (S):</span>
                  <span className="text-[var(--text-primary)] font-bold">0.10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Guess Probability (G):</span>
                  <span className="text-[var(--text-primary)] font-bold">0.20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Transition Rate (T):</span>
                  <span className="text-[var(--text-primary)] font-bold">0.15</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
