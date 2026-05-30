import React from 'react'
import { Logo } from './Logo.jsx'
import { Shell } from './Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export function ResultPageShell({ children }) {
  return (
    <Shell tone="from-[#ededed] via-[#f5f5f4] to-[#ecebea]" fullBleed>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#edecec] px-5 py-6 text-[#00395D] sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-center bg-repeat-y opacity-95"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center top',
            backgroundSize: '42rem auto',
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[38rem] flex-col items-center">
          <Logo className="max-w-[19rem] sm:max-w-[24rem]" />
          {children}
        </div>
      </section>
    </Shell>
  )
}
