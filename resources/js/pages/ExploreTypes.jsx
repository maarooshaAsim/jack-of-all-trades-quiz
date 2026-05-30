import React from 'react'
import { Link } from 'react-router-dom'
import { ResultPageShell } from '../components/ResultPageShell.jsx'
import { useResultTypes } from '../hooks/useResultTypes.js'

export function ExploreTypes() {
  const { resultTypes, isLoading, error } = useResultTypes()

  return (
    <ResultPageShell>
      <div className="mt-14 w-full space-y-8 pb-20 sm:mt-18">
        {isLoading ? (
          <p className="rounded-[1rem] bg-[#1d1d1f] px-6 py-5 text-center text-xl font-black text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)]">
            Loading types
          </p>
        ) : null}

        {error ? (
          <p className="rounded-[1rem] bg-[#1d1d1f] px-6 py-5 text-center text-xl font-black text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)]">
            {error}
          </p>
        ) : null}

        {resultTypes.map((resultType) => (
          <Link
            key={resultType.slug}
            to={`/explore/types/${resultType.slug}`}
            className="group relative block w-full rounded-[1.25rem] transition hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#18161d]/30"
            style={{ color: resultType.accent_color }}
          >
            <div
              className="relative overflow-hidden rounded-[1.25rem] px-7 pt-9 pb-7 text-center shadow-[0_7px_12px_rgba(0,0,0,0.22)]"
              style={{ backgroundColor: resultType.base_color }}
            >
              <h1 className="text-[1.85rem] font-black uppercase leading-none text-white sm:text-[2.45rem]">
                {resultType.name}
              </h1>
              <div className="mx-auto mt-8 aspect-[1.3] max-h-[16rem] w-full max-w-[25rem] overflow-hidden">
                <img
                  src={resultType.graph_path}
                  alt=""
                  className="h-full w-full object-contain object-top drop-shadow-[0_4px_0_rgba(255,255,255,0.36)]"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ResultPageShell>
  )
}
