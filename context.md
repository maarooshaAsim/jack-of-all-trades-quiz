# Polymath Type Quiz — Project Briefing

> Share this file with Codex before starting any work session.
> It contains the full scope, decisions made, data models, and what to build first.

---

## Project overview

**"Jack of All Trades — The Polymath Type Quiz"** is a web-based personality/archetype quiz. Users answer 18 questions across 6 categories and receive 1 of 12 possible outcome archetypes. The client is a student project.

**Stack:** Laravel (API only, no Blade) + React (Vite) + SQLite (dev) / MySQL (prod)
**Hosting target (free tier):** React on Vercel, Laravel on Railway or Render

---

## What exists in the Figma

- Landing page: logo ("Jack of All Trades" graffiti style), tagline, colorful star decorations, two buttons — **"Explore Types"** and **"Begin"**
- Question screens: full-color background per category, logo at top, dark rounded card containing the question + 5 lettered options (A–E), arrow navigation at bottom
- Two info pages (linked from "Explore Types" on landing only — not in navbar)

---

## User flow

```
Landing page
  ├── "Explore Types" → Info Page 1 or Info Page 2 (back button returns to landing)
  └── "Begin" → Quiz (Q1 of 18)
        ↓ (forward / back arrows, one question at a time)
       Q18 answered → POST /api/submit
        ↓
       OutcomeCalculator (Laravel)
        ↓
       Result page (archetype title + graph image)
```

- No navbar on any page
- Info pages are only accessible from the landing page
- No conditional/branching questions — all 18 shown in fixed order to every user
- Every question is mandatory before the forward arrow is enabled
- On browser refresh mid-quiz: native `beforeunload` browser warning. If user leaves, progress is lost. No localStorage saving.

---

## Question format

All questions are **single-select, 5 options (A–E)**. No yes/no buttons, no text areas.

Each option has:
- A letter badge (A / B / C / D / E)
- Option text
- A score weight (defined per question in the config)

---

## Categories (6 total, 3 questions each = 18 questions)

| # | Category ID | Label | Background color |
|---|-------------|-------|-----------------|
| 1 | `engagement_pattern` | Engagement Pattern | `#5BBFEF` (blue) |
| 2 | `education` | Education & Credentials | `#F5C842` (yellow) — from Figma |
| 3–6 | TBC | Client to confirm | TBC |

> **Action needed:** Ask client for the remaining 4 category names and their colors.

---

## Questions config (hardcoded in React — NOT stored in DB)

Location: `src/config/questions.config.js`

```js
export const categories = [
  { id: 'engagement_pattern', label: 'Engagement Pattern', color: '#5BBFEF' },
  { id: 'education',          label: 'Education & Credentials', color: '#F5C842' },
  // ... 4 more
]

export const questions = [
  {
    id: 'ep_q1',
    category: 'engagement_pattern',
    text: 'When you pick up a new interest, what typically happens?',
    options: [
      { key: 'A', text: 'I explore it deeply for months or years before considering anything else.' },
      { key: 'B', text: 'I learn enough to understand how it works, then move on to something new.' },
      { key: 'C', text: 'I juggle several interests at once, rotating between them as energy shifts.' },
      { key: 'D', text: 'I explore widely but keep returning to one core skill to deepen it.' },
      { key: 'E', text: 'I start many things but rarely finish or consolidate any of them.' },
    ],
    scoringWeights: { A: 5, B: 4, C: 3, D: 2, E: 1 } // placeholder — confirm with client
  },
  // ... 17 more questions
]
```

> Questions and scoring weights are never fetched from the server.
> They live entirely in this file. Swap placeholder content for real content when client delivers it.

---

## Outcomes (12 total — seeded into DB)

Location: `database/seeders/OutcomeSeeder.php`

Each outcome has:
- `id` (1–12)
- `title` (archetype name)
- `description`
- `graph_image_path` (stored in `storage/app/public/graphs/`)
- `scoring_rules` (JSON — defines how category score totals map to this outcome)

