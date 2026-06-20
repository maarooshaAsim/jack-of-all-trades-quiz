import React from 'react'
import { logoDarkPath, logoLightPath } from '../config/assets.js'
import { Link } from 'react-router-dom'

export function Logo({ variant = 'dark', className = '' }) {
  return (
    <Link to="/" className={`inline-flex w-full max-w-[27rem] justify-center ${className}`}>
      <img
        src={variant === 'light' ? logoLightPath : logoDarkPath}
        alt="Jack of All Trades"
        className="block h-auto w-full"
      />
    </Link>
  )
}
