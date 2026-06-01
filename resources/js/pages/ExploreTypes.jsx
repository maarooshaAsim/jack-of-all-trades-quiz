import React from 'react'
import { Link } from 'react-router-dom'
import { DecorativeStar } from '../components/DecorativeStar.jsx'
import { ResultGraphPlaceholder } from '../components/ResultGraphPlaceholder.jsx'
import { ResultPageShell } from '../components/ResultPageShell.jsx'
import { useResultTypes } from '../hooks/useResultTypes.js'

export function ExploreTypes() {
  const { resultTypes, isLoading, error } = useResultTypes()

  return (
    <ResultPageShell>
      <div className="mt-20 flex w-full flex-col items-center space-y-20 pb-20 sm:mt-24">
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
            className="group relative block w-full max-w-[23rem] rounded-[1.15rem] transition hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#18161d]/30 sm:max-w-[25rem]"
            style={{ color: resultType.accent_color }}
          >
            <div
              className="relative rounded-[1rem] px-4 pt-5 pb-5 text-center shadow-[0_7px_12px_rgba(0,0,0,0.22)] sm:px-5 sm:pt-6"
              style={{ backgroundColor: resultType.base_color }}
            >
              <DecorativeStar color={resultType.base_color} className="-top-10 -left-10" />
              <DecorativeStar color={resultType.base_color} className="-top-10 -right-10" />
              <h1 className="text-[1.35rem] font-black uppercase leading-none text-white sm:text-[1.75rem]">
                {resultType.name}
              </h1>
              <div className="mt-5">
                <ResultGraphPlaceholder accentColor={resultType.accent_color} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ResultPageShell>
  )
}
