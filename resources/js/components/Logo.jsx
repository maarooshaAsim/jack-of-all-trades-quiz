import React from 'react'
import { logoDarkPath, logoLightPath } from '../config/assets.js'
import { Link } from 'react-router-dom'

export function Logo({ variant = 'dark', className = '' }) {
  return (
    <Link to="/" className="inline-block max-w-full">
      <img
        src={variant === 'light' ? logoLightPath : logoDarkPath}
        alt="Jack of All Trades"
        className={`h-auto w-full max-w-[16.5rem] sm:max-w-[21rem] md:max-w-[24rem] ${className}`}
      />
    </Link>
  )
}
