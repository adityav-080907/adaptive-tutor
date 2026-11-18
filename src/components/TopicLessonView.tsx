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
  CheckCircle2,
  AlertTriangle,
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
  const [activeTab, setActiveTab] = useState<'theory' | 'visuals' | 'examples' | 'key_points' | 'misconceptions'>('theory');
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

  // Text-To-Speech (Listen button from Screen 3)
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Breadcrumbs (Screen 3 & 4 in reference) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-main)] pb-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1 font-sans">
            <button onClick={onBackToRoadmap} className="hover:text-[var(--text-primary)]">
              {subject.name}
            </button>
            <span>/</span>
            <span className="hover:text-[var(--text-primary)]">{chapter.title}</span>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">{topic.title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              {topic.title}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-main)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" /> {topic.estimatedMinutes} min
            </span>
          </div>
        </div>

        {/* Listen / TTS Button (Matching Screen 3 button exactly) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSpeech}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 shadow-xs transition-all ${
              isSpeaking
                ? 'bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse'
                : 'bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />}
            <span>{isSpeaking ? 'Pause Audio' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Subnav Tabs (Theory, Visuals, Examples, Key Points, Misconceptions) */}
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'theory', label: 'Theory' },
          { id: 'visuals', label: 'Visuals' },
          { id: 'examples', label: 'Examples' },
          { id: 'key_points', label: 'Key Points' },
          { id: 'misconceptions', label: 'Misconceptions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[var(--accent-primary)] text-white font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Lesson Body Grid: Central Theory Column + Right Visual Panel (Screen 3 Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Center Column: Theory & Explanations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Explain Differently Rephrase Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] pl-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
              <span>Explain differently:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'standard', label: 'Standard' },
                { id: 'analogy', label: '🎪 Analogy' },
                { id: 'eli5', label: '🧸 ELI5' },
                { id: 'stepByStep', label: '🔢 Steps' },
                { id: 'socratic', label: '🧐 Socratic' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id as RephraseStyle)}
                  disabled={isRephrasing}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    selectedStyle === style.id
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theory Markdown Card with KaTeX Math Rendering */}
          <div className="p-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-xs space-y-4">
            {isRephrasing ? (
              <div className="flex items-center justify-center py-10 gap-2 text-[var(--accent-primary)] text-xs">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Adapting explanation in {selectedStyle} style...</span>
              </div>
            ) : (
              <MathRenderer content={activeExplanation} className="text-sm leading-relaxed" />
            )}

            {/* Bottom Guardrail & Challenge Button */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Reviewed Learning Content (Deterministic Ground Truth)
              </span>
              <button
                onClick={onOpenChallengeModal}
                className="text-[var(--accent-primary)] hover:underline flex items-center gap-1 font-medium"
              >
                <Scale className="w-3.5 h-3.5" />
                Challenge explanation
              </button>
            </div>
          </div>

          {/* Key Concepts Card (Matching Reference Screen 3) */}
          <div className="p-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-xs space-y-3">
            <h3 className="text-sm font-serif font-bold text-[var(--text-primary)]">
              Key Concepts & Definitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {topic.lesson.keyConcepts.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <span className="font-bold text-[var(--text-primary)] block mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-[var(--text-secondary)]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Examples Card */}
          <div className="p-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-xs space-y-3">
            <h3 className="text-sm font-serif font-bold text-[var(--text-primary)]">
              Worked Example
            </h3>
            {topic.lesson.examples.map((ex, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <h4 className="font-semibold text-[var(--text-primary)]">{ex.title}</h4>
                <p className="text-[var(--text-secondary)]">{ex.description}</p>
                {ex.mathOrCode && (
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] font-mono text-xs border border-[var(--border-subtle)]">
                    <MathRenderer content={ex.mathOrCode} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Real World Applications */}
          <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[var(--accent-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Real World Application: </strong>
              <span>{topic.lesson.realWorldApp}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Diagrams Panel + "I Understood" CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          {/* Visual Diagram Panel (SVG Set Mappings & Graph from Reference Screen 3) */}
          <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Interactive Visual Explanation</span>
            </div>

            <VisualDiagramPanel visual={topic.lesson.visuals} />
          </div>

          {/* THE "I UNDERSTOOD →" COMPLETION BUTTON (Screen 3 & 4 Reference CTA) */}
          <div className="p-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] shadow-sm space-y-3 text-center">
            <h4 className="text-sm font-serif font-bold text-[var(--text-primary)]">
              Ready to test your understanding?
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Once you have reviewed the theory and visuals above, proceed to the adaptive assessment.
            </p>
            <button
              onClick={onUnderstood}
              className="w-full py-3.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-transform hover:scale-[1.01]"
            >
              <span>I understood</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
