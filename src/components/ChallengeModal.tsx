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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-[var(--text-primary)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/15 text-violet-500 border border-violet-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Learner Challenge Portal</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Peer Review & Critical Thinking Safeguard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
          Think an explanation is counter-intuitive, incomplete, or confusing? Submit your objection or edge-case query. The tutor will evaluate your critique with pedagogical safeguards.
        </p>

        {/* Quick Suggestion Chips */}
        <div className="mb-4">
          <span className="text-[11px] text-[var(--text-secondary)] font-medium block mb-1.5">
            Quick challenge examples:
          </span>
          <div className="flex flex-col gap-1.5">
            {sampleChallenges.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChallengeText(s);
                  handleChallenge(s);
                }}
                className="text-left text-xs bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--border-main)] p-2 rounded-lg text-[var(--text-primary)] transition-colors"
              >
                💬 "{s}"
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2 mb-4">
          <textarea
            value={challengeText}
            onChange={(e) => setChallengeText(e.target.value)}
            placeholder="Type your objection or challenge here (e.g. 'Why does the vertical line test work for functions?')"
            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] min-h-[80px]"
          />
          <button
            onClick={() => handleChallenge()}
            disabled={isEvaluating || !challengeText.trim()}
            className="w-full py-2 bg-[var(--accent-primary)] hover:opacity-90 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Auditing Challenge against Academic Standards...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Challenge to Tutor
              </>
            )}
          </button>
        </div>

        {/* Evaluation Output */}
        {result && (
          <div className="p-3.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Tutor Audit Feedback
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono">
                {result.source === 'llm' ? '⚡ Gemini 1.5 Flash' : '🔒 Academic Spec'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              {result.response}
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-[var(--border-main)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--border-main)] text-[var(--text-primary)] text-xs rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
