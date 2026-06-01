import React from 'react'
import { Logo } from './Logo.jsx'
import { Shell } from './Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export function ResultPageShell({ children }) {
  return (
    <Shell tone="from-[#ededed] via-[#f5f5f4] to-[#ecebea]" fullBleed>
      <section id="bg" className="relative flex min-h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-5 text-center sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute translate-y-80 inset-0 bg-center bg-repeat-y opacity-[0.82] pt-7"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundSize: '40rem auto',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[7.2rem] h-[13rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.54)_38%,rgba(255,255,255,0.2)_72%,rgba(255,255,255,0)_100%)] sm:top-[8.5rem] sm:h-[14rem]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.1)_62%,rgba(255,255,255,0.14)_100%)] sm:top-[12rem]" />

        <div className="relative mx-auto flex w-full max-w-[38rem] flex-col items-center">
          <Logo className="max-w-[19rem] sm:max-w-[24rem]" />
          {children}
        </div>
      </section>
    </Shell>
  )
}
