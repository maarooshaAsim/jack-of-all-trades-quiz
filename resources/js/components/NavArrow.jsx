import React from 'react'
import { ArrowIcon } from './ArrowIcon.jsx'

export function NavArrow({ direction, disabled, label, onClick }) {
  const isNext = direction === 'next'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex h-[2.8rem] w-[5.2rem] items-center justify-center rounded-full transition ${
        isNext ? 'bg-[#18161d]/92' : 'bg-white/72'
      } ${disabled ? 'cursor-not-allowed opacity-35' : 'hover:-translate-y-[1px]'}`}
    >
      <ArrowIcon direction={isNext ? 'forward' : 'back'} color={isNext ? '#ffffff' : '#18161d'} />
    </button>
  )
}
