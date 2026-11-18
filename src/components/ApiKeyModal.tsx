import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, Check, Shield, WifiOff } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Engine Configuration</h3>
              <p className="text-xs text-slate-400">Gemini 1.5 Flash API Key (Optional)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1 rounded-lg">
            ✕
          </button>
        </div>

        <div className="p-3 bg-emerald-950/40 border border-emerald-800/80 rounded-xl mb-4 text-xs text-emerald-200 flex items-start gap-2">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>100% Hackathon-Ready Without an API Key:</strong>
            <p className="text-emerald-300/80 mt-0.5">
              If left blank, the app seamlessly runs on reviewed pre-written fallback matrices. Entering a key unlocks real-time generative rephrasing via Gemini 1.5 Flash.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <label className="text-xs font-semibold text-slate-300 block">
            Google AI Studio API Key:
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              Get free key in 30 seconds <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-500">Stored locally in browser</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex-1 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <WifiOff className="w-3.5 h-3.5" />
            Run Offline / Fallback
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-white" /> Saved!
              </>
            ) : (
              'Save Key'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
