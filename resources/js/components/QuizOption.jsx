import React from 'react'

function colorWithOpacity(color, opacity = 1, mixWithWhite = 0.85) {
  const hex = color?.replace('#', '')

  if (!hex || ![3, 6].includes(hex.length)) {
    return `rgba(105, 178, 245, ${opacity})`
  }

  const normalizedHex =
    hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex

  let r = parseInt(normalizedHex.slice(0, 2), 16)
  let g = parseInt(normalizedHex.slice(2, 4), 16)
  let b = parseInt(normalizedHex.slice(4, 6), 16)

  r = Math.round(r + (255 - r) * mixWithWhite)
  g = Math.round(g + (255 - g) * mixWithWhite)
  b = Math.round(b + (255 - b) * mixWithWhite)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function QuizOption({ accentColor, accentTextColor, option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`joat-button-motion flex min-h-[3.65rem] w-full overflow-hidden rounded-[12px] text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-white/65 min-[380px]:min-h-[3.85rem] sm:min-h-[4.25rem] ${
        isSelected
          ? "scale-[1.015] ring-2 ring-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
          : "bg-[#EDECEC] shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      }`}
      style={{
        backgroundColor: isSelected ? colorWithOpacity(accentColor,1, 0.60) : undefined,
      }}
    >
      <div
        className="flex w-[38px] shrink-0 items-center justify-center rounded-[0.78rem] min-[380px]:w-[42px] sm:w-[48px] sm:rounded-[0.85rem]"
        style={{ backgroundColor: accentColor || "#68B6F7" }}
      >
        <span
          className="font-['Outfit'] text-[0.95rem] font-bold sm:text-[1.2rem]"
          style={{ color: "#FFFFFF" }}
        >
          {option.key}
        </span>
      </div>

      <div className="flex flex-1 items-center px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="break-words font-['Outfit'] text-[0.78rem] font-normal leading-[1.24] text-[#1E1E1E] min-[380px]:text-[0.84rem] sm:text-[0.95rem] sm:leading-[1.35]">
          {option.text}
        </span>
      </div>
    </button>
  )
}
