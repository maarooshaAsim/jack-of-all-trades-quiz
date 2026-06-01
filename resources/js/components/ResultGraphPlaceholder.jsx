import React from 'react'
import { resultStarsPath } from '../config/assets.js'

export function ResultGraphPlaceholder({ accentColor = '#ffffff' }) {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[11.5rem] items-center justify-center overflow-hidden rounded-[0.9rem] bg-white/13 sm:max-w-[13rem]">
      <div
        className="absolute h-[72%] w-[72%] opacity-90"
        style={{
          backgroundColor: accentColor,
          mask: `url(${resultStarsPath}) center / contain no-repeat`,
          WebkitMask: `url(${resultStarsPath}) center / contain no-repeat`,
        }}
      />
      <div className="relative h-[42%] w-[42%] rounded-full border-[0.45rem] border-white/76 bg-white/22 shadow-[0_8px_18px_rgba(0,0,0,0.12)]" />
    </div>
  )
}
