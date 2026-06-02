import React from "react"

export function NavArrow({ direction, disabled, label, onClick }) {
  const isNext = direction === "next"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`joat-button-motion flex min-h-11 w-[72px] items-center ${
        isNext ? "justify-end" : "justify-start"
      } ${disabled ? "cursor-not-allowed opacity-35" : "hover:opacity-75"}`}
    >
      <span
        className={`relative block h-[3px] w-[66px] bg-[#EDECEC] ${
          isNext ? "after:right-0" : "after:left-0"
        } after:absolute after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:content-[''] ${
          isNext
            ? "after:border-r-2 after:border-t-2 after:border-[#EDECEC]"
            : "after:border-b-2 after:border-l-2 after:border-[#EDECEC]"
        }`}
      />
    </button>
  )
}
