import React from 'react'

export function ResultTotals({ label, value }) {
  return (
    <div className="rounded-[1.3rem] border-2 border-[#18161d] bg-white/85 px-4 py-4 shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
      <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[#5b6170]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#18161d]">{value}</p>
    </div>
  )
}
