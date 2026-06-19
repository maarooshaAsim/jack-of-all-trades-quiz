import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'
import { landingStarsPath } from '../config/assets.js'
import { beginButtonImage } from '../config/assets.js'

export function Landing() {
  return (
    <Shell tone="bg-white" fullBleed>
      <section className="joat-artboard joat-fixed-screen relative flex flex-col items-center overflow-hidden bg-white px-4 py-4 text-center font-['Outfit']">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 14.8rem',
            backgroundSize: '34rem auto',
          }}
        />

        <div className="relative z-10 mt-7 flex w-full justify-center min-[390px]:mt-9">
          <Logo className="max-w-[15rem] min-[390px]:max-w-[17rem]" />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pb-5 pt-4">
          <div
            className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[24rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-[999px] blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,.98) 34%, rgba(255,255,255,.9) 55%, rgba(255,255,255,.58) 73%, rgba(255,255,255,.16) 90%, rgba(255,255,255,0) 100%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[320px] rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_63%,rgba(255,255,255,0.62)_82%,rgba(255,255,255,0)_100%)] px-7 py-8 min-[390px]:max-w-[340px] min-[390px]:py-9">
            <h1 className="text-center text-[1.18rem] font-bold leading-tight text-black min-[390px]:text-[1.28rem]">
              THE POLYMATH TYPE QUIZ
            </h1>

            <div className="mt-4 space-y-3 text-center text-[0.78rem] font-light leading-[1.28] text-black min-[390px]:text-[0.82rem]">
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

          <div className="relative z-10 mt-8 grid w-full max-w-[18.25rem] grid-cols-2 gap-7 min-[390px]:mt-9 min-[390px]:max-w-[19.5rem]">
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
      </section>
    </Shell>
  )
}
