import React, { useState } from 'react'

export function ResultGraph({ graphPath, alt = '', size = 'compact' }) {
  const [hasImageError, setHasImageError] = useState(false)
  const isLarge = size === 'large'

  return (
    <div className={`relative mx-auto aspect-[1.18] max-w-full ${isLarge ? 'w-[18.5rem] min-[430px]:w-[22rem]' : 'w-[12.8rem] min-[380px]:w-[13.9rem] sm:w-[15.5rem]'}`}>
      <span className="z-20 absolute left-1/2 top-0 -translate-x-1/2 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem] sm:text-[0.82rem]">
        Breadth
      </span>
      <span className="z-20 absolute right-0 top-[38%] text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem] sm:text-[0.82rem]">Depth</span>
      <span className="z-20 absolute bottom-0 right-[5%] text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem] sm:text-[0.82rem]">
        Integration
      </span>
      <span className="z-20 absolute bottom-0 left-[4%] text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem] sm:text-[0.82rem]">
        Recognition
      </span>
      <span className="z-20 absolute -left-2 top-[38%] text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem] sm:text-[0.82rem]">Output</span>

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
