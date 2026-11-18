import React, { useState, useEffect, useMemo } from 'react';
import {
  TopSubjectId,
  BranchId,
  Topic,
  Chapter,
  Branch,
  SubjectCategory,
} from './types';
import {
  SUBJECT_CATEGORIES,
  ALL_BRANCHES,
  findTopicById,
  getAllTopics,
} from './data/curriculumData';
import { BKTEngine } from './engine/bktEngine';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SubjectRoadmap } from './components/SubjectRoadmap';
import { TopicLessonView } from './components/TopicLessonView';
import { AdaptiveQuestionView } from './components/AdaptiveQuestionView';
import { AdaptiveFeedbackView } from './components/AdaptiveFeedbackView';
import { LearningDashboard } from './components/LearningDashboard';
import { TutorBrainDrawer } from './components/TutorBrainDrawer';
import { ChallengeModal } from './components/ChallengeModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { stopSpeech } from './services/llmService';

export function App() {
  const engine = useMemo(() => new BKTEngine(), []);

  // Theme state: defaults to 'dark' for deep sea blue or 'light' for ocean serenity
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('airavata_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('airavata_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Active View Navigation State
  const [activeView, setActiveView] = useState<
    'home' | 'roadmap' | 'lesson' | 'feedback' | 'questions' | 'dashboard'
  >('home');

  // Selected Curriculum Focus
  const [selectedSubject, setSelectedSubject] = useState<TopSubjectId>('mathematics');
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('functions');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('math_1_3_functions');

  // BKT Engine state synchronization
  const [masteryRecords, setMasteryRecords] = useState(() => engine.getAllRecords());
  const [decisionLogs, setDecisionLogs] = useState(() => engine.getLogs());

  // Drawers & Modals
  const [isBrainDrawerOpen, setIsBrainDrawerOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const syncBKT = () => {
    setMasteryRecords({ ...engine.getAllRecords() });
    setDecisionLogs([...engine.getLogs()]);
  };

  // Find active topic context
  const activeLookup = useMemo(() => {
    const found = findTopicById(selectedTopicId);
    if (found) return found;

    // Fallback to first available topic
    const all = getAllTopics();
    const fallbackTopic = all[0];
    return findTopicById(fallbackTopic.id)!;
  }, [selectedTopicId]);

  // Handlers for Home view
  const handleSelectCategory = (subjectId: TopSubjectId) => {
    stopSpeech();
    setSelectedSubject(subjectId);
    const branch = ALL_BRANCHES.find((b) => b.subjectId === subjectId);
    if (branch) {
      setSelectedBranch(branch.id);
    }
    setActiveView('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBranch = (subjectId: TopSubjectId, branchId: BranchId) => {
    stopSpeech();
    setSelectedSubject(subjectId);
    setSelectedBranch(branchId);
    setActiveView('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicDirect = (topicId: string) => {
    stopSpeech();
    const match = findTopicById(topicId);
    if (match) {
      setSelectedSubject(match.subject.id);
      setSelectedBranch(match.branch.id);
      setSelectedTopicId(topicId);
    }
    setActiveView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pedagogical Transition: Theory -> Questions
  const handleUnderstood = () => {
    stopSpeech();
    setActiveView('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Question Answer handler
  const handleQuestionCompleted = (isCorrect: boolean, misconceptionId?: string) => {
    engine.updateMastery(selectedTopicId, isCorrect, misconceptionId);
    syncBKT();
  };

  const handleAllQuestionsFinished = () => {
    syncBKT();
    setActiveView('feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next topic in roadmap sequence
  const handleNextTopic = () => {
    stopSpeech();
    const allTopics = getAllTopics();
    const currentIdx = allTopics.findIndex((t) => t.id === selectedTopicId);
    if (currentIdx !== -1 && currentIdx < allTopics.length - 1) {
      const next = allTopics[currentIdx + 1];
      handleSelectTopicDirect(next.id);
    } else {
      setActiveView('roadmap');
    }
  };

  // Simulation shortcuts for judges
  const handleSimulateStruggling = () => {
    const topic = activeLookup.topic;
    const misconceptionId = topic.lesson.misconceptions[0]?.id || 'M_GENERAL_GAP';
    engine.updateMastery(selectedTopicId, false, misconceptionId);
    syncBKT();
  };

  const handleSimulateMastery = () => {
    engine.updateMastery(selectedTopicId, true);
    engine.updateMastery(selectedTopicId, true);
    syncBKT();
  };

  const handleResetBKT = () => {
    engine.resetAll();
    syncBKT();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation Bar with Dual-Theme Toggle & Brain Trigger */}
      <Navbar
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onChangeView={(view) => {
          stopSpeech();
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleBrainDrawer={() => setIsBrainDrawerOpen(!isBrainDrawerOpen)}
        selectedSubject={selectedSubject}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full pb-16">
        {/* Screen 1: Landing Hero & Knowledge Constellation */}
        {activeView === 'home' && (
          <LandingHero
            onSelectCategory={handleSelectCategory}
            onSelectBranch={handleSelectBranch}
            onSelectTopic={handleSelectTopicDirect}
          />
        )}

        {/* Screen 2: Subject Roadmap Flowchart */}
        {activeView === 'roadmap' && (
          <SubjectRoadmap
            selectedSubject={selectedSubject}
            selectedBranch={selectedBranch}
            onSelectBranch={setSelectedBranch}
            onSelectTopic={handleSelectTopicDirect}
            onBackToHome={() => {
              stopSpeech();
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            masteryRecords={masteryRecords}
          />
        )}

        {/* Screen 3 & 4: Detailed Concept Lesson (Theory + Interactive Visualizer + Formulas + TTS) */}
        {activeView === 'lesson' && activeLookup && (
          <TopicLessonView
            topic={activeLookup.topic}
            chapter={activeLookup.chapter}
            branch={activeLookup.branch}
            subject={activeLookup.subject}
            onUnderstood={handleUnderstood}
            onBackToRoadmap={() => {
              stopSpeech();
              setActiveView('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChallengeModal={() => setIsChallengeModalOpen(true)}
          />
        )}

        {/* Screen 6: Adaptive Question Interface with Adaptive Tutor Sidebar */}
        {activeView === 'questions' && activeLookup && (
          <div className="py-6">
            <AdaptiveQuestionView
              topic={activeLookup.topic}
              onQuestionCompleted={handleQuestionCompleted}
              onAllQuestionsFinished={handleAllQuestionsFinished}
              onBackToLesson={() => {
                setActiveView('lesson');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              masteryRecord={masteryRecords[selectedTopicId]}
            />
          </div>
        )}

        {/* Screen 5: Feedback / Next Steps Screen */}
        {activeView === 'feedback' && activeLookup && (
          <AdaptiveFeedbackView
            topic={activeLookup.topic}
            onProceedToQuestions={() => {
              setActiveView('questions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRevisitTopic={() => {
              setActiveView('lesson');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNextTopic={handleNextTopic}
            onBackToRoadmap={() => {
              setActiveView('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            record={masteryRecords[selectedTopicId]}
          />
        )}

        {/* Screen 7: Overall Learning Dashboard */}
        {activeView === 'dashboard' && (
          <LearningDashboard
            masteryRecords={masteryRecords}
            onSelectSubject={handleSelectCategory}
            onSelectTopic={handleSelectTopicDirect}
          />
        )}
      </main>

      {/* Glass-Box Tutor Brain Inspector (BKT Probability Formulas & Logs) */}
      <TutorBrainDrawer
        isOpen={isBrainDrawerOpen}
        onClose={() => setIsBrainDrawerOpen(false)}
        masteryRecords={masteryRecords}
        logs={decisionLogs}
        activeTopicId={selectedTopicId}
        onReset={handleResetBKT}
        onSimulateStruggling={handleSimulateStruggling}
        onSimulateMastery={handleSimulateMastery}
      />

      {/* Peer Review & Learner Challenge Modal */}
      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        topicId={selectedTopicId}
      />

      {/* Optional Gemini API Key Modal for Live Generation */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[var(--border-main)] bg-[var(--bg-surface)] py-6 text-center text-xs text-[var(--text-secondary)] space-y-1 transition-colors">
        <div className="flex items-center justify-center gap-2 font-medium text-[var(--text-primary)]">
          <span>AIRAVATA — Precision Adaptive Learning</span>
          <span>•</span>
          <span className="font-mono text-[11px] text-[var(--accent-primary)]">Track ED-02</span>
        </div>
        <p className="text-[11px]">
          Bayesian Knowledge Tracing (BKT) • Sequential Curriculum Roadmaps • KaTeX Math Notation • Safeguarded Adaptive Rephrasing
        </p>
      </footer>
    </div>
  );
}

export default App;
