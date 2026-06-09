import React from 'react'
import { logoDarkPath, logoLightPath } from '../config/assets.js'
import { Link } from 'react-router-dom'

export function Logo({ variant = 'dark', className = '' }) {
  return (
    <Link to="/" className={`inline-flex w-full max-w-[16.5rem] justify-center sm:max-w-[21rem] md:max-w-[24rem] ${className}`}>
      <img
        src={variant === 'light' ? logoLightPath : logoDarkPath}
        alt="Jack of All Trades"
        className="block h-auto w-full"
      />
    </Link>
  )
}
