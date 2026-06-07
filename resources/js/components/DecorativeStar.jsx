import React from 'react'
import { resultStarsPath } from '../config/assets.js'

export function DecorativeStar({ color, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute block h-[4.6rem] w-[4.3rem] drop-shadow-[0_3px_4px_rgba(0,0,0,0.16)] sm:h-[5.2rem] sm:w-[4.9rem] ${className}`}
      style={{
        backgroundColor: color,
        mask: `url(${resultStarsPath}) center / contain no-repeat`,
        WebkitMask: `url(${resultStarsPath}) center / contain no-repeat`,
      }}
    />
  )
}
