import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'
import { landingStarsPath } from '../config/assets.js'
import { beginButtonImage } from '../config/assets.js'

export function Landing() {
  return (
    <Shell tone="from-[#fbfbfa] via-[#fffdf9] to-[#f8f8f7]" fullBleed>
      <section className="relative flex min-h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-5 text-center font-['Outfit']">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.82]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 18rem',
            backgroundSize: '40rem auto',
          }}
        />

        <div className="relative z-10 mt-6 flex w-full justify-center">
          <Logo />
        </div>
       <div className="relative z-10 mt-25 flex flex-col items-center pt-20">
            {/* Main white cloud */}
            <div
              className="
                pointer-events-none absolute left-1/2
                top-1/2 -z-10 h-[600px]
                w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[999px] blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,.98) 35%, rgba(255,255,255,.88) 55%, rgba(255,255,255,.55) 72%, rgba(255,255,255,.15) 90%, rgba(255,255,255,0) 100%)',
                }}
            />
          <div className="relative z-10 mt-auto mb-auto w-full max-w-[360px]">
            <h1 className="text-center text-[27px] font-bold leading-normal text-black">
              THE POLYMATH TYPE QUIZ
            </h1>

            <div className="mt-4 space-y-5 text-center text-[17px] font-light leading-normal text-black">
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

          <div className="relative z-10 mb-8 mt-10 grid w-full max-w-[372px] grid-cols-2 gap-3 min-[380px]:gap-5">
            <Link
              to="/explore/types"
              className="joat-button-motion flex min-h-[70px] w-full items-center justify-center rounded-[14px] bg-[#1E1E1E] px-3 text-[0.95rem] font-semibold text-white shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] min-[380px]:min-h-[80px] min-[380px]:text-[1rem]"
            >
              Explore Types
            </Link>

          <Link
              to="/quiz/info"
              className="joat-button-motion relative flex min-h-[70px] w-full items-center justify-center overflow-hidden rounded-[14px] px-3 text-[1.35rem] font-bold text-white shadow-[0_2px_4px_2px_rgba(0,0,0,0.25)] min-[380px]:min-h-[80px] min-[380px]:text-[1.55rem]"
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
      </section>
    </Shell>
  )
}
