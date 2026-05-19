import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { categories } from './config/questions.config.js'
import { useQuiz } from './hooks/useQuiz.js'

const logoDarkPath = '/storage/assets/joat_logo_dark.png'
const landingStarsPath = '/storage/assets/landing_page_bg_stars.svg'
const questionStarsPath = '/storage/assets/question_page_bg_stars.svg'

function Shell({ children, tone = 'from-[#fffaf2] via-[#fffdf8] to-[#fff7eb]', fullBleed = false }) {
  return (
    <main className={`min-h-screen bg-gradient-to-br ${tone} text-[#18161d]`}>
      <div
        className={
          fullBleed
            ? 'flex min-h-screen w-full flex-col'
            : 'mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 md:px-8'
        }
      >
        {children}
      </div>
    </main>
  )
}

function Logo() {
  return (
    <img src={logoDarkPath} alt="Jack of All Trades" className="h-auto w-full max-w-[21rem] sm:max-w-[24rem]" />
  )
}

function Landing() {
  return (
    <Shell tone="from-[#fbfbfa] via-[#fffdf9] to-[#f8f8f7]" fullBleed>
      <section className="relative flex min-h-screen flex-1 flex-col items-center justify-between overflow-hidden bg-white px-5 py-6 text-center sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.82]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 12.5rem',
            backgroundSize: '52rem auto',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[7.2rem] h-[13rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.54)_38%,rgba(255,255,255,0.2)_72%,rgba(255,255,255,0)_100%)] sm:top-[8.5rem] sm:h-[14rem]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.1)_62%,rgba(255,255,255,0.14)_100%)] sm:top-[12rem]" />

        <div className="relative flex w-full justify-center">
          <Logo />
        </div>

        <div className="relative flex w-full max-w-[22rem] flex-1 flex-col items-center justify-center py-8 sm:max-w-[25rem] sm:py-10">
          <div className="-mt-5 rounded-[3.2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_38%,rgba(255,255,255,0.94)_56%,rgba(255,255,255,0.76)_72%,rgba(255,255,255,0.42)_88%,rgba(255,255,255,0.12)_97%,rgba(255,255,255,0)_100%)] px-10 pt-14 pb-10 sm:-mt-6 sm:px-12 sm:pt-16 sm:pb-11">
            <h1 className="text-[1.7rem] font-black uppercase tracking-[-0.04em] text-[#18161d] sm:text-[2rem]">
              The Polymath Type Quiz
            </h1>
            <div className="mt-6 space-y-3 text-[0.95rem] leading-6 text-[#33303a] sm:text-base">
              <p>Discover your archetype in the tension between mastery and exploration.</p>
              <p>Are you a Deep Diver or an Infinite Explorer? A T-Shaped Bridge or a Renaissance Weaver.</p>
              <p>18 questions. No right answers. Just honest self reflection.</p>
            </div>
          </div>
        </div>

        <div className="relative grid w-full max-w-[20rem] grid-cols-2 gap-5 pb-3 sm:max-w-[22rem]">
          <Link
            to="/explore/types"
            className="inline-flex min-h-[3.65rem] items-center justify-center rounded-[0.8rem] bg-[#1d1d1f] px-4 text-base font-semibold text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)] transition hover:translate-y-[1px]"
          >
            Explore Types
          </Link>
          <Link
            to="/quiz"
            className="inline-flex min-h-[3.65rem] items-center justify-center rounded-[0.8rem] bg-[linear-gradient(90deg,#62b9ff_0%,#7db0ff_22%,#ff4a71_62%,#ffcc00_100%)] px-4 text-[1.45rem] font-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)] transition hover:translate-y-[1px]"
          >
            Begin
          </Link>
        </div>
      </section>
    </Shell>
  )
}

