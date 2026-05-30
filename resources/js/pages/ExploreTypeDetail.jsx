import React from 'react'
import { Link, useParams } from 'react-router-dom'
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
    <div className="rounded-[1rem] bg-[#1d1d1f] px-5 py-4 text-center text-white shadow-[0_5px_9px_rgba(0,0,0,0.28)]">
      <p className="text-[1.25rem] font-black leading-tight sm:text-[1.45rem]">{label}</p>
      <p className="mt-1 text-[2.1rem] font-black leading-none sm:text-[2.55rem]">{value}%</p>
    </div>
  )
}

function CopyBlock({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-[1.75rem] font-black leading-none sm:text-[2rem]">{title}</h2>
      <div className="rounded-[1.25rem] bg-[#1d1d1f] px-6 py-6 text-[1.08rem] font-semibold leading-7 text-[#edecec] shadow-[0_5px_9px_rgba(0,0,0,0.25)] sm:px-8 sm:text-[1.28rem] sm:leading-8">
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
      <div className="mt-14 w-full pb-24 sm:mt-18" style={{ color: resultType.accent_color }}>
        <section
          className="relative overflow-hidden rounded-[1.25rem] px-6 pt-9 pb-8 text-center text-white shadow-[0_7px_12px_rgba(0,0,0,0.24)]"
          style={{ backgroundColor: resultType.base_color }}
        >
          <h1 className="text-[1.95rem] font-black uppercase leading-none sm:text-[2.55rem]">{resultType.name}</h1>
          <div className="mx-auto mt-8 aspect-[1.08] w-full max-w-[25rem] overflow-hidden">
            <img src={resultType.graph_path} alt="" className="h-full w-full object-contain object-top" />
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-[1.8rem] font-black leading-none sm:text-[2.1rem]">Your Profile</h2>
          <div
            className="rounded-[1.25rem] px-6 py-7 text-[1.18rem] font-semibold leading-8 text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)] sm:px-8 sm:text-[1.35rem] sm:leading-9"
            style={{ backgroundColor: resultType.base_color }}
          >
            {resultType.description}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-2 gap-5">
          {dimensions.map((dimension) => (
            <PercentCard
              key={dimension.key}
              label={dimension.label}
              value={resultType[dimension.key].percentage}
            />
          ))}
        </section>

        <div className="mt-12 space-y-12">
          {dimensions.map((dimension) => (
            <CopyBlock key={dimension.key} title={dimension.label}>
              {resultType[dimension.key].description}
            </CopyBlock>
          ))}
        </div>

        <section className="mt-12 space-y-5">
          <h2 className="text-[1.8rem] font-black uppercase leading-none sm:text-[2.1rem]">Branches</h2>
          <div className="space-y-5">
            {resultType.branches.map((branch) => (
              <Link
                key={branch.slug}
                to={`/explore/types/${branch.slug}`}
                className="block rounded-[1rem] px-5 py-6 text-center text-[1.75rem] font-black uppercase leading-none text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)] sm:text-[2.35rem]"
                style={{ backgroundColor: resultType.base_color }}
              >
                {branch.name}
              </Link>
            ))}
          </div>
        </section>

        <Link
          to="/explore/types"
          className="mt-10 inline-flex items-center text-[1.9rem] font-black leading-none text-[#1d1d1f]"
          aria-label="Back to result types"
        >
          ←
        </Link>
      </div>
    </ResultPageShell>
  )
}
