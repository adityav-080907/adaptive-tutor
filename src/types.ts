export type TopSubjectId = 'coding' | 'mathematics' | 'science';

export type BranchId =
  // Coding
  | 'python'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'java'
  // Mathematics
  | 'functions'
  | 'algebra'
  | 'calculus'
  | 'linear_algebra'
  | 'probability'
  // Science
  | 'physics'
  | 'chemistry'
  | 'biology';

export type VisualType =
  | 'functions_mapping'
  | 'function_graph'
  | 'python_memory'
  | 'newton_forces'
  | 'bayes_cohort'
  | 'none';

export type RephraseStyle = 'standard' | 'analogy' | 'eli5' | 'stepByStep' | 'socratic';

export interface VisualPayload {
  type: VisualType;
  title: string;
  caption: string;
}

export interface ExampleItem {
  title: string;
  description: string;
  mathOrCode?: string;
  steps?: string[];
}

export interface MisconceptionItem {
  id: string;
  name: string;
  description: string;
  remedialTip: string;
}

export interface LessonContent {
  objectives: string[];
  keyConcepts: { label: string; text: string }[];
  theoryMarkdown: string;
  formulas?: string[];
  examples: ExampleItem[];
  visuals: VisualPayload;
  misconceptions: MisconceptionItem[];
  realWorldApp: string;
  recap: string[];
  fallbacks: {
    analogy: string;
    eli5: string;
    stepByStep: string;
    socratic: string;
  };
}

export interface QuestionChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionId?: string;
  explanation: string;
}

export interface Question {
  id: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  codeSnippet?: string;
  choices: QuestionChoice[];
  hint: string;
  workedExample?: string;
}

export interface Topic {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  order: number;
  estimatedMinutes: number;
  subtopics: string[];
  prerequisites?: string[];
  lesson: LessonContent;
  questions: Question[];
}

export interface Chapter {
  id: string;
  branchId: BranchId;
  order: number;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Branch {
  id: BranchId;
  subjectId: TopSubjectId;
  name: string;
  badge: string;
  description: string;
  icon: string;
  chapters: Chapter[];
}

export interface SubjectCategory {
  id: TopSubjectId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  branches: { id: BranchId; name: string; tag: string }[];
}

export interface BKTParameters {
  pL0: number; // Prior probability of mastery
  pT: number;  // Transition probability (learning step)
  pG: number;  // Guess factor
  pS: number;  // Slip factor
}

export interface TopicMasteryRecord {
  topicId: string;
  pMastery: number; // 0.0 to 1.0
  totalAttempts: number;
  correctCount: number;
  completed: boolean;
  detectedMisconceptions: string[];
  lastStudiedAt: string;
}

export interface DecisionLog {
  id: string;
  timestamp: string;
  topicId: string;
  ruleFired: string;
  reason: string;
  bktBefore: number;
  bktAfter: number;
}

export interface UserStats {
  topicsLearned: number;
  studyTimeMinutes: number;
  totalAnswered: number;
  totalCorrect: number;
  streakDays: number;
  xp: number;
  recentActivity: {
    id: string;
    topicTitle: string;
    subjectName: string;
    timeAgo: string;
    status: 'completed' | 'in_progress';
  }[];
}
