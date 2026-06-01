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
    <div className="w-full max-w-[200px] rounded-[0.85rem] bg-[#1d1d1f] px-4 py-3 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.24)]">
      <p className="text-[1.05rem] font-black leading-tight sm:text-[1.2rem]">{label}</p>
      <p className="mt-1 text-[1.7rem] font-black leading-none sm:text-[2rem]">{value}%</p>
    </div>
  )
}

function CopyBlock({ title, children }) {
  return (
    <section className="mx-auto max-w-[449px] space-y-3">
      <h2 className="text-[1.5rem] font-black leading-none sm:text-[1.75rem]">{title}</h2>
      <div className="rounded-[1rem] bg-[#1d1d1f] px-5 py-5 text-[1rem] font-semibold leading-7 text-[#edecec] shadow-[0_4px_8px_rgba(0,0,0,0.22)] sm:px-6 sm:text-[1.12rem] sm:leading-8">
        {children}
      </div>
    </section>
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
      <div className="mt-16 w-full pb-16 sm:mt-18" style={{ color: resultType.accent_color }}>
        <section
          className="relative mx-auto flex aspect-square w-full max-w-[449px] flex-col items-center justify-center rounded-[1rem] px-4 py-8 text-center text-white shadow-[0_7px_12px_rgba(0,0,0,0.24)] sm:px-7"
          style={{ backgroundColor: resultType.base_color }}
        >
          <DecorativeStar color={resultType.base_color} className="-top-10 -left-10" />
          <DecorativeStar color={resultType.base_color} className="-top-10 -right-10" />
          <h1 className="text-[1.45rem] font-black uppercase leading-none sm:text-[1.85rem]">{resultType.name}</h1>
          <div className="mt-5 w-full">
            <ResultGraph graphPath={resultType.graph_path} />
          </div>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-[1.55rem] font-black leading-none sm:text-[1.85rem]">Your Profile</h2>
          <div
            className="mx-auto flex min-h-[287px] w-full max-w-[449px] items-center rounded-[1rem] px-5 py-5 text-[1rem] font-semibold leading-7 text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] sm:px-7 sm:text-[1.12rem] sm:leading-8"
            style={{ backgroundColor: resultType.base_color }}
          >
            {resultType.description}
          </div>
        </section>

        <section className="mx-auto mt-8 grid w-full max-w-[416px] grid-cols-2 justify-items-center gap-4">
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

        <Link
          to="/explore/types"
          className="mt-10 inline-flex items-center"
          aria-label="Back to result types"
        >
          <ArrowIcon direction="back" color="#1d1d1f" />
        </Link>
      </div>
    </ResultPageShell>
  )
}
