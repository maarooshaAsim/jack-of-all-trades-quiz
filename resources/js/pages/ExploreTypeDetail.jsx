import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon.jsx'
import { DecorativeStar } from '../components/DecorativeStar.jsx'
import { ResultGraph } from '../components/ResultGraph.jsx'
import { ResultPageShell } from '../components/ResultPageShell.jsx'
import { useResultType } from '../hooks/useResultTypes.js'

const dimensions = [
  { key: 'breadth', label: 'Breadth' },
  { key: 'depth', label: 'Depth' },
  { key: 'integration', label: 'Integration' },
  { key: 'output', label: 'Output' },
  { key: 'recognition', label: 'Recognition' },
]

function PercentCard({ label, value }) {
  return (
    <div className="w-full max-w-[200px] rounded-[0.85rem] bg-[#1d1d1f] px-3 py-3 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.24)] sm:px-4">
      <p className="text-[0.92rem] font-black leading-tight sm:text-[1.2rem]">{label}</p>
      <p className="mt-1 text-[1.45rem] font-black leading-none sm:text-[2rem]">{value}%</p>
    </div>
  )
}

function CopyBlock({ title, children }) {
  return (
    <section className="mx-auto max-w-[449px] space-y-3">
      <h2 className="text-[1.35rem] font-black leading-none sm:text-[1.75rem]">{title}</h2>
      <div className="rounded-[1rem] bg-[#1d1d1f] px-4 py-4 text-[0.96rem] font-semibold leading-7 text-[#edecec] shadow-[0_4px_8px_rgba(0,0,0,0.22)] sm:px-6 sm:py-5 sm:text-[1.12rem] sm:leading-8">
        {children}
      </div>
    </section>
  )
}

export function ResultTypeDetailContent({
  resultType,
  quizResult = null,
  showBackLink = true,
  showBranches = true,
  actions = null,
}) {
  return (
    <div className="mt-12 w-full pb-14 sm:mt-18 sm:pb-16" style={{ color: resultType.accent_color }}>
      <section
        className="relative mx-auto flex aspect-square w-full max-w-[449px] flex-col items-center justify-center rounded-[1rem] px-3 py-7 text-center text-white shadow-[0_7px_12px_rgba(0,0,0,0.24)] sm:px-7 sm:py-8"
        style={{ backgroundColor: resultType.base_color }}
      >
        <DecorativeStar color={resultType.base_color} className="-top-10 -left-10" />
        <DecorativeStar color={resultType.base_color} className="-top-10 -right-10" />
        <h1 className="text-[1.28rem] font-black uppercase leading-none sm:text-[1.85rem]">{resultType.name}</h1>
        <div className="mt-4 w-full sm:mt-5">
          <ResultGraph graphPath={resultType.graph_path} />
        </div>
      </section>

      {quizResult ? (
        <section className="mx-auto mt-6 grid w-full max-w-[449px] grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
          {quizResult.participant ? (
            <div className="col-span-2 rounded-[0.9rem] bg-white px-4 py-4 text-center shadow-[0_4px_8px_rgba(0,0,0,0.12)] sm:px-5">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] sm:text-[0.72rem] sm:tracking-[0.18em]">Quiz Taker</p>
              <p className="mt-2 text-[1.25rem] font-black leading-none text-[#1d1d1f] sm:text-[1.55rem]">
                {quizResult.participant.name}
              </p>
              <p className="mt-2 text-[0.95rem] font-semibold text-[#1d1d1f]/70">
                Age {quizResult.participant.age}
              </p>
            </div>
          ) : null}
          <div className="rounded-[0.9rem] bg-[#1d1d1f] px-3 py-4 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.22)] sm:px-4">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/60 sm:text-[0.72rem] sm:tracking-[0.18em]">Your Score</p>
            <p className="mt-1 text-[1.7rem] font-black leading-none sm:text-[2rem]">{quizResult.total_score}</p>
          </div>
          <div className="rounded-[0.9rem] bg-[#1d1d1f] px-3 py-4 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.22)] sm:px-4">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/60 sm:text-[0.72rem] sm:tracking-[0.18em]">Score Range</p>
            <p className="mt-2 text-[1.08rem] font-black leading-none sm:text-[1.25rem]">{quizResult.outcome.score_range}</p>
          </div>
          <div className="col-span-2 rounded-[0.9rem] bg-white px-4 py-4 text-left shadow-[0_4px_8px_rgba(0,0,0,0.12)] sm:px-5">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] sm:text-[0.72rem] sm:tracking-[0.18em]">Quiz Match</p>
            <p className="mt-2 text-[0.95rem] font-semibold leading-6 text-[#1d1d1f] sm:text-[1rem]">
              Your answers matched the {quizResult.outcome.base_type} branch: {quizResult.outcome.branch}.
            </p>
          </div>
        </section>
      ) : null}

      <section className="mt-7 space-y-3 sm:mt-8">
        <h2 className="text-[1.38rem] font-black leading-none sm:text-[1.85rem]">Your Profile</h2>
        <div
          className="mx-auto flex min-h-[240px] w-full max-w-[449px] items-center rounded-[1rem] px-4 py-5 text-[0.96rem] font-semibold leading-7 text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] sm:min-h-[287px] sm:px-7 sm:text-[1.12rem] sm:leading-8"
          style={{ backgroundColor: resultType.base_color }}
        >
          {resultType.description}
        </div>
      </section>

      <section className="mx-auto mt-7 grid w-full max-w-[416px] grid-cols-2 justify-items-center gap-3 sm:mt-8 sm:gap-4">
        {dimensions.map((dimension) => (
          <PercentCard
            key={dimension.key}
            label={dimension.label}
            value={resultType[dimension.key].percentage}
          />
        ))}
      </section>

      <div className="mt-9 space-y-8">
        {dimensions.map((dimension) => (
          <CopyBlock key={dimension.key} title={dimension.label}>
            {resultType[dimension.key].description}
          </CopyBlock>
        ))}
      </div>

      {showBranches && resultType.branches.length > 0 ? (
        <section className="mx-auto mt-9 max-w-[449px] space-y-4">
          <h2 className="text-[1.55rem] font-black uppercase leading-none sm:text-[1.85rem]">Branches</h2>
          <div className="space-y-4">
            {resultType.branches.map((branch) => (
              <Link
                key={branch.slug}
                to={`/explore/types/${branch.slug}`}
                className="block rounded-[0.9rem] px-4 py-5 text-center text-[1.45rem] font-black uppercase leading-none text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] sm:text-[1.9rem]"
                style={{ backgroundColor: resultType.base_color }}
              >
                {branch.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {actions ? <div className="mx-auto mt-9 max-w-[449px]">{actions}</div> : null}

      {showBackLink ? (
        <Link
          to="/explore/types"
          className="mt-10 inline-flex items-center"
          aria-label="Back to result types"
        >
          <ArrowIcon direction="back" color="#1d1d1f" />
        </Link>
      ) : null}
    </div>
  )
}

export function ExploreTypeDetail() {
  const { baseType } = useParams()
  const { resultType, isLoading, error } = useResultType(baseType)

  if (isLoading || error || !resultType) {
    return (
      <ResultPageShell>
        <div className="mt-14 w-full pb-24 sm:mt-18">
          <p className="rounded-[1rem] bg-[#1d1d1f] px-6 py-5 text-center text-xl font-black text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)]">
            {error ?? 'Loading type'}
          </p>
        </div>
      </ResultPageShell>
    )
  }

  return (
    <ResultPageShell>
      <ResultTypeDetailContent resultType={resultType} />
    </ResultPageShell>
  )
}
