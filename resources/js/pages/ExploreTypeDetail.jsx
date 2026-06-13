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

function PercentCard({ label, value, variant = 'explore' }) {
  const isResult = variant === 'result'

  return (
    <div className={`w-full rounded-[0.85rem] bg-[#1d1d1f] px-2.5 py-3 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.24)] ${isResult ? 'max-w-[200px]' : ''}`}>
      <p className="text-[0.82rem] font-black leading-tight min-[380px]:text-[0.92rem]">{label}</p>
      <p className="mt-1 text-[1.35rem] font-black leading-none min-[380px]:text-[1.65rem]">{value}%</p>
    </div>
  )
}

function CopyBlock({ title, children, variant = 'explore' }) {
  const isResult = variant === 'result'

  return (
    <section className={`mx-auto space-y-3 text-left ${isResult ? 'max-w-[449px]' : 'max-w-[292px] min-[390px]:max-w-[320px]'}`}>
      <h2 className="text-center text-[1.35rem] font-black leading-none min-[390px]:text-[1.65rem]">{title}</h2>
      <div className={`rounded-[1rem] bg-[#1d1d1f] text-[#edecec] shadow-[0_4px_8px_rgba(0,0,0,0.22)] ${isResult ? 'px-5 py-5 text-[1rem] font-semibold leading-7 min-[390px]:px-6 min-[390px]:text-[1.08rem] min-[390px]:leading-8' : 'px-4 py-4 text-[0.9rem] font-semibold leading-6 min-[380px]:text-[0.96rem] min-[380px]:leading-7'}`}>
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
  variant = 'explore',
}) {
  const isResult = variant === 'result'

  return (
    <div className="mt-7 w-full pb-10" style={{ color: resultType.accent_color }}>
            {showBackLink ? (
              <div className="mb-14 flex w-full justify-start">
                <Link
                  to="/explore/types"
                  className="joat-button-motion inline-flex items-center"
                  aria-label="Back to result types"
                >
                  <ArrowIcon
                    direction="back"
                    color="#1d1d1f"
                    className="h-[2.35rem] w-[4.25rem]"
                  />
                </Link>
              </div>
            ) : null}

      <section
        className={`relative mx-auto flex aspect-square w-full flex-col items-center justify-center rounded-[14px] text-center text-white shadow-[0_7px_12px_rgba(0,0,0,0.22)] ${isResult ? 'max-w-[449px] px-5 pb-7 pt-8 min-[390px]:px-7 min-[390px]:pt-10' : 'max-w-[292px] px-5 pb-5 pt-6 min-[390px]:max-w-[320px]'}`}
        style={{ backgroundColor: resultType.base_color }}
      >
        <DecorativeStar color={resultType.base_color} className="-left-8 -top-10" />
        <DecorativeStar color={resultType.base_color} className="-right-8 -top-10" />

        <h1 className={`${isResult ? 'text-[1.35rem] min-[390px]:text-[1.8rem]' : 'text-[1.05rem] min-[390px]:text-[1.2rem]'} font-black uppercase leading-none text-white`}>
          {resultType.name}
        </h1>

        <div className={`${isResult ? 'mt-7' : 'mt-5'} w-full`}>
          <ResultGraph graphPath={resultType.graph_path} size={isResult ? 'large' : 'compact'} />
        </div>
      </section>
      {quizResult ? (
        <section className={`mx-auto w-full text-left ${isResult ? 'mt-8 max-w-[449px]' : 'mt-6 max-w-[292px] min-[390px]:max-w-[320px]'}`}>
          {quizResult.participant ? (
            <div className={`rounded-[0.9rem] px-4 py-4 sm:px-5 bg-white text-left shadow-[0_4px_8px_rgba(0,0,0,0.12)]`}>
              <p className={`text-[0.68rem] sm:text-[0.72rem] text-center font-black uppercase tracking-[0.16em] sm:tracking-[0.18em]`}>Quiz Taker</p>
              <p className={`mt-2 font-black leading-none text-[#1d1d1f] text-center text-[1.15rem] sm:text-[1.35rem]`}>
                {quizResult.participant.name}
              </p>
              <p className={`text-[0.9rem] mt-2 font-semibold text-[#1d1d1f]/70 text-center`}>
                Age {quizResult.participant.age}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mt-7 space-y-3 text-left">
        <h2 className={`${isResult ? 'mx-auto max-w-[449px]' : ''} text-center text-[1.38rem] font-black leading-none min-[390px]:text-[1.75rem]`}>Your Profile</h2>
        <div
          className={`mx-auto w-full items-center rounded-[1rem] text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] ${isResult ? 'min-h-[287px] max-w-[449px] px-5 py-6 text-[1rem] leading-7 min-[390px]:px-6 min-[390px]:text-[1.08rem] min-[390px]:leading-8' : 'min-h-[220px] max-w-[292px] px-4 py-5 text-[0.9rem] leading-6 min-[380px]:text-[0.96rem] min-[380px]:leading-7 min-[390px]:max-w-[320px]'}`}
          style={{ backgroundColor: resultType.accent_color }}
        >
          {resultType.description}
        </div>
      </section>

      <section className={`mx-auto mt-7 grid w-full grid-cols-2 justify-items-center gap-3 ${isResult ? 'max-w-[449px] gap-y-4' : 'max-w-[292px] min-[390px]:max-w-[320px]'}`}>
        {dimensions.map((dimension) => (
          <PercentCard
            key={dimension.key}
            label={dimension.label}
            value={resultType[dimension.key].percentage}
            variant={variant}
          />
        ))}
      </section>

      <div className={`mt-9 space-y-8`}>
        {dimensions.map((dimension) => (
          <CopyBlock key={dimension.key} title={dimension.label} variant={variant}>
            {resultType[dimension.key].description}
          </CopyBlock>
        ))}
      </div>

      {showBranches && resultType.branches.length > 0 ? (
        <section className="mx-auto mt-9 max-w-[292px] space-y-4 text-left min-[390px]:max-w-[320px]">
          <h2 className="text-[1.55rem] font-black uppercase leading-none sm:text-[1.85rem]">Branches</h2>
          <div className="space-y-4">
            {resultType.branches.map((branch) => (
              <Link
                key={branch.slug}
                to={`/explore/types/${branch.slug}`}
                className="joat-button-motion block min-h-16 rounded-[0.9rem] px-4 py-5 text-center text-lg font-black uppercase leading-tight text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] min-[380px]:text-lg sm:text-lg"
                style={{ backgroundColor: resultType.base_color }}
              >
                {branch.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {actions ? <div className="mx-auto mt-9 max-w-[449px]">{actions}</div> : null}
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
