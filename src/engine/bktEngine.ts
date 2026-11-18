import {
  BKTParameters,
  TopicMasteryRecord,
  DecisionLog,
} from '../types';
import { getAllTopics } from '../data/curriculumData';

export const DEFAULT_BKT_PARAMS: BKTParameters = {
  pL0: 0.20, // Initial prior belief of mastery
  pT: 0.20,  // Probability of learning step transition
  pG: 0.20,  // Guess probability
  pS: 0.10,  // Slip factor
};

export const MASTERY_THRESHOLD = 0.85;
export const REMEDIATION_THRESHOLD = 0.45;

export class BKTEngine {
  private params: BKTParameters;
  private records: Map<string, TopicMasteryRecord>;
  private logs: DecisionLog[];

  constructor(params: BKTParameters = DEFAULT_BKT_PARAMS) {
    this.params = params;
    this.logs = [];
    this.records = new Map();

    // Initialize with all topics in curriculum
    const allTopics = getAllTopics();
    allTopics.forEach((t) => {
      this.records.set(t.id, {
        topicId: t.id,
        pMastery: this.params.pL0,
        totalAttempts: 0,
        correctCount: 0,
        completed: false,
        detectedMisconceptions: [],
        lastStudiedAt: new Date().toISOString(),
      });
    });
  }

  public getRecord(topicId: string): TopicMasteryRecord {
    const existing = this.records.get(topicId);
    if (existing) return existing;

    const fresh: TopicMasteryRecord = {
      topicId,
      pMastery: this.params.pL0,
      totalAttempts: 0,
      correctCount: 0,
      completed: false,
      detectedMisconceptions: [],
      lastStudiedAt: new Date().toISOString(),
    };
    this.records.set(topicId, fresh);
    return fresh;
  }

  public getAllRecords(): Record<string, TopicMasteryRecord> {
    const obj: Record<string, TopicMasteryRecord> = {};
    this.records.forEach((val, key) => {
      obj[key] = { ...val };
    });
    return obj;
  }

  public getLogs(): DecisionLog[] {
    return [...this.logs];
  }

  /**
   * Core Bayesian Knowledge Tracing update
   */
  public updateMastery(
    topicId: string,
    isCorrect: boolean,
    misconceptionId?: string
  ): {
    oldP: number;
    newP: number;
    ruleTriggered: string;
    reason: string;
  } {
    const record = this.getRecord(topicId);
    const pPrior = record.pMastery;
    const { pT, pG, pS } = this.params;

    let pObs: number;
    if (isCorrect) {
      const numerator = pPrior * (1 - pS);
      const denominator = numerator + (1 - pPrior) * pG;
      pObs = numerator / Math.max(denominator, 0.0001);
    } else {
      const numerator = pPrior * pS;
      const denominator = numerator + (1 - pPrior) * (1 - pG);
      pObs = numerator / Math.max(denominator, 0.0001);
    }

    // Transition step: P(L_next) = P(L|obs) + (1 - P(L|obs)) * pT
    let pPosterior = pObs + (1 - pObs) * pT;
    pPosterior = Math.max(0.02, Math.min(0.99, Number(pPosterior.toFixed(4))));

    record.totalAttempts += 1;
    if (isCorrect) {
      record.correctCount += 1;
    } else if (misconceptionId && !record.detectedMisconceptions.includes(misconceptionId)) {
      record.detectedMisconceptions.push(misconceptionId);
    }

    record.pMastery = pPosterior;
    record.lastStudiedAt = new Date().toISOString();
    if (pPosterior >= MASTERY_THRESHOLD) {
      record.completed = true;
    }

    // Pedagogical rule evaluation
    let ruleTriggered = '';
    let reason = '';

    if (pPosterior >= MASTERY_THRESHOLD) {
      ruleTriggered = 'RULE_MASTERY_CERTIFIED';
      reason = `Bayesian belief reached ${Math.round(pPosterior * 100)}% (threshold: ${Math.round(MASTERY_THRESHOLD * 100)}%). Concept certified as Mastered.`;
    } else if (!isCorrect) {
      if (misconceptionId) {
        ruleTriggered = 'RULE_MISCONCEPTION_PIVOT';
        reason = `Specific misconception [${misconceptionId}] detected. Re-anchoring with visual counter-example.`;
      } else {
        ruleTriggered = 'RULE_REMEDIAL_REINFORCEMENT';
        reason = `Incorrect response observed. Prior probability updated to ${Math.round(pPosterior * 100)}%. Offering diagnostic hints.`;
      }
    } else {
      ruleTriggered = 'RULE_POSITIVE_REINFORCEMENT';
      reason = `Correct response confirmed. Mastery progressed from ${Math.round(pPrior * 100)}% to ${Math.round(pPosterior * 100)}%.`;
    }

    const log: DecisionLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      topicId,
      ruleFired: ruleTriggered,
      reason,
      bktBefore: pPrior,
      bktAfter: pPosterior,
    };
    this.logs.unshift(log);

    return {
      oldP: pPrior,
      newP: pPosterior,
      ruleTriggered,
      reason,
    };
  }

  public resetAll(): void {
    this.logs = [];
    this.records.clear();
    const allTopics = getAllTopics();
    allTopics.forEach((t) => {
      this.records.set(t.id, {
        topicId: t.id,
        pMastery: this.params.pL0,
        totalAttempts: 0,
        correctCount: 0,
        completed: false,
        detectedMisconceptions: [],
        lastStudiedAt: new Date().toISOString(),
      });
    });
  }
}
