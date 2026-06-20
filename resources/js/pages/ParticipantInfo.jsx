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
       <Shell tone="bg-white" fullBleed>
         <section
           id="bg"
           ref={null}
           className="joat-artboard  relative flex h-[100svh] flex-1 flex-col items-center overflow-hidden bg-white px-4 py-4 text-center font-['Outfit']"
         >
           {/* Same stars as landing, but repeat vertically for scroll pages */}
           <div
             className="pointer-events-none absolute inset-0 bg-[length:25rem_auto] md:bg-[length:32rem_auto] xl:bg-[length:34rem_auto]"
             style={{
               backgroundImage: `url(${landingStarsPath})`,
               backgroundPosition: 'center 14.8rem',
               // backgroundSize: '25rem auto',
             }}
           />
   
           <div
             className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[18.3rem] bg-white"
           />
   
        
           <div className={`relative z-10 flex w-full flex-col items-center`}>
               <div className="mt-7 flex w-full justify-center min-[390px]:mt-9">
                 <Logo className="max-w-[30rem] min-[690px]:max-w-[27rem]" />
               </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center pb-5 pt-4">
              <div
                className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[24rem] md:h-[48rem] w-[27rem] md:w-[47rem] -translate-x-1/2 -translate-y-1/2 rounded-[999px] blur-2xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,.98) 34%, rgba(255,255,255,.9) 55%, rgba(255,255,255,.58) 73%, rgba(255,255,255,.16) 90%, rgba(255,255,255,0) 100%)',
                }}
              />
    
              <div className="relative z-10 w-full max-w-[320px] rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_63%,rgba(255,255,255,0.62)_82%,rgba(255,255,255,0)_100%)] px-7 py-4 min-[390px]:max-w-[340px] min-[390px]:py-9">
                
                <form
                  onSubmit={startQuiz}
                  className="relative z-10 flex min-h-[24.5rem] w-full max-w-[320px] flex-col items-center justify-center min-[390px]:max-w-[340px]"
                >
                  <div className="mx-auto w-full max-w-[17.25rem] space-y-11 min-[390px]:max-w-[18rem]">
                    <label className="block">
                      <span className="sr-only">Name</span>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Name"
                        autoComplete="name"
                        className="w-full border-0 border-b-[3px] border-[#1d1d1f] bg-transparent px-2 pb-1 text-center text-[0.82rem] font-semibold text-[#1d1d1f] outline-none placeholder:text-[#6b6870] focus:border-[#0a72c8] min-[390px]:text-[0.88rem]"
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
                        className="w-full border-0 border-b-[3px] border-[#1d1d1f] bg-transparent px-2 pb-1 text-center text-[0.82rem] font-semibold text-[#1d1d1f] outline-none placeholder:text-[#6b6870] focus:border-[#0a72c8] min-[390px]:text-[0.88rem]"
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
                    className="joat-button-motion mx-auto mt-14 inline-flex min-h-[3.6rem] min-w-[7.25rem] items-center justify-center rounded-[0.75rem] bg-[#1d1d1f] px-7 text-[1.12rem] font-black text-white shadow-[0_5px_12px_rgba(0,0,0,0.24)] min-[390px]:min-h-[4rem] min-[390px]:min-w-[7.8rem] min-[390px]:text-[1.25rem]"
                  >
                    Enter
                  </button>
                </form>
              </div>
            </div>
      </section>
    </Shell>
  )
}
