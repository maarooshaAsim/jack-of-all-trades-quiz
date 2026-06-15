import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowIcon } from './ArrowIcon.jsx'

export function HistoryBackButton({
  fallbackTo = '/',
  ariaLabel = 'Go back',
  className = '',
  iconClassName = 'h-[2.35rem] w-[4.25rem]',
}) {
  const navigate = useNavigate()

  function handleBack() {
    if ((window.history.state?.idx ?? 0) > 0) {
      navigate(-1)

      return
    }

    navigate(fallbackTo)
  }

  return (
    <button
      type="button"
      className={`joat-button-motion inline-flex items-center ${className}`}
      aria-label={ariaLabel}
      onClick={handleBack}
    >
      <ArrowIcon direction="back" color="#1d1d1f" className={iconClassName} />
    </button>
  )
}
