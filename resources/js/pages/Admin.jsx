import React from 'react'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'

export function Admin() {
  return (
    <Shell tone="from-[#f6f0ff] via-[#fff9f1] to-[#f6fffa]">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>
      <div className="mt-8 max-w-2xl rounded-[2rem] border-2 border-[#18161d] bg-white/80 p-6 shadow-[8px_8px_0_0_#18161d] sm:mt-10 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ff7a59]">Admin Placeholder</p>
        <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">Export access UI goes here</h1>
      </div>
    </Shell>
  )
}
