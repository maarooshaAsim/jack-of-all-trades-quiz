import React from 'react'

export function ResultGraph({ graphPath, alt = '' }) {
  return (
    <div className="relative mx-auto aspect-[1.18] w-full max-w-[14rem] sm:max-w-[16rem]">
      <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[0.62rem] font-black text-white sm:text-[0.72rem]">
        Breadth
      </span>
      <span className="absolute right-0 top-[38%] text-[0.62rem] font-black text-white sm:text-[0.72rem]">Depth</span>
      <span className="absolute bottom-0 right-[5%] text-[0.62rem] font-black text-white sm:text-[0.72rem]">
        Integration
      </span>
      <span className="absolute bottom-0 left-[4%] text-[0.62rem] font-black text-white sm:text-[0.72rem]">
        Recognition
      </span>
      <span className="absolute left-0 top-[38%] text-[0.62rem] font-black text-white sm:text-[0.72rem]">Output</span>

      <img
        src={graphPath}
        alt={alt}
        className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_4px_0_rgba(255,255,255,0.32)]"
      />
    </div>
  )
}
