import React from 'react'

export function NavArrow({ direction, disabled, label, onClick }) {
  const isNext = direction === 'next'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-full border-2 border-[#18161d] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition sm:h-[3.15rem] sm:w-[3.15rem] ${
        isNext ? 'bg-[#18161d] text-white' : 'bg-white/72 text-[#18161d]'
      } ${disabled ? 'cursor-not-allowed opacity-35' : 'hover:-translate-y-[1px]'}`}
    >
      <span className="text-[1.55rem] font-black leading-none sm:text-[1.7rem]">{isNext ? '›' : '‹'}</span>
    </button>
  )
}
