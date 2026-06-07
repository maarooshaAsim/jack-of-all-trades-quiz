import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon.jsx'
import { DecorativeStar } from '../components/DecorativeStar.jsx'
import { ResultGraph } from '../components/ResultGraph.jsx'
import { ResultPageShell } from '../components/ResultPageShell.jsx'
import { useResultTypes } from '../hooks/useResultTypes.js'

export function ExploreTypes() {
  const { resultTypes, isLoading, error } = useResultTypes()

  return (
        <ResultPageShell>
          <div className="mt-7 mb-7 flex w-full justify-start">
            <Link
              to="/"
              className="joat-button-motion inline-flex items-center"
              aria-label="Back to home"
            >
              <ArrowIcon
                direction="back"
                color="#1d1d1f"
                className="h-[2.35rem] w-[4.25rem]"
              />
            </Link>
          </div>

          <div className="mt-7 flex w-full flex-col items-center gap-10 pb-10">
            {resultTypes.map((resultType) => (
              <Link
                key={resultType.slug}
                to={`/explore/types/${resultType.slug}`}
                className="joat-button-motion group relative block w-full max-w-[292px] rounded-[14px] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#18161d]/30 min-[390px]:max-w-[320px]"
                style={{ color: resultType.accent_color }}
              >
                <div
                  className="relative rounded-[14px] my-5 px-5 pb-5 pt-6 text-center shadow-[0_7px_12px_rgba(0,0,0,0.22)]"
                  style={{ backgroundColor: resultType.base_color }}
                >
                  <DecorativeStar color={resultType.base_color} className="-left-8 -top-10" />
                  <DecorativeStar color={resultType.base_color} className="-right-8 -top-10" />

                  <h1 className="text-[1.05rem] font-black uppercase leading-none text-white min-[390px]:text-[1.2rem]">
                    {resultType.name}
                  </h1>

                  <div className="mt-5 w-full">
                    <ResultGraph graphPath={resultType.graph_path} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
    </ResultPageShell>
  )
}
