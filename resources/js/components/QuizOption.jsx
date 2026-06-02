import React from 'react'

export function QuizOption({ accentColor, accentTextColor, option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`joat-button-motion flex min-h-[4.75rem] w-full overflow-hidden rounded-[14px] text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-white/65 ${
        isSelected
          ? "bg-[#FFF7CF] ring-2 ring-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
          : "bg-[#EDECEC] shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      }`}
    >
      <div
        className="flex w-[42px] shrink-0 items-center justify-center rounded-[1rem] sm:w-[46px]"
        style={{ backgroundColor: accentColor || "#68B6F7" }}
      >
        <span
          className="font-['Outfit'] text-[1.05rem] font-bold sm:text-[1.2rem]"
          style={{ color: accentTextColor || "#FFFFFF" }}
        >
          {option.key}
        </span>
      </div>

      <div className="flex flex-1 items-center px-3 py-3 sm:px-4 sm:py-4">
        <span className="break-words font-['Outfit'] text-[0.88rem] font-normal leading-[1.35] text-[#1E1E1E] sm:text-[0.95rem]">
          {option.text}
        </span>
      </div>
    </button>
  )
}