> **Action needed:** Client to provide all 12 outcome titles, descriptions, graph images, and the scoring logic.

---

## Scoring logic (OutcomeCalculator)

Location: `app/Services/OutcomeCalculator.php`

Expected flow:
1. Receive array of 18 answers (each with `question_id`, `answer_key`, `score_value`, `category`)
2. Group answers by category
3. Sum `score_value` per category → 6 category scores
4. Match those 6 scores against `scoring_rules` JSON in the `outcomes` table
5. Return the single matching outcome (always exactly 1)

> The exact scoring/matching algorithm depends on client-provided rules. Build the structure now, wire the logic when rules are confirmed.

---

## Database schema

### `responses`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID primary | |
| `session_id` | string | random UUID generated on quiz start |
| `outcome_id` | tinyint nullable | FK → outcomes.id, set on completion |
| `ip_address` | string nullable | |
| `completed_at` | timestamp nullable | null = abandoned |
| `created_at` | timestamp | |

### `answers`
| Column | Type | Notes |
|--------|------|-------|
| `id` | bigint primary | |
| `response_id` | UUID | FK → responses.id |
| `question_id` | string | e.g. `'ep_q1'` |
| `category` | string | e.g. `'engagement_pattern'` |
| `answer_key` | string | `'A'` through `'E'` |
| `answer_text` | text | full option text (for readable export) |
| `score_value` | tinyint | |
| `question_index` | tinyint | 0–17 |

### `outcomes`
| Column | Type | Notes |
|--------|------|-------|
| `id` | tinyint primary (1–12) | |
| `title` | string | archetype name |
| `description` | text nullable | |
| `graph_image_path` | string nullable | |
| `scoring_rules` | JSON | TBC from client |

---

## API endpoints

### `POST /api/submit`
Accepts the full 18 answers in one request. Creates a `response` record + 18 `answer` records, runs `OutcomeCalculator`, updates `outcome_id`, returns the outcome object.

**Request body:**
```json
{
  "session_id": "uuid",
  "answers": [
    {
      "question_id": "ep_q1",
      "category": "engagement_pattern",
      "answer_key": "A",
      "answer_text": "I explore it deeply...",
      "score_value": 5,
      "question_index": 0
    }
  ]
}
```

**Response:**
```json
{
  "outcome": {
    "id": 3,
    "title": "The Deep Diver",
    "description": "...",
    "graph_image_path": "/storage/graphs/deep-diver.png"
  }
}
```

### `POST /api/admin/login`
Accepts `{ "password": "..." }`, checks against `ADMIN_PASSWORD` in `.env`, returns `{ "token": "..." }`.

### `GET /api/admin/export`
Protected by `AdminPasswordMiddleware` (Bearer token check).
Returns an `.xlsx` file download.
Uses `maatwebsite/excel`. One sheet, one row per completed response:
`session_id | completed_at | outcome_title | ep_q1_answer | ep_q1_key | ... | eq_q18_answer | eq_q18_key`

---

## Admin middleware

```php
// app/Http/Middleware/AdminPasswordMiddleware.php
public function handle(Request $request, Closure $next)
{
    $token = $request->bearerToken();
    if ($token !== config('app.admin_token')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    return $next($request);
}
```

Add to `.env`:
```
ADMIN_TOKEN=replace-with-something-secret
ADMIN_PASSWORD=replace-with-admin-password
```

---

## React project structure

```
src/
  config/
    questions.config.js     ← all 18 questions hardcoded here
    outcomes.config.js      ← optional local copy of outcome titles for Result page
  hooks/
    useQuiz.js              ← all quiz state (current index, answers, submit)
  pages/
    Landing.jsx             ← logo, stars, "Explore Types" + "Begin" buttons
    InfoPage.jsx            ← reusable, accepts type param, static content
    Quiz.jsx                ← renders current question, uses useQuiz hook
    Result.jsx              ← displays outcome after submit
    Admin.jsx               ← password gate + download button
  components/
    QuestionCard.jsx        ← dark rounded card, question text + options
    OptionButton.jsx        ← single A–E option row with letter badge
    NavArrows.jsx           ← prev / next arrows, next disabled if no answer
    Logo.jsx                ← the "Jack of All Trades" logo component
  App.jsx                   ← React Router routes
  main.jsx
```

