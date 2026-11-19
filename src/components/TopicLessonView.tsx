import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  BookOpen,
  ArrowRight,
  Scale,
  RefreshCw,
  Terminal,
  Activity,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { Topic, Chapter, Branch, SubjectCategory, RephraseStyle } from '../types';
import { MathRenderer } from './MathRenderer';
import { VisualDiagramPanel } from './VisualDiagramPanel';
import { rephraseExplanation, speakText, stopSpeech } from '../services/llmService';

interface TopicLessonViewProps {
  topic: Topic;
  chapter: Chapter;
  branch: Branch;
  subject: SubjectCategory;
  onUnderstood: () => void;
  onBackToRoadmap: () => void;
  onOpenChallengeModal: () => void;
}

export const TopicLessonView: React.FC<TopicLessonViewProps> = ({
  topic,
  chapter,
  branch,
  subject,
  onUnderstood,
  onBackToRoadmap,
  onOpenChallengeModal,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<RephraseStyle>('standard');
  const [activeExplanation, setActiveExplanation] = useState<string>(topic.lesson.theoryMarkdown);
  const [isRephrasing, setIsRephrasing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Handle rephrasing (Analogy, ELI5, Steps, Socratic)
  const handleStyleChange = async (style: RephraseStyle) => {
    setSelectedStyle(style);
    stopSpeech();
    setIsSpeaking(false);

    if (style === 'standard') {
      setActiveExplanation(topic.lesson.theoryMarkdown);
      return;
    }

    setIsRephrasing(true);
    const result = await rephraseExplanation(topic.id, style);
    setActiveExplanation(result.text);
    setIsRephrasing(false);
  };

  // Text-To-Speech
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToRead = `${topic.title}. ${activeExplanation}`;
      const started = speakText(textToRead, () => setIsSpeaking(false));
      setIsSpeaking(started);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
      {/* =========================================================================
          TOP TELEMETRY STRIP & RE-ANCHORING HERO (Matched to Stitch)
         ========================================================================= */}
      <section className="relative w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 lg:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Specular Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Breadcrumb & Metadata Badge Array */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--border-main)]">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <button
                onClick={onBackToRoadmap}
                className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:underline"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{branch.name.toUpperCase()}</span>
              </button>
              <span>&gt;</span>
              <span>{chapter.title.toUpperCase()}</span>
              <span>&gt;</span>
              <span className="text-[var(--text-primary)] bg-[var(--bg-surface-high)] px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wider font-bold">
                CONCEPT CARD
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-high)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span className="text-[var(--text-secondary)]">NODE: #{topic.id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-secondary)]">
                <Clock className="w-3.5 h-3.5" />
                <span>~{topic.estimatedMinutes} MIN SYNC</span>
              </div>

              {/* Listen / TTS Button */}
              <button
                onClick={handleToggleSpeech}
                className={`px-3.5 py-1 rounded-full font-mono text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  isSpeaking
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-[var(--bg-surface-high)] border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--text-on-primary)]'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Pause' : 'Listen'}</span>
              </button>
            </div>
          </div>

          {/* Main Headline & Mental Model Subtitle */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <p className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] font-semibold">
                RE-ANCHORING MENTAL MODEL
              </p>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              {topic.title}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] max-w-4xl leading-relaxed">
              {topic.subtitle} Building zero-hesitation intuition before testing.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DUAL CHAMBER MAIN GRID: THEORY & VECTOR VISUALIZER (Matched to Stitch)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT CHAMBER: Core Axioms & Theory (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Rephrasing Style Capsule Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] pl-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Adaptive Rephrasing:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'standard', label: 'Standard' },
                { id: 'analogy', label: 'Analogy' },
                { id: 'eli5', label: 'ELI5' },
                { id: 'stepByStep', label: 'Steps' },
                { id: 'socratic', label: 'Socratic' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id as RephraseStyle)}
                  disabled={isRephrasing}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                    selectedStyle === style.id
                      ? 'bg-[var(--text-primary)] text-[var(--text-on-primary)] font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Governing Axiom / Theory Container */}
          <section className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-high)] text-[var(--text-primary)] font-bold">
                  AXIOM 01
                </span>
                <h2 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  Core Foundations
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                [THEORY &amp; FORMULATION]
              </span>
            </div>

            {isRephrasing ? (
              <div className="flex items-center justify-center py-12 gap-2 text-[var(--text-primary)] font-mono text-xs">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Adapting explanation in {selectedStyle} cognitive frame...</span>
              </div>
            ) : (
              <MathRenderer content={activeExplanation} className="text-sm leading-relaxed" />
            )}

            {/* Bottom Guardrail Row & Peer Review Trigger */}
            <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deterministic Ground Truth</span>
              </span>
              <button
                onClick={onOpenChallengeModal}
                className="text-[var(--text-primary)] hover:underline flex items-center gap-1 font-semibold"
              >
                <Scale className="w-3.5 h-3.5 text-amber-300" />
                <span>Challenge content</span>
              </button>
            </div>
          </section>

          {/* Key Concepts Bento Grid */}
          <section className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-4">
            <h3 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
              Key Concepts &amp; Definitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.lesson.keyConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] space-y-1"
                >
                  <span className="font-mono text-xs font-bold text-[var(--text-primary)] block">
                    {item.label}
                  </span>
                  <span className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Worked Examples Code Well */}
          {topic.lesson.examples.map((ex, idx) => (
            <section
              key={idx}
              className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-[var(--text-primary)] uppercase">
                  Worked Example: {ex.title}
                </h3>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">RUN-AUDIT</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                {ex.description}
              </p>
              {ex.mathOrCode && (
                <div className="code-well p-4 font-mono text-xs overflow-x-auto text-[var(--text-primary)]">
                  <MathRenderer content={ex.mathOrCode} />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* RIGHT CHAMBER: Visual Projection & Test CTA (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
          {/* Visual Model Card */}
          <section className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[var(--border-main)]">
              <span className="text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SPATIAL PROJECTION</span>
              </span>
              <span className="text-[var(--text-muted)]">[INTERACTIVE VISUAL]</span>
            </div>

            <VisualDiagramPanel visual={topic.lesson.visuals} />
          </section>

          {/* THE "I UNDERSTOOD →" ASSESSMENT TRANSITION CAPSULE */}
          <section className="w-full rounded-2xl bg-[var(--bg-surface-low)] border border-[var(--border-subtle)] p-6 shadow-xl space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-surface-high)] flex items-center justify-center mx-auto text-[var(--text-primary)]">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-[var(--text-primary)] uppercase">
                Ready for Diagnostic Verification?
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                Proceed into the adaptive assessment question track. The Bayesian engine will measure your mastery baseline.
              </p>
            </div>

            <button
              onClick={onUnderstood}
              className="w-full py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-105 transition-all"
            >
              <span>I Understood — Begin Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
