import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export function Landing() {
  return (
    <Shell tone="from-[#fbfbfa] via-[#fffdf9] to-[#f8f8f7]" fullBleed>
      <section className="relative flex min-h-[100svh] flex-1 flex-col items-center justify-between overflow-hidden bg-white px-4 py-5 text-center sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.82]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 16.5rem',
            backgroundSize: '40rem auto',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[7.2rem] h-[13rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.54)_38%,rgba(255,255,255,0.2)_72%,rgba(255,255,255,0)_100%)] sm:top-[8.5rem] sm:h-[14rem]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.1)_62%,rgba(255,255,255,0.14)_100%)] sm:top-[12rem]" />

        <div className="relative flex w-full justify-center">
          <Logo />
        </div>

        <div className="relative flex w-full max-w-[21rem] flex-1 flex-col items-center justify-center py-7 sm:max-w-[25rem] sm:py-10">
          <div className="-mt-5 rounded-[3.2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_38%,rgba(255,255,255,0.94)_56%,rgba(255,255,255,0.76)_72%,rgba(255,255,255,0.42)_88%,rgba(255,255,255,0.12)_97%,rgba(255,255,255,0)_100%)] px-10 pt-14 pb-10 sm:-mt-6 sm:px-12 sm:pt-16 sm:pb-11">
            <h1 className="text-[1.45rem] font-black uppercase tracking-[-0.04em] text-[#18161d] sm:text-[2rem]">
              The Polymath Type Quiz
            </h1>
            <div className="mt-5 space-y-3 text-[0.9rem] leading-6 text-[#33303a] sm:mt-6 sm:text-base">
              <p>Discover your archetype in the tension between mastery and exploration.</p>
              <p>Are you a Deep Diver or an Infinite Explorer? A T-Shaped Bridge or a Renaissance Weaver.</p>
              <p>18 questions. No right answers. Just honest self reflection.</p>
            </div>
          </div>
        </div>

        <div className="relative grid w-full max-w-[20rem] grid-cols-2 gap-3 pb-3 sm:max-w-[22rem] sm:gap-5">
          <Link
            to="/explore/types"
            className="inline-flex min-h-[3.65rem] items-center justify-center rounded-[0.8rem] bg-[#1d1d1f] px-4 text-base font-semibold text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)] transition hover:translate-y-[1px]"
          >
            Explore Types
          </Link>
          <Link
            to="/quiz"
            className="inline-flex min-h-[3.65rem] items-center justify-center rounded-[0.8rem] bg-[linear-gradient(90deg,#62b9ff_0%,#7db0ff_22%,#ff4a71_62%,#ffcc00_100%)] px-4 text-[1.45rem] font-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)] transition hover:translate-y-[1px]"
          >
            Begin
          </Link>
        </div>
      </section>
    </Shell>
  )
}
