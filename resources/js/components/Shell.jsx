import React from 'react'

export function Shell({ children, tone = 'from-[#fffaf2] via-[#fffdf8] to-[#fff7eb]', fullBleed = false }) {
  return (
    <main className={`min-h-[100svh] bg-gradient-to-br ${tone} text-[#18161d]`}>
      <div
        className={
          fullBleed
            ? 'flex min-h-[100svh] w-full flex-col'
            : 'mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 md:px-8'
        }
      >
        {children}
      </div>
    </main>
  )
}
