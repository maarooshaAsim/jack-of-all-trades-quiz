import React from 'react'

export function QuizOption({ accentColor, accentTextColor, option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-[0.9rem] border px-3 py-2.5 text-left transition sm:rounded-[0.95rem] ${
        isSelected
          ? 'border-[#18161d] bg-[#fff7cf] text-[#18161d] shadow-[0_10px_24px_rgba(0,0,0,0.22)] ring-2 ring-white/85'
          : 'border-[#20161a]/10 bg-white text-[#18161d] shadow-[0_6px_14px_rgba(0,0,0,0.12)] hover:-translate-y-[1px]'
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.7rem] border text-[0.78rem] font-black ${
          isSelected ? 'border-[#18161d]' : 'border-transparent'
        }`}
        style={{
          backgroundColor: accentColor,
          color: accentTextColor,
        }}
      >
        {option.key}
      </span>
      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
        <span className="text-[0.84rem] leading-5 sm:text-[0.83rem]">{option.text}</span>
        <span
          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.8rem] font-black ${
            isSelected
              ? 'border-[#18161d] bg-[#18161d] text-white'
              : 'border-[#18161d]/18 bg-white text-transparent'
          }`}
        >
          ✓
        </span>
      </div>
    </button>
  )
}
