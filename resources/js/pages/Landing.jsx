import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'
import { landingStarsPath } from '../config/assets.js'
import { beginButtonImage } from '../config/assets.js'


export function Landing({
    shellRef = null,
    showLogo = true,
}) {
  return (
      <Shell tone="bg-white" fullBleed>
      <section
        id="bg"
        ref={shellRef}
        className="joat-artboard  relative flex h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-4 text-center font-['Outfit']"
      >
        {/* Same stars as landing, but repeat vertically for scroll pages */}
        <div
          className="pointer-events-none absolute inset-0 bg-[length:25rem_auto] md:bg-[length:32rem_auto] xl:bg-[length:34rem_auto]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 14.8rem',
            // backgroundSize: '25rem auto',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[18.3rem] bg-white"
        />

     
        <div className={`relative z-10 flex w-full flex-col items-center`}>
          {showLogo ? (
            <div className="mt-7 flex w-full justify-center min-[390px]:mt-9">
              <Logo className="max-w-[30rem] min-[690px]:max-w-[27rem]" />
            </div>
          ) : null}

          <div id="position-box" 
            className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="w-full max-w-[620px] rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_63%,rgba(255,255,255,0.62)_82%,rgba(255,255,255,0)_100%)] px-7 py-8 min-[690px]:max-w-[640px] min-[690px]:py-9">
                <h1 className="text-center text-[1.4rem] font-bold leading-tight text-black min-[690px]:text-[2rem]">
                  THE POLYMATH TYPE QUIZ
                </h1>

                <div className="mt-4 space-y-3 text-center text-[0.75rem] font-light leading-[2.28] text-black md:text-[1.1rem]">
                  <p>
                    Discover your archetype in the tension between mastery and exploration.
                  </p>

                  <p>
                    Are you a Serial Builder or a Drifting Aspirant? A Systemic Weaver or a Contained Polymath?
                  </p>

                  <p>
                    18 questions. No right answers. Just honest self reflection.
                  </p>
                </div>
              </div>

              <div className=" mt-8 grid w-full max-w-[18.25rem] grid-cols-2 gap-7 min-[390px]:mt-9 min-[390px]:max-w-[19.5rem]">
                <Link
                  to="/explore/types"
                  className="joat-button-motion flex min-h-[3.6rem] w-full items-center justify-center rounded-[14px] bg-[#1E1E1E] px-3 text-[0.78rem] font-semibold text-white shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] min-[390px]:min-h-[4rem] min-[390px]:text-[0.86rem]"
                >
                  Explore Types
                </Link>

              <Link
                  to="/quiz/info"
                  className="joat-button-motion relative flex min-h-[3.6rem] w-full items-center justify-center overflow-hidden rounded-[14px] px-3 text-[1rem] font-bold text-white shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] min-[390px]:min-h-[4rem] min-[390px]:text-[1.12rem]"
                >
                  <img
                    src={beginButtonImage}
                    alt=""
                    className="absolute inset-0 h-full w-full scale-[1.15] object-cover"
                  />

                  <span className="relative z-10">
                    Begin
                  </span>
                </Link>
              </div>
            </div>
        </div>
      </section>
    </Shell>
  )
}
