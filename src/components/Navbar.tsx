import React from 'react';
import { Sun, Moon, Brain, Compass, BarChart3 } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-main)] bg-[var(--bg-main)]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand: Airavata Medallion & Name */}
        <button
          onClick={() => onChangeView('home')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--border-main)] bg-[var(--bg-secondary)] flex-shrink-0">
            <img
              src={airavataLogo}
              alt="Airavata"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-display text-base font-bold tracking-wider text-[var(--text-primary)] block leading-tight">
              AIRAVATA
            </span>
            <span className="text-[11px] text-[var(--text-muted)] font-sans">
              Precision Learning
            </span>
          </div>
        </button>

        {/* Navigation: Quiet, Aligned, 32-36px Rows */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => onChangeView('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeView === 'home'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-main)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onChangeView('roadmap')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'roadmap' || activeView === 'lesson' || activeView === 'questions' || activeView === 'feedback'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-main)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Curriculum Roadmaps</span>
          </button>

          <button
            onClick={() => onChangeView('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'dashboard'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-main)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Mastery Analytics</span>
          </button>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            title={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {currentTheme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
            )}
          </button>

          {/* Tutor Brain Drawer Trigger */}
          <button
            onClick={onToggleBrainDrawer}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Inspect Bayesian Knowledge Tracing"
          >
            <Brain className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Brain Inspector</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
          </button>
        </div>
      </div>
    </header>
  );
};
