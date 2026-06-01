import React, { useState } from 'react'

export function ResultGraph({ graphPath, alt = '' }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className="relative mx-auto aspect-[1.18] w-[15rem] max-w-full sm:w-[19rem]">
      <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[0.7rem] font-black text-white sm:text-[0.82rem]">
        Breadth
      </span>
      <span className="absolute right-0 top-[38%] text-[0.7rem] font-black text-white sm:text-[0.82rem]">Depth</span>
      <span className="absolute bottom-0 right-[5%] text-[0.7rem] font-black text-white sm:text-[0.82rem]">
        Integration
      </span>
      <span className="absolute bottom-0 left-[4%] text-[0.7rem] font-black text-white sm:text-[0.82rem]">
        Recognition
      </span>
      <span className="absolute left-0 top-[38%] text-[0.7rem] font-black text-white sm:text-[0.82rem]">Output</span>

      <div className="absolute inset-[12%] flex items-center justify-center">
        {hasImageError || !graphPath ? (
          <div className="h-[72%] w-[72%] rounded-full border-[0.55rem] border-white/80 bg-white/18" />
        ) : (
          <img
            src={graphPath}
            alt={alt}
            onError={() => setHasImageError(true)}
            className="h-full w-full object-contain drop-shadow-[0_4px_0_rgba(255,255,255,0.32)]"
          />
        )}
      </div>
    </div>
  )
}
