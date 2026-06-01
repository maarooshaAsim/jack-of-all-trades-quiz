import React from 'react'

export function QuizOption({ accentColor, accentTextColor, option, isSelected, onSelect }) {
  return (
        <button
        type="button"
        onClick={onSelect}
        className={`flex w-full overflow-hidden rounded-[14px] text-left transition-all duration-200 ${
          isSelected
            ? "bg-[#FFF7CF] ring-2 ring-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
            : "bg-[#EDECEC] shadow-[0_6px_14px_rgba(0,0,0,0.12)] hover:-translate-y-[1px]"
        }`}
      >
        {/* Letter block */}
        <div
          className="flex min-h-[75px] w-[42px] shrink-0 items-center justify-center rounded-[1rem]"
          style={{ backgroundColor: accentColor || "#68B6F7" }}
        >
          <span
            className="font-['Outfit'] text-[20px] font-bold"
            style={{ color: accentTextColor || "#FFFFFF" }}
          >
            {option.key}
          </span>
        </div>

        {/* Text block */}
        <div className="flex min-h-[75px] flex-1 items-center px-4 py-4">
          <span className="font-['Outfit'] text-[14px] font-normal leading-[18px] text-[#1E1E1E]">
            {option.text}
          </span>
        </div>
      </button>
  )
}
