import React from 'react'
import { Logo } from './Logo.jsx'
import { Shell } from './Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export function ResultPageShell({ children }) {
  return (
    <Shell tone="from-[#ededed] via-[#f5f5f4] to-[#ecebea]" fullBleed>
      <section id="bg" className="relative flex min-h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-5 text-center sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 translate-y-80 bg-center bg-repeat-y opacity-[0.82] pt-7"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundSize: '40rem auto',
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[449px] flex-col items-center bg-[#f4f4f3] pb-14 shadow-[0_0_28px_26px_rgba(244,244,243,0.92)]">
          <Logo className="max-w-[19rem] sm:max-w-[24rem]" />
          {children}
        </div>
      </section>
    </Shell>
  )
}
