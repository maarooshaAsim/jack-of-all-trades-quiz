import React from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'

function Shell({ children, tone = 'from-[#fff5df] via-[#fff8f1] to-[#ffe9cf]' }) {
  return (
    <main className={`min-h-screen bg-gradient-to-br ${tone} text-[#18161d]`}>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10">
        {children}
      </div>
    </main>
  )
}

function Logo() {
  return (
    <div className="inline-flex items-center gap-3 self-start rounded-full border-2 border-[#18161d] bg-white/75 px-4 py-2 shadow-[6px_6px_0_0_#18161d] backdrop-blur">
      <span className="text-2xl">✦</span>
      <div>
        <div className="text-xs font-black uppercase tracking-[0.35em] text-[#ff7a59]">Jack of All Trades</div>
        <div className="text-sm font-semibold text-[#241c33]">The Polymath Type Quiz</div>
      </div>
    </div>
  )
}

function Star({ className }) {
  return <div className={`absolute text-3xl text-[#18161d] ${className}`}>✦</div>
}

function Landing() {
  return (
    <Shell>
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-[#18161d] bg-[rgba(255,255,255,0.62)] p-8 shadow-[10px_10px_0_0_#18161d] md:p-12">
        <Star className="left-6 top-6 rotate-12 text-[#5bbfef]" />
        <Star className="right-10 top-20 -rotate-12 text-[#ff7a59]" />
        <Star className="bottom-28 left-10 rotate-6 text-[#f5c842]" />
        <Star className="bottom-12 right-14 -rotate-6 text-[#7ae4b8]" />

        <Logo />

        <section className="grid flex-1 items-center gap-12 py-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="mb-4 inline-block rounded-full bg-[#18161d] px-4 py-2 text-sm font-bold uppercase tracking-[0.3em] text-white">
              Student Project Prototype
            </p>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Find your polymath pattern.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3a3348] md:text-xl">
              A bold, fast 18-question quiz about how you learn, explore, and connect skills across different interests.
            </p>
          </div>

          <div className="rounded-[1.75rem] border-2 border-[#18161d] bg-[#241c33] p-6 text-[#fff7ea] shadow-[8px_8px_0_0_#18161d]">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5c842]">How it works</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/85">
              <p>18 fixed questions</p>
              <p>6 categories</p>
              <p>1 final archetype result</p>
              <p>No saved progress if you leave mid-quiz</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/explore/types"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#18161d] bg-white px-6 py-4 text-base font-black uppercase tracking-[0.2em] shadow-[6px_6px_0_0_#18161d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Explore Types
          </Link>
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#18161d] bg-[#ff7a59] px-6 py-4 text-base font-black uppercase tracking-[0.2em] text-white shadow-[6px_6px_0_0_#18161d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Begin
          </Link>
        </div>
      </div>
    </Shell>
  )
}

function InfoPage() {
  const { type } = useParams()

  return (
    <Shell tone="from-[#e9f7ff] via-[#fff9f1] to-[#fff1cf]">
      <Logo />
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
      <Logo />
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
      <Logo />
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
      <Logo />
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
