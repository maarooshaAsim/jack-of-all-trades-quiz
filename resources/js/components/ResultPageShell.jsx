import React from 'react'
import { Logo } from './Logo.jsx'
import { Shell } from './Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export function ResultPageShell({
  children,
  shellRef = null,
  showLogo = true,
  contentClassName = 'max-w-[410px]',
}) {
  return (
    <Shell tone="bg-white" fullBleed>
      <section
        id="bg"
        ref={shellRef}
        className="joat-artboard relative flex min-h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-4 text-center font-['Outfit']"
      >
        {/* Same stars as landing, but repeat vertically for scroll pages */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.82] bg-[length:25rem_auto] md:bg-[length:32rem_auto] xl:bg-[length:34rem_auto]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 14.8rem',
            // backgroundSize: '25rem auto',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[18.3rem] bg-white"
        />

        {/* Same soft center wash as landing, but stretched for scroll */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 top-[18rem] z-[1] w-[20rem] max-w-full -translate-x-1/2 bg-white" />

        <div className={`relative z-10 flex w-full flex-col items-center ${contentClassName}`}>
          {showLogo ? (
            <div className="mt-7 flex w-full justify-center min-[390px]:mt-9">
              <Logo className="max-w-[15rem] min-[390px]:max-w-[17rem]" />
            </div>
          ) : null}

          {children}
        </div>
      </section>
    </Shell>
  )
}
