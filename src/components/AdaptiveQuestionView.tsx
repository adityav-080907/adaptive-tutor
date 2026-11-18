import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Sprout,
  Compass,
  Code2,
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
      reasonMsg = `Mastery increased to ${Math.min(99, pct + 22)}%. Demonstrated competence on ${topic.title}.`;
      if (pct >= 65) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      reasonMsg = chosen.misconceptionId
        ? `Cognitive gap detected: [${chosen.misconceptionId}]. Preserving current difficulty for reinforcement.`
        : `Answer incorrect. Reviewing core relation rules.`;
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Breadcrumb & Return to Lesson */}
      <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
        <button
          onClick={onBackToLesson}
          className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1 font-medium"
        >
          <span>← Back to {topic.title} Lesson</span>
        </button>
        <span className="text-xs font-mono text-[var(--text-muted)]">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Assessment Card (8 cols, matching Screen 6 Reference) */}
        <div className="lg:col-span-8 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-primary)]">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-[var(--border-main)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-mono text-[10px] uppercase">
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-full bg-[var(--border-main)] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt with KaTeX Math Rendering */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Multiple Choice
            </span>
            <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)] leading-relaxed">
              <MathRenderer content={currentQuestion.prompt} />
            </div>
          </div>

          {/* Optional Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-primary)] overflow-x-auto flex items-start gap-2">
              <Code2 className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
              <pre className="whitespace-pre">{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Answer Choices (A, B, C, D) */}
          <div className="space-y-2.5">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              let choiceStyle = 'border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]';

              if (isSubmitted) {
                if (choice.isCorrect) {
                  choiceStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-semibold';
                } else if (isSelected && !choice.isCorrect) {
                  choiceStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 font-semibold';
                } else {
                  choiceStyle = 'opacity-50 border-[var(--border-subtle)] text-[var(--text-muted)]';
                }
              } else if (isSelected) {
                choiceStyle = 'border-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] ring-2 ring-[var(--accent-primary)]/20';
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3.5 transition-all ${choiceStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[10px] font-mono mt-0.5 font-bold">
                    {choice.id.toUpperCase()}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <MathRenderer content={choice.text} />
                  </div>
                  {isSubmitted && choice.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                  {isSubmitted && isSelected && !choice.isCorrect && (
                    <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint Accordion (Matching Screen 6 Reference) */}
          <div className="pt-2">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-[var(--accent-amber)] hover:underline flex items-center gap-1.5 font-medium"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Need a hint?</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Hint</span>
                </div>
                <p>{currentQuestion.hint}</p>
              </div>
            )}
          </div>

          {/* Post-submission Feedback Panel */}
          {lastFeedback && (
            <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-secondary)] space-y-2 animate-fadeIn text-xs">
              <div className="font-bold flex items-center gap-1.5">
                {lastFeedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-700 dark:text-emerald-300">Correct Answer!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span className="text-rose-700 dark:text-rose-300">
                      {lastFeedback.choice.misconceptionId
                        ? `Identified Misconception: [${lastFeedback.choice.misconceptionId}]`
                        : 'Incorrect Choice'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {lastFeedback.choice.explanation}
              </p>
              <div className="text-[11px] font-mono text-[var(--accent-primary)] pt-1 border-t border-[var(--border-subtle)]">
                🧠 Reasoner: {lastFeedback.reasoning}
              </div>
            </div>
          )}

          {/* Action Buttons: Skip & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleNext}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Skip question
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedChoiceId}
                className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Topic'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: "Adaptive Tutor" Sidebar (Screen 6 Reference Layout!) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 shadow-xs space-y-6 sticky top-24">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-4">
            <div className="p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--accent-primary)]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Mastery Intelligence</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Tracks answers, isolates misconceptions, and adjusts difficulty in real time.
              </p>
            </div>
          </div>

          {/* Progress Circular Dial / Stat (Matching Screen 6) */}
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center space-y-2">
            <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] block">
              Your Mastery Progress
            </span>
            <div className="text-3xl font-serif font-bold text-[var(--accent-primary)]">
              {pct}%
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              {correctCount} / {Math.max(1, totalAnswered)} questions answered correctly
            </p>
          </div>

          {/* Sage Sprout Motivation Card (Matching Screen 6 Sage Sprout Icon!) */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-[var(--text-primary)] block">Keep going!</strong>
              <span className="text-[var(--text-secondary)]">You're making steady progress on this roadmap.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