### Routes
```jsx
<Route path="/"             element={<Landing />} />
<Route path="/explore/:type" element={<InfoPage />} />
<Route path="/quiz"         element={<Quiz />} />
<Route path="/result"       element={<Result />} />
<Route path="/admin"        element={<Admin />} />
```

---

## `useQuiz` hook

```js
// src/hooks/useQuiz.js
import { useState, useEffect } from 'react'
import { questions } from '../config/questions.config'
import axios from 'axios'

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers]           = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outcome, setOutcome]           = useState(null)

  const currentQuestion = questions[currentIndex]
  const isFirst         = currentIndex === 0
  const isLast          = currentIndex === questions.length - 1
  const hasAnswered     = !!answers[currentQuestion?.id]

  // Warn on refresh/close while quiz is in progress
  useEffect(() => {
    const warn = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])

  const selectAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const goNext = () => { if (!isLast) setCurrentIndex(i => i + 1) }
  const goPrev = () => { if (!isFirst) setCurrentIndex(i => i - 1) }

  const submit = async () => {
    setIsSubmitting(true)
    const payload = {
      session_id: crypto.randomUUID(),
      answers: questions.map((q, index) => ({
        question_id:   q.id,
        category:      q.category,
        answer_key:    answers[q.id].key,
        answer_text:   answers[q.id].text,
        score_value:   q.scoringWeights[answers[q.id].key],
        question_index: index,
      }))
    }
    const { data } = await axios.post('/api/submit', payload)
    setOutcome(data.outcome)
    setIsSubmitting(false)
    return data.outcome
  }

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    hasAnswered,
    isFirst,
    isLast,
    isSubmitting,
    outcome,
    selectAnswer,
    goNext,
    goPrev,
    submit,
  }
}
```

---

## What you can build right now (no client content needed)

- [ ] Laravel: create project, install `sanctum` + `maatwebsite/excel`
- [ ] Laravel: write all 3 migrations and run them
- [ ] Laravel: stub `SubmitController@store` and `AdminController@export` (return `['status' => 'ok']`)
- [ ] Laravel: write `AdminPasswordMiddleware`
- [ ] Laravel: register all routes in `api.php`
- [ ] React: create Vite project, install `react-router-dom axios zustand`
- [ ] React: create folder structure above
- [ ] React: build `useQuiz.js` hook (fully possible with placeholder questions)
- [ ] React: build `QuestionCard.jsx` and `OptionButton.jsx` with placeholder content
- [ ] React: build `NavArrows.jsx` (disabled state when no answer selected)
- [ ] React: build `Quiz.jsx` wired to `useQuiz` — background color switches per category
- [ ] React: build `Landing.jsx` layout (logo, two buttons, star decorations)
- [ ] React: scaffold all routes in `App.jsx`

## What to wait on (blocked on client)

- [ ] All 6 category names, colors, and question content → fill `questions.config.js`
- [ ] Scoring/outcome mapping logic → `OutcomeCalculator.php`
- [ ] 12 outcome titles, descriptions, graph images → `OutcomeSeeder.php` + `Result.jsx`
- [ ] Text and images for the 2 info pages → `InfoPage.jsx`

---

## Key decisions already made

| Decision | Choice |
|----------|--------|
| Question format | Single-select A–E only (no yes/no, no textarea) |
| Question storage | Hardcoded in React config — not in DB |
| Outcomes | 12 total, always exactly 1 returned |
| Progress saving | None — browser `beforeunload` warning only |
| Admin auth | Single hardcoded token in `.env` — no auth package |
| Admin UI | Password field + one Download Excel button only |
| Info page access | Landing page only — no navbar |
| DB (dev) | SQLite |
| DB (prod) | MySQL (PlanetScale free tier or Railway) |
| Hosting | Vercel (React) + Railway/Render (Laravel) — all free tier |
