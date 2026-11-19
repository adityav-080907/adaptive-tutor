# 🎓 AIRAVATA: Adaptive Tutor

**Live demo:** https://adaptive-tutor-rosy.vercel.app

AIRAVATA is an adaptive learning tutor. It checks how a student understands a topic, then changes how it teaches. It started as a 24-hour hackathon project (Track ED-02, The Adaptive Tutor) and is now developed as a personal project. Current subject: [SQL / list the subjects that really work].

## How it works

1. **Teach:** a short, reviewed lesson card for each topic.
2. **Check:** questions whose wrong answers are tagged with known misconceptions.
3. **Adapt:** the tutor moves the student between two paths:
   - **Fast-track** when mastery is high.
   - **Guided remediation** with worked examples when it is low.

## Features

- **Mastery tracking** with Bayesian Knowledge Tracing: a mastery probability for each learning objective, shown as live progress.
- **"Tutor Brain" panel:** shows why each next activity was chosen, so the adaptive rules are visible and explained.
- **Challenge this explanation:** learners can question an explanation instead of just accepting it.
- **Optional AI rephrasing:** paste your own Google Gemini API key in Settings, and the tutor can restate a reviewed explanation in a different style (analogy, simple words, step by step, Socratic). The AI is only asked to reword reviewed content. The key is stored in your browser only.
- **Fallback without a key:** [CONFIRM: the app uses pre-written reviewed explanations when no key is set].
- **Listen button** using the browser's built-in speech feature.
- **Math rendering** with KaTeX.

## Limitations

- Content is limited to [subjects/topics you actually have]. More subjects are planned.
- AI rephrasing is optional and can still make mistakes. Reviewed content is the source of truth.
- Not yet tested with real learners, so no learning-outcome claims are made.
- [Add anything else that is unfinished.]

## Run it locally

```bash
git clone https://github.com/adityav-080907/adaptive-tutor.git
cd adaptive-tutor
npm install
npm run dev
```

Then open http://localhost:5173/ in your browser.

## Project structure

- `src/engine/bktEngine.ts`: Bayesian Knowledge Tracing and the adaptive rules.
- `src/data/curriculumData.ts`: the reviewed question bank with misconception tags.
- `src/services/llmService.ts`: optional Gemini rephrasing and fallbacks.
- `src/components/`: the interface (landing page, dashboard, lessons, questions and feedback, Tutor Brain drawer, challenge dialog).
- `src/types.ts`: shared TypeScript types.
