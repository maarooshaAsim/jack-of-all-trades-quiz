import React from 'react'
import { logoDarkPath, logoLightPath } from '../config/assets.js'

export function Logo({ variant = 'dark', className = '' }) {
  return (
    <img
      src={variant === 'light' ? logoLightPath : logoDarkPath}
      alt="Jack of All Trades"
      className={`h-auto w-full max-w-[18rem] sm:max-w-[21rem] md:max-w-[24rem] ${className}`}
    />
  )
}
