import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'

export function Result() {
  const location = useLocation()
  const result = location.state?.result

  if (!result) {
    return (
      <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
        <div className="flex justify-center sm:justify-start">
          <Logo />
        </div>
        <div className="mt-8 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-6 shadow-[8px_8px_0_0_#18161d] sm:mt-10 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result</p>
          <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">No result loaded</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3a3348] sm:text-lg sm:leading-8">
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

  const outcome = result.outcome

  return (
    <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-8 max-w-4xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-6 shadow-[8px_8px_0_0_#18161d] sm:mt-10 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result</p>
        <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">Your scoring breakdown</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#3a3348] sm:text-lg sm:leading-8">
          Your answer scores have been summed and matched against the result ranges from the score type link.
        </p>

        <div className="mt-8 rounded-[1.3rem] border-2 border-[#18161d] bg-white/85 px-5 py-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
          <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[#5b6170]">Total Score</p>
          <p className="mt-2 text-4xl font-black text-[#18161d]">{result.total_score}</p>
        </div>

        <div className="mt-8 rounded-[1.6rem] border-2 border-[#18161d] bg-[#18161d] px-6 py-5 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f5c842]">{outcome.base_type}</p>
          <p className="mt-2 text-3xl font-black">{outcome.branch}</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
            Score range {outcome.score_range}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/82">{outcome.description}</p>
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