function InfoPage() {
  const { type } = useParams()

  return (
    <Shell tone="from-[#e9f7ff] via-[#fff9f1] to-[#fff1cf]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Explore</p>
        <h1 className="mt-3 text-4xl font-black uppercase">{type === 'about' ? 'About the quiz' : 'Explore the types'}</h1>
        <p className="mt-6 text-lg leading-8 text-[#3a3348]">
          This page is a placeholder until the client delivers the final copy and images. Routing is working, and this
          is where the static info content will live.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full border-2 border-[#18161d] bg-[#18161d] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white"
        >
          Back
        </Link>
      </div>
    </Shell>
  )
}

function getCategoryMeta(categoryId) {
  return categories.find((category) => category.id === categoryId) ?? categories[0]
}

function QuizOption({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-4 rounded-[1.35rem] border-2 px-4 py-4 text-left transition sm:px-5 ${
        isSelected
          ? 'border-[#f5c842] bg-white text-[#18161d] shadow-[0_8px_24px_rgba(245,200,66,0.26)]'
          : 'border-white/18 bg-white/10 text-white hover:border-white/40 hover:bg-white/14'
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black ${
          isSelected ? 'border-[#18161d] bg-[#f5c842] text-[#18161d]' : 'border-white/65 bg-white/12 text-white'
        }`}
      >
        {option.key}
      </span>
      <span className="text-[0.98rem] leading-6 sm:text-[1.02rem]">{option.text}</span>
    </button>
  )
}

function Quiz() {
  const navigate = useNavigate()
  const {
    answers,
    currentIndex,
    currentQuestion,
    goNext,
    goPrev,
    hasAnswered,
    isFirst,
    isLast,
    isSubmitting,
    selectAnswer,
    submit,
    totalQuestions,
  } = useQuiz()
  const [submitError, setSubmitError] = useState(null)

  const currentAnswer = answers[currentQuestion.id]
  const category = getCategoryMeta(currentQuestion.category)
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  const handleAdvance = async () => {
    if (!hasAnswered || isSubmitting) {
      return
    }

    if (!isLast) {
      goNext()
      return
    }

    setSubmitError(null)

    try {
      const result = await submit()

      navigate('/result', {
        state: {
          result,
        },
      })
    } catch (error) {
      setSubmitError('Could not submit your quiz right now. Please try again.')
    }
  }

  return (
    <Shell tone="from-[#ecfbff] via-[#f8ffff] to-[#fffdf7]">
      <section
        className="relative min-h-screen overflow-hidden rounded-[1.75rem] px-4 py-5 sm:px-6 sm:py-6"
        style={{ backgroundColor: category.color }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.7]"
          style={{ backgroundImage: `url(${questionStarsPath})`, backgroundSize: '60rem auto' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_32%,rgba(0,0,0,0.08)_100%)]" />

        <div className="relative flex min-h-[calc(100vh-2.5rem)] flex-col">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="mx-auto mt-6 w-full max-w-3xl">
            <div className="flex items-center justify-between text-[0.7rem] font-black uppercase tracking-[0.22em] text-[#18161d]/75 sm:text-xs">
              <span>{category.label}</span>
              <span>
                {currentIndex + 1}/{totalQuestions}
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/35">
              <div
                className="h-full rounded-full bg-[#18161d] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-8 sm:py-10">
            <div className="rounded-[2rem] bg-[#221d30] px-5 py-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:px-7 sm:py-8">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f5c842]">Question {currentIndex + 1}</p>
              <h1 className="mt-4 text-[1.7rem] font-black leading-tight sm:text-[2.2rem]">
                {currentQuestion.text}
              </h1>

              <div className="mt-7 space-y-3">
                {currentQuestion.options.map((option) => (
                  <QuizOption
                    key={option.key}
                    option={option}
                    isSelected={currentAnswer?.key === option.key}
                    onSelect={() => selectAnswer(currentQuestion.id, option)}
                  />
                ))}
              </div>

              {submitError ? (
                <p className="mt-5 text-sm font-semibold text-[#ffb1b1]">{submitError}</p>
              ) : null}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 pb-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirst || isSubmitting}
              className="inline-flex min-h-[3.7rem] min-w-[5.5rem] items-center justify-center rounded-full border-2 border-[#18161d] bg-white/70 px-5 text-sm font-black uppercase tracking-[0.22em] text-[#18161d] shadow-[0_6px_16px_rgba(0,0,0,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleAdvance}
              disabled={!hasAnswered || isSubmitting}
              className="inline-flex min-h-[3.9rem] min-w-[8rem] items-center justify-center rounded-full border-2 border-[#18161d] bg-[#18161d] px-6 text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] disabled:cursor-not-allowed disabled:bg-[#18161d]/45"
            >
              {isSubmitting ? 'Submitting' : isLast ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </section>
    </Shell>
  )
}

function ResultTotals({ label, value }) {
  return (
    <div className="rounded-[1.3rem] border-2 border-[#18161d] bg-white/85 px-4 py-4 shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
      <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[#5b6170]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#18161d]">{value}</p>
    </div>
  )
}

function Result() {
  const location = useLocation()
  const result = location.state?.result

  if (!result) {
    return (
      <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
        <div className="flex justify-center sm:justify-start">
          <Logo />
        </div>
        <div className="mt-10 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result</p>
          <h1 className="mt-3 text-4xl font-black uppercase">No result loaded</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#3a3348]">
            Complete the quiz first so the app can calculate and display your dimension totals.
          </p>
          <Link
            to="/quiz"
            className="mt-8 inline-flex rounded-full border-2 border-[#18161d] bg-[#18161d] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white"
          >
            Start Quiz
          </Link>
        </div>
      </Shell>
    )
  }

  const totals = result.dimension_totals

  return (
    <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-4xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Your scoring breakdown</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#3a3348]">
          Outcome thresholds are still pending from the client, so this screen currently shows the full five-dimension
          total plus the placeholder outcome id returned by Laravel.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultTotals label="Breadth" value={totals.breadth} />
          <ResultTotals label="Depth" value={totals.depth} />
          <ResultTotals label="Integration" value={totals.integration} />
          <ResultTotals label="Output" value={totals.output} />
          <ResultTotals label="Recognition" value={totals.recognition} />
          <ResultTotals label="Grand Total" value={result.grand_total} />
        </div>

        <div className="mt-8 rounded-[1.6rem] border-2 border-[#18161d] bg-[#18161d] px-6 py-5 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f5c842]">Current outcome</p>
          <p className="mt-2 text-3xl font-black">Placeholder Outcome #{result.outcome_id}</p>
        </div>

        <Link
          to="/quiz"
          className="mt-8 inline-flex rounded-full border-2 border-[#18161d] bg-[#18161d] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white"
        >
          Retake Quiz
        </Link>
      </div>
    </Shell>
  )
}

function Admin() {
  return (
    <Shell tone="from-[#f6f0ff] via-[#fff9f1] to-[#f6fffa]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-2xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Admin Placeholder</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Export access UI goes here</h1>
      </div>
    </Shell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Landing />} />
        <Route path="/explore/:type" element={<InfoPage />} />
        <Route path="/quiz"          element={<Quiz />} />
        <Route path="/result"        element={<Result />} />
        <Route path="/admin"         element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
