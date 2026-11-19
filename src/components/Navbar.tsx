import React from 'react';
import { Sun, Moon, Brain, Compass, BarChart3, Home, Terminal } from 'lucide-react';
import { TopSubjectId } from '../types';
import airavataLogo from '../assets/airavata-logo.jpg';

interface NavbarProps {
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeView: 'home' | 'roadmap' | 'lesson' | 'feedback' | 'questions' | 'dashboard';
  onChangeView: (view: 'home' | 'roadmap' | 'dashboard') => void;
  onToggleBrainDrawer: () => void;
  selectedSubject: TopSubjectId;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onToggleTheme,
  activeView,
  onChangeView,
  onToggleBrainDrawer,
}) => {
  const isCurriculumActive =
    activeView === 'roadmap' ||
    activeView === 'lesson' ||
    activeView === 'questions' ||
    activeView === 'feedback';

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-main)]/85 backdrop-blur-xl border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand: Logo & Cybernetic Monospace Mark */}
        <button
          onClick={() => onChangeView('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-surface-high)] flex-shrink-0 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={airavataLogo}
              alt="Airavata"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm md:text-base font-bold tracking-wider text-[var(--text-primary)] block leading-tight uppercase">
              AIRAVATA
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
              ADAPTIVE // OS
            </span>
          </div>
        </button>

        {/* Center Floating Navigation Island (Pill Capsule Geometry) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-[var(--bg-surface-low)]/90 backdrop-blur-2xl rounded-full border border-[var(--border-hairline)] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)]">
          <button
            onClick={() => onChangeView('home')}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 ${
              activeView === 'home'
                ? 'bg-[var(--text-primary)] text-[var(--text-on-primary)] font-bold shadow-[0_0_16px_rgba(255,255,255,0.15)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </button>

          <button
            onClick={() => onChangeView('roadmap')}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 ${
              isCurriculumActive
                ? 'bg-[var(--text-primary)] text-[var(--text-on-primary)] font-bold shadow-[0_0_16px_rgba(255,255,255,0.15)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Roadmap</span>
          </button>

          <button
            onClick={() => onChangeView('dashboard')}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 ${
              activeView === 'dashboard'
                ? 'bg-[var(--text-primary)] text-[var(--text-on-primary)] font-bold shadow-[0_0_16px_rgba(255,255,255,0.15)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Mastery</span>
          </button>
        </nav>

        {/* Telemetry Status & Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Learner Telemetry Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-low)] border border-[var(--border-main)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <span className="font-mono text-[11px] text-[var(--text-secondary)]">
              Learner • Py 3.12
            </span>
          </div>

          {/* Theme Switch Pill */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface-low)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)] transition-all"
            title={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {currentTheme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          {/* Tutor Brain Drawer Trigger (Obsidian Pill) */}
          <button
            onClick={onToggleBrainDrawer}
            className="px-3.5 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface-low)] hover:bg-[var(--bg-surface-high)] text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            title="Inspect Bayesian Knowledge Tracing & Decision Matrix"
          >
            <Brain className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span className="hidden sm:inline">BKT Brain</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>
        </div>
      </div>
    </header>
  );
};
