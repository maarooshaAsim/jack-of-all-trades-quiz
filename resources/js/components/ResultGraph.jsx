import React, { useState } from 'react'

export function ResultGraph({ graphPath, alt = '', size = 'compact' }) {
  const [hasImageError, setHasImageError] = useState(false)
  const isLarge = size === 'large'

  return (
    <div className={`relative mx-auto aspect-[1.18] max-w-full w-[17.75rem] min-[390px]:w-[20rem]`}>
      <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem]">
        Breadth
      </span>
      <span className="absolute right-0 top-[38%] z-20 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem]">Depth</span>
      <span className="absolute bottom-0 right-[5%] z-20 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem]">
        Integration
      </span>
      <span className="absolute bottom-0 left-[4%] z-20 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem]">
        Recognition
      </span>
      <span className="absolute -left-2 top-[38%] z-20 text-[0.62rem] font-black text-white min-[380px]:text-[0.7rem]">Output</span>

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
