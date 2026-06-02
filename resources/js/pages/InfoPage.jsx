import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'

export function InfoPage() {
  const { type } = useParams()

  return (
    <Shell tone="from-[#e9f7ff] via-[#fff9f1] to-[#fff1cf]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-8 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-6 shadow-[8px_8px_0_0_#18161d] sm:mt-10 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Explore</p>
        <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
          {type === 'about' ? 'About the quiz' : 'Explore the types'}
        </h1>
        <p className="mt-5 text-base leading-7 text-[#3a3348] sm:mt-6 sm:text-lg sm:leading-8">
          This page is a placeholder until the client delivers the final copy and images. Routing is working, and this
          is where the static info content will live.
        </p>
        <Link
          to="/"
          className="joat-button-motion mt-8 inline-flex rounded-full border-2 border-[#18161d] bg-[#18161d] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white"
        >
          Back
        </Link>
      </div>
    </Shell>
  )
}
