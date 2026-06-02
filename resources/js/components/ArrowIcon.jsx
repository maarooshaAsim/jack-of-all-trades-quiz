import React from 'react'
import { backArrowPath, forwardArrowPath } from '../config/assets.js'

export function ArrowIcon({ direction = 'back', color = '#1d1d1f', className = '' }) {
  const arrowPath = direction === 'forward' ? forwardArrowPath : backArrowPath

  return (
    <span
      aria-hidden="true"
      className={`block h-[3rem] w-[5rem] ${className}`}
      style={{
        backgroundColor: color,
        mask: `url(${arrowPath}) center / contain no-repeat`,
        WebkitMask: `url(${arrowPath}) center / contain no-repeat`,
      }}
    />
  )
}
