import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { ResultPageShell } from '../components/ResultPageShell.jsx'
import { ResultTypeDetailContent } from './ExploreTypeDetail.jsx'
import { useResultType } from '../hooks/useResultTypes.js'
import { downloadElementAsJpeg } from '../utils/downloadElementAsJpeg.js'

function slugFrom(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function MissingResult() {
  return (
    <ResultPageShell showLogo={false}>
      <div className="mt-16 w-full pb-16">
        <div className="mx-auto max-w-[449px] rounded-[1rem] bg-[#1d1d1f] px-6 py-6 text-center text-white shadow-[0_4px_8px_rgba(0,0,0,0.24)]">
          <p className="text-[0.8rem] font-black uppercase tracking-[0.2em] text-white/60">Result</p>
          <h1 className="mt-3 text-[1.75rem] font-black uppercase leading-none">No result loaded</h1>
          <p className="mt-4 text-[1rem] font-semibold leading-7 text-white/80">
            Complete the quiz first so the app can calculate and display your branch detail.
          </p>
          <Link
            to="/quiz/info"
            className="joat-button-motion mt-6 inline-flex min-h-12 items-center rounded-[0.75rem] bg-white px-5 py-3 text-[0.9rem] font-black uppercase tracking-[0.12em] text-[#1d1d1f]"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </ResultPageShell>
  )
}

function LoadedResult({ result }) {
  const captureRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const branchSlug = result.outcome.branch_slug ?? slugFrom(result.outcome.branch)
  const { resultType, isLoading, error } = useResultType(branchSlug)

  const downloadResult = async () => {
    if (isDownloading) {
      return
    }

    if (!captureRef.current) {
      setDownloadError('Result is not ready to download yet.')
      return
    }

    setIsDownloading(true)
    setDownloadError('')

    try {
      await downloadElementAsJpeg(captureRef.current, `joat-${branchSlug}-result.jpeg`)
    } catch (error) {
      setDownloadError('Could not prepare the result image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading || error || !resultType) {
    return (
      <ResultPageShell>
        <div className="mt-16 w-full pb-16">
          <p className="mx-auto max-w-[449px] rounded-[1rem] bg-[#1d1d1f] px-6 py-5 text-center text-xl font-black text-white shadow-[0_5px_9px_rgba(0,0,0,0.22)]">
            {error ?? 'Loading your result'}
          </p>
        </div>
      </ResultPageShell>
    )
  }

  return (
    <ResultPageShell showLogo={false} contentClassName="max-w-[488px]">
      <div ref={captureRef} className="">
        <div className="flex flex-col items-center">
          <Logo className="max-w-[17rem] min-[390px]:max-w-[20rem]" />
        </div>
        <div>
          <ResultTypeDetailContent
            resultType={resultType}
            quizResult={result}
            showBackLink={false}
            showBranches={false}
            variant="result"
          />
        </div>
      </div>

      <div data-export-hidden="true" className="items-center mx-auto mb-16 flex w-full max-w-[449px] flex-col gap-3 px-5">
        {downloadError ? (
          <p className="w-full max-w-[320px] rounded-[0.75rem] bg-white px-4 py-3 text-center text-[0.82rem] font-bold text-[#8a0000] shadow-[0_3px_8px_rgba(0,0,0,0.12)]">
            {downloadError}
          </p>
        ) : null}
        <button
          type="button"
          onClick={downloadResult}
          disabled={isDownloading}
          className=" max-w-[292px] min-[390px]:max-w-[320px] joat-button-motion min-h-12 rounded-[0.85rem] bg-[#1d1d1f] px-5 py-4 text-center text-[0.95rem] font-black uppercase tracking-[0.14em] text-white shadow-[0_4px_8px_rgba(0,0,0,0.24)] disabled:cursor-wait disabled:opacity-60"
        >
          {isDownloading ? 'Preparing Result' : 'Download Result'}
        </button>
        <Link
          to="/"
          className=" max-w-[292px] min-[390px]:max-w-[320px]  joat-button-motion min-h-12 rounded-[0.85rem] bg-white px-5 py-4 text-center text-[0.95rem] font-black uppercase tracking-[0.14em] text-[#1d1d1f] shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
        >
          Retake Quiz
        </Link>
      </div>
    </ResultPageShell>
  )
}

export function Result() {
  const location = useLocation()
  const result = location.state?.result

  if (!result) {
    return <MissingResult />
  }

  return <LoadedResult result={result} />
}
