# 🎓 Adaptive SQL Tutor (Track ED-02)

An intelligent, transparent adaptive learning tutor built for the 24-hour hackathon. 

It implements **Approach 3: Hybrid (Rule-Based + Bayesian Knowledge Tracing + Safeguarded LLM Rephraser)**.

---

## 🌟 Key Features Built for the Hackathon Rubric

1. **Teach First → Check Understanding → Adapt Strategy**
   - **Step 1 (Teach):** Bite-sized reviewed micro-lesson card with core concepts and an interactive relational table visualizer.
   - **Step 2 (Check):** Diagnostic questions with distractor choices mapped to known cognitive misconceptions.
   - **Step 3 (Adapt):** Dynamically branches into **Fast-Track Acceleration** ($P \ge 0.70$) or **Guided Remediation** with visual worked examples.

2. **Mathematical Learner Model (Bayesian Knowledge Tracing - BKT)**
   - Tracks live mastery probability $P(L_t) \in [0.0, 1.0]$ for each learning objective using the standard 4-parameter BKT formulation ($P(L_0), P(T), P(G), P(S)$).
   - Real-time animated progress gauges show actual mastery growth.

3. **Glass-Box "Tutor Brain Inspector" (Judge Inspection Mode)**
   - Live audit stream explaining **WHY** each next activity is chosen (e.g. `"Rule Fired: Misconception M1 detected -> Diverted to Remedial Path"`).
   - One-click demo shortcuts: *"Simulate Misconception"* and *"Simulate High Mastery"*.

4. **Pedagogical Safeguards & Boundaries (Zero Hallucination)**
   - Pre-reviewed curriculum bank ensures ground truth database accuracy.
   - The LLM (Gemini 1.5 Flash) is strictly constrained to stylistic rephrasing:
     - 🎪 **Analogy Mode**
     - 🧸 **ELI5 (Explain Like I'm 5)**
     - 🔢 **Step-by-Step Breakdown**
     - 🧐 **Socratic Inquiry**
   - **Offline / Low-Resource Fallback:** If offline or without an API key, pre-written reviewed fallbacks load instantly with zero latency.

5. **Learner Challenge Safeguard (Rubric Boundary)**
   - Dedicated *"Challenge / Question This Explanation"* portal allows learners to question the tutor's rules, evaluated against ANSI SQL standards.

6. **Accessibility & Low-End Device Support**
   - Built-in Voice Mode using native browser speech synthesis (`window.speechSynthesis`).
   - Pure client-side reactivity; runs smoothly even on entry-level Chromebooks or phones.

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd C:\Users\rvvrd\.gemini\antigravity\scratch\adaptive-tutor

# Install dependencies (already completed)
npm install

# Start development server
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

---

## 📁 Project Architecture

- **`src/types.ts`**: TypeScript schemas for objectives, misconceptions, questions, BKT states, and audit logs.
- **`src/data/curriculum.ts`**: Curated, pre-reviewed question bank across 3 objectives with tagged cognitive misconceptions and fallback rephrasings.
- **`src/engine/bktEngine.ts`**: Pure mathematical BKT engine and adaptive rule state machine.
- **`src/services/llmService.ts`**: Google AI Studio Gemini integration, prompt guardrails, offline fallback matrix, and speech synthesis.
- **`src/components/SqlVisualizer.tsx`**: Interactive relational table visualizer demonstrating row matching, NULL preservation, and WHERE clause pitfalls.
- **`src/components/TutorBrainDrawer.tsx`**: Glass-box drawer for judges displaying live BKT meters, decision logs, and demo simulation presets.
- **`src/components/ChallengeModal.tsx`**: Learner challenge safeguard dialog.
- **`src/components/LessonCard.tsx`**: Central learning interface.
- **`src/components/Header.tsx`**: Navigation with real-time mastery badges and voice toggle.
