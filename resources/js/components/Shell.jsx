import React from 'react'

export function Shell({
  children,
  tone = 'bg-white',
  backgroundColor,
  fullBleed = false,
}) {
  return (
    <main
      className={`min-h-screen overflow-x-hidden ${tone} text-[#18161d]`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
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