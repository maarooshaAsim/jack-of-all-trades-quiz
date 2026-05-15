import React from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'

const logoDarkPath = '/storage/assets/joat_logo_dark.png'
const landingStarsPath = '/storage/assets/landing_page_bg_stars.svg'

function Shell({ children, tone = 'from-[#fffaf2] via-[#fffdf8] to-[#fff7eb]', fullBleed = false }) {
  return (
    <main className={`min-h-screen bg-gradient-to-br ${tone} text-[#18161d]`}>
      <div
        className={
          fullBleed
            ? 'flex min-h-screen w-full flex-col'
            : 'mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 md:px-8'
        }
      >
        {children}
      </div>
    </main>
  )
}

function Logo() {
  return (
    <img src={logoDarkPath} alt="Jack of All Trades" className="h-auto w-full max-w-[21rem] sm:max-w-[24rem]" />
  )
}

function Landing() {
  return (
    <Shell tone="from-[#fbfbfa] via-[#fffdf9] to-[#f8f8f7]" fullBleed>
      <section className="relative flex min-h-screen flex-1 flex-col items-center justify-between overflow-hidden bg-white px-5 py-6 text-center sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.82]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 12.5rem',
            backgroundSize: '52rem auto',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[7.2rem] h-[13rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.54)_38%,rgba(255,255,255,0.2)_72%,rgba(255,255,255,0)_100%)] sm:top-[8.5rem] sm:h-[14rem]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[10.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.1)_62%,rgba(255,255,255,0.14)_100%)] sm:top-[12rem]" />

        <div className="relative flex w-full justify-center">
          <Logo />
        </div>

        <div className="relative flex w-full max-w-[22rem] flex-1 flex-col items-center justify-center py-8 sm:max-w-[25rem] sm:py-10">
          <div className="-mt-5 rounded-[3.2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_38%,rgba(255,255,255,0.94)_56%,rgba(255,255,255,0.76)_72%,rgba(255,255,255,0.42)_88%,rgba(255,255,255,0.12)_97%,rgba(255,255,255,0)_100%)] px-10 pt-14 pb-10 sm:-mt-6 sm:px-12 sm:pt-16 sm:pb-11">
            <h1 className="text-[1.7rem] font-black uppercase tracking-[-0.04em] text-[#18161d] sm:text-[2rem]">
              The Polymath Type Quiz
            </h1>
            <div className="mt-6 space-y-3 text-[0.95rem] leading-6 text-[#33303a] sm:text-base">
              <p>Discover your archetype in the tension between mastery and exploration.</p>
              <p>Are you a Deep Diver or an Infinite Explorer? A T-Shaped Bridge or a Renaissance Weaver.</p>
              <p>18 questions. No right answers. Just honest self reflection.</p>
            </div>
          </div>
        </div>

        <div className="relative grid w-full max-w-[20rem] grid-cols-2 gap-5 pb-3 sm:max-w-[22rem]">
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

function InfoPage() {
  const { type } = useParams()

  return (
    <Shell tone="from-[#e9f7ff] via-[#fff9f1] to-[#fff1cf]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Explore</p>
        <h1 className="mt-3 text-4xl font-black uppercase">{type === 'about' ? 'About the quiz' : 'Explore the types'}</h1>
        <p className="mt-6 text-lg leading-8 text-[#3a3348]">
          This page is a placeholder until the client delivers the final copy and images. Routing is working, and this
          is where the static info content will live.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full border-2 border-[#18161d] bg-[#18161d] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white"
        >
          Back
        </Link>
      </div>
    </Shell>
  )
}

function Quiz() {
  return (
    <Shell tone="from-[#5bbfef] via-[#8fd7f7] to-[#dff6ff]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-[#241c33] p-8 text-white shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5c842]">Quiz Placeholder</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Question flow goes here</h1>
        <p className="mt-6 leading-8 text-white/80">
          The React router and page shell are working. Next step is wiring the real question config and quiz state hook.
        </p>
      </div>
    </Shell>
  )
}

function Result() {
  return (
    <Shell tone="from-[#fff4db] via-[#fffdf7] to-[#e8fff4]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-3xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#5bbfef]">Result Placeholder</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Your archetype will appear here</h1>
      </div>
    </Shell>
  )
}

function Admin() {
  return (
    <Shell tone="from-[#f6f0ff] via-[#fff9f1] to-[#f6fffa]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-10 max-w-2xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-8 shadow-[8px_8px_0_0_#18161d]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Admin Placeholder</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Export access UI goes here</h1>
      </div>
    </Shell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Landing />} />
        <Route path="/explore/:type" element={<InfoPage />} />
        <Route path="/quiz"          element={<Quiz />} />
        <Route path="/result"        element={<Result />} />
        <Route path="/admin"         element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
