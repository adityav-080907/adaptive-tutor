import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { evaluateLearnerChallenge, ChallengeResult } from '../services/llmService';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  topicId,
}) => {
  const [challengeText, setChallengeText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ChallengeResult | null>(null);

  if (!isOpen) return null;

  const handleChallenge = async (textToSubmit?: string) => {
    const text = textToSubmit || challengeText;
    if (!text.trim()) return;

    setIsEvaluating(true);
    setResult(null);

    const evaluation = await evaluateLearnerChallenge(topicId, text);
    setResult(evaluation);
    setIsEvaluating(false);
  };

  const sampleChallenges = [
    'Why can a single x-value not produce two y-values in a function?',
    'What happens if we modify an immutable tuple that contains a mutable list inside it?',
    'If Newton third law states action equals reaction, why do things accelerate instead of canceling out?',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-surface-low)] border border-[var(--border-hairline)] rounded-2xl max-w-lg w-full p-6 shadow-[0_16px_48px_rgba(0,0,0,0.85)] relative text-[var(--text-primary)] space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase text-[var(--text-primary)]">
                Learner Challenge Portal
              </h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Peer Review &amp; Critical Thinking Safeguard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-white p-1 rounded-lg font-mono"
          >
            ✕
          </button>
        </div>

        <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
          Think an explanation is counter-intuitive, incomplete, or confusing? Submit your critique or edge-case query. The tutor evaluates your objection with pedagogical validation.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase block">
            Sample Challenge Inquiries:
          </span>
          <div className="space-y-1.5">
            {sampleChallenges.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChallengeText(sample);
                  handleChallenge(sample);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-[var(--bg-surface-container)] hover:bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors leading-relaxed"
              >
                &gt; {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Input Field */}
        <div className="space-y-2 pt-1">
          <textarea
            value={challengeText}
            onChange={(e) => setChallengeText(e.target.value)}
            placeholder="Type your objection, edge-case, or alternative explanation here..."
            rows={3}
            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] focus:border-white rounded-xl p-3 font-mono text-xs text-white placeholder-[var(--text-muted)] focus:outline-none resize-none"
          />

          <div className="flex justify-end">
            <button
              onClick={() => handleChallenge()}
              disabled={isEvaluating || !challengeText.trim()}
              className="px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm disabled:opacity-40 hover:scale-105 transition-all"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Submit Challenge</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Evaluation Result */}
        {result && (
          <div className="p-4 rounded-xl bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] space-y-2 text-xs">
            <div className="font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[var(--text-primary)] uppercase">
                Tutor Judgment // {result.verdict}
              </span>
            </div>
            <p className="font-sans text-[var(--text-secondary)] leading-relaxed">
              {result.response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
