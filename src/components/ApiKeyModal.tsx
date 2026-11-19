import React, { useState, useEffect } from 'react';
import { Key, Shield } from 'lucide-react';
import { getStoredApiKey, saveStoredApiKey } from '../services/llmService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveStoredApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    saveStoredApiKey('');
    setApiKey('');
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-surface-low)] border border-[var(--border-hairline)] rounded-2xl max-w-md w-full p-6 shadow-[0_16px_48px_rgba(0,0,0,0.85)] relative text-[var(--text-primary)] space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
              <Key className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase text-[var(--text-primary)]">
                AI Engine Configuration
              </h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Gemini 1.5 Flash API Key (Optional)
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

        <div className="p-3.5 bg-[var(--bg-surface-container)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] flex items-start gap-2.5 leading-relaxed">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--text-primary)] font-mono block">100% Offline-Ready &amp; Verified:</strong>
            <p className="mt-0.5">
              If left blank, the app runs on deterministic curriculum matrices. Entering a key unlocks real-time generative rephrasing and challenge evaluations.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs text-[var(--text-muted)] block uppercase">
            Google AI Studio API Key:
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] focus:border-white rounded-xl px-3.5 py-2.5 font-mono text-xs text-white placeholder-[var(--text-muted)] focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            className="font-mono text-xs text-[var(--text-muted)] hover:text-white"
          >
            Clear key
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[var(--border-main)] text-[var(--text-secondary)] font-mono text-xs hover:bg-[var(--bg-surface-high)]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[var(--text-primary)] text-[var(--text-on-primary)] font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
            >
              {isSaved ? 'Saved ✓' : 'Save Key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
