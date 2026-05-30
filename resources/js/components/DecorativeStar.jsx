import React from 'react'
import { resultStarsPath } from '../config/assets.js'

export function DecorativeStar({ color, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute block h-[5.6rem] w-[5.2rem] drop-shadow-[0_3px_4px_rgba(0,0,0,0.16)] ${className}`}
      style={{
        backgroundColor: color,
        mask: `url(${resultStarsPath}) center / contain no-repeat`,
        WebkitMask: `url(${resultStarsPath}) center / contain no-repeat`,
      }}
    />
  )
}
