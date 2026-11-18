import { RephraseStyle } from '../types';
import { findTopicById } from '../data/curriculumData';

const LOCAL_STORAGE_KEY = 'airavata_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LOCAL_STORAGE_KEY) || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
}

export function saveStoredApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
  }
}

export interface RephraseResult {
  text: string;
  source: 'llm' | 'fallback_reviewed';
  style: RephraseStyle;
  latencyMs?: number;
}

export async function rephraseExplanation(
  topicId: string,
  style: RephraseStyle
): Promise<RephraseResult> {
  const match = findTopicById(topicId);
  const topic = match?.topic;

  if (style === 'standard') {
    return {
      text: topic?.lesson.theoryMarkdown || '',
      source: 'fallback_reviewed',
      style: 'standard',
      latencyMs: 0,
    };
  }

  const fallbackText =
    topic?.lesson.fallbacks[style as keyof typeof topic.lesson.fallbacks] ||
    topic?.lesson.theoryMarkdown ||
    '';

  const apiKey = getStoredApiKey();
  if (!apiKey) {
    return {
      text: fallbackText,
      source: 'fallback_reviewed',
      style,
      latencyMs: 10,
    };
  }

  const startTime = Date.now();
  const reviewedText = topic?.lesson.theoryMarkdown || '';

  const styleInstructions: Record<RephraseStyle, string> = {
    standard: 'Provide clear, concise foundational explanation with accurate terminology.',
    analogy: 'Rewrite using a vivid, intuitive real-world analogy (e.g. physical objects, everyday routines, architecture).',
    eli5: 'Explain like I am 5 years old. Use simple words, short sentences, and friendly metaphors.',
    stepByStep: 'Break down the concept into numbered sequential mechanical steps (Step 1, Step 2...).',
    socratic: 'Pose thought-provoking diagnostic questions that guide the learner to uncover the answer themselves.',
  };

  const prompt = `
You are an adaptive pedagogical tutor rephraser for AIRAVATA.
Topic: "${topic?.title}".
Subject: "${match?.subject.name}".
Your goal is to rephrase the following reviewed educational text.

STYLE REQUESTED: ${style.toUpperCase()}
INSTRUCTION: ${styleInstructions[style]}

STRICT BOUNDARY & SAFEGUARDS:
- You must ONLY convey the pedagogical facts in the reviewed material below.
- Keep the response clear, engaging, and under 3 paragraphs.
- Preserve formulas or code blocks using proper markdown formatting ($...$ or $$...$$ for math, \`\`\` for code).

REVIEWED LEARNING MATERIAL:
"""
${reviewedText}
"""
`.trim();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText && candidateText.trim().length > 0) {
      return {
        text: candidateText.trim(),
        source: 'llm',
        style,
        latencyMs: Date.now() - startTime,
      };
    }
    throw new Error('Empty response from model');
  } catch (err) {
    console.warn('LLM call failed, smoothly activating reviewed fallback:', err);
    return {
      text: fallbackText,
      source: 'fallback_reviewed',
      style,
      latencyMs: Date.now() - startTime,
    };
  }
}

export interface ChallengeResult {
  verdict: 'valid_critique' | 'misconception_clarified' | 'feedback_received';
  response: string;
  source: 'llm' | 'fallback_reviewed';
}

export async function evaluateLearnerChallenge(
  topicId: string,
  userChallenge: string
): Promise<ChallengeResult> {
  const match = findTopicById(topicId);
  const topic = match?.topic;
  const apiKey = getStoredApiKey();

  const fallbackVerdict: ChallengeResult = {
    verdict: 'misconception_clarified',
    response: `Great question! In ${topic?.title || 'this topic'}, subtle edge cases often arise between definitions and practical implementation. Your critique highlights why careful analysis of domain boundaries and invariants is critical. Keep thinking critically!`,
    source: 'fallback_reviewed',
  };

  if (!apiKey) {
    return fallbackVerdict;
  }

  const prompt = `
A learner has challenged an explanation in our adaptive learning system.
TOPIC: "${topic?.title}"
REVIEWED CURRICULUM:
"""
${topic?.lesson.theoryMarkdown}
"""

LEARNER'S CHALLENGE / OBJECTION:
"""
${userChallenge}
"""

TASK:
1. Evaluate whether the learner's objection has technical or mathematical merit.
2. If they are pointing out a legitimate edge case, acknowledge it warmly and validate them.
3. If they are succumbing to a known misconception, kindly explain the reasoning.
4. Keep your answer encouraging and under 150 words.
`.trim();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return {
        verdict: 'misconception_clarified',
        response: text.trim(),
        source: 'llm',
      };
    }
    return fallbackVerdict;
  } catch (err) {
    console.warn('Challenge LLM failed, using fallback:', err);
    return fallbackVerdict;
  }
}

// Browser speech synthesis (runs on low-end device with 0 latency)
export function speakText(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();
  const cleanedText = text
    .replace(/[*#`_]/g, '')
    .replace(/\$\$(.*?)\$\$/gs, ' formula: $1 ')
    .replace(/\$(.*?)\$/g, ' $1 ');

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
