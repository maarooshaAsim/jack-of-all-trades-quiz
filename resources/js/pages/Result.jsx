import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { ResultTotals } from '../components/ResultTotals.jsx'
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

  const totals = result.dimension_totals

  return (
    <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-8 max-w-4xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-6 shadow-[8px_8px_0_0_#18161d] sm:mt-10 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result</p>
        <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">Your scoring breakdown</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#3a3348] sm:text-lg sm:leading-8">
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
