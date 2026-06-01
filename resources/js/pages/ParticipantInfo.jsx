import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { Shell } from '../components/Shell.jsx'
import { landingStarsPath } from '../config/assets.js'

export const participantStorageKey = 'joat_participant'

export function ParticipantInfo() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')

  const startQuiz = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const parsedAge = Number.parseInt(age, 10)

    if (!trimmedName || Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      setError('Enter your name and a valid age.')
      return
    }

    window.localStorage.setItem(
      participantStorageKey,
      JSON.stringify({
        name: trimmedName,
        age: parsedAge,
      }),
    )

    navigate('/quiz', {
      state: {
        participant: {
          name: trimmedName,
          age: parsedAge,
        },
      },
    })
  }

  return (
    <Shell tone="from-[#fbfbfa] via-[#fffdf9] to-[#f8f8f7]" fullBleed>
      <section className="relative flex min-h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-5 py-7 text-center sm:px-8 sm:py-9">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.82]"
          style={{
            backgroundImage: `url(${landingStarsPath})`,
            backgroundPosition: 'center 17.5rem',
            backgroundSize: '39rem auto',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[7.5rem] h-[18rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.66)_44%,rgba(255,255,255,0.25)_78%,rgba(255,255,255,0)_100%)] sm:top-[8.5rem]" />

        <div className="relative flex w-full justify-center">
          <Logo />
        </div>

        <div className="relative mx-auto flex w-full max-w-[445px] flex-1 flex-col justify-center py-10 sm:py-12">
          <form
            onSubmit={startQuiz}
            className="w-full rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_42%,rgba(255,255,255,0.92)_62%,rgba(255,255,255,0.68)_81%,rgba(255,255,255,0.18)_97%,rgba(255,255,255,0)_100%)] px-8 py-16 sm:px-12 sm:py-20"
          >
            <div className="mx-auto max-w-[22rem] space-y-10 sm:space-y-12">
              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter Name"
                  autoComplete="name"
                  className="w-full border-0 border-b-[3px] border-[#1d1d1f] bg-transparent px-2 pb-1 text-center text-[1rem] font-semibold text-[#1d1d1f] outline-none placeholder:text-[#6b6870] focus:border-[#0a72c8] sm:text-[1.1rem]"
                  required
                />
              </label>

              <label className="block">
                <span className="sr-only">Age</span>
                <input
                  type="number"
                  min="1"
                  max="120"
                  inputMode="numeric"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="Enter Age"
                  className="w-full border-0 border-b-[3px] border-[#1d1d1f] bg-transparent px-2 pb-1 text-center text-[1rem] font-semibold text-[#1d1d1f] outline-none placeholder:text-[#6b6870] focus:border-[#0a72c8] sm:text-[1.1rem]"
                  required
                />
              </label>
            </div>

            {error ? (
              <p className="mx-auto mt-7 max-w-[22rem] rounded-[0.75rem] bg-white/85 px-4 py-3 text-[0.9rem] font-bold text-[#b42318] shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mx-auto mt-14 inline-flex min-h-[4rem] min-w-[8rem] items-center justify-center rounded-[0.75rem] bg-[#1d1d1f] px-7 text-[1.35rem] font-black text-white shadow-[0_5px_12px_rgba(0,0,0,0.24)] transition hover:translate-y-[1px] sm:mt-16 sm:min-h-[4.5rem] sm:min-w-[9rem] sm:text-[1.5rem]"
            >
              Enter
            </button>
          </form>
        </div>
      </section>
    </Shell>
  )
}
