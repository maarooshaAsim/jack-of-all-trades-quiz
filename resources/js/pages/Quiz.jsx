import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { NavArrow } from '../components/NavArrow.jsx'
import { QuizOption } from '../components/QuizOption.jsx'
import { Shell } from '../components/Shell.jsx'
import { questionStarsPath } from '../config/assets.js'
import { getCategoryMeta } from '../config/categoryMeta.js'
import { getQuestionTheme } from '../config/questionTheme.js'
import { useQuiz } from '../hooks/useQuiz.js'
import { participantStorageKey } from './ParticipantInfo.jsx'

function readStoredParticipant() {
  try {
    const participant = JSON.parse(window.localStorage.getItem(participantStorageKey))

    if (participant?.name && participant?.age) {
      return participant
    }
  } catch (error) {
    window.localStorage.removeItem(participantStorageKey)
  }

  return null
}

export function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const participant = location.state?.participant ?? readStoredParticipant()
  const {
    answers,
    currentIndex,
    currentQuestion,
    goNext,
    goPrev,
    hasAnswered,
    isFirst,
    isLast,
    isSubmitting,
    selectAnswer,
    submit,
    totalQuestions,
  } = useQuiz(participant)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    if (!participant) {
      navigate('/quiz/info', { replace: true })
    }
  }, [navigate, participant])

  if (!participant) {
    return null
  }

  const currentAnswer = answers[currentQuestion.id]
  const category = getCategoryMeta(currentQuestion.category)
  const theme = getQuestionTheme(currentQuestion.category)
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  const handleAdvance = async () => {
    if (!hasAnswered || isSubmitting) {
      return
    }

    if (!isLast) {
      goNext()
      return
    }

    setSubmitError(null)

    try {
      const result = await submit()

      navigate('/result', {
        state: {
          result: {
            ...result,
            participant,
          },
        },
      })
    } catch (error) {
      setSubmitError('Could not submit your quiz right now. Please try again.')
    }
  }

  return (
    <Shell tone="from-[#ecfbff] via-[#f8ffff] to-[#fffdf7]" fullBleed>
      <section
        className="relative min-h-[100svh] overflow-hidden px-3 py-5 min-[380px]:px-5 sm:px-8 sm:py-8"
        style={{ backgroundColor: category.color }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.9]"
          style={{
            backgroundImage: `url(${questionStarsPath})`,
            backgroundPosition: 'center 22rem',
            backgroundSize: '42rem auto',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[10rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.015) 38%, rgba(255,255,255,0.03) 100%)',
          }}
        />

        <div className="relative flex min-h-[calc(100svh-2.5rem)] flex-col">
          <div className="flex justify-center">
            <Logo variant="light" className="max-w-[11.5rem] sm:max-w-[13rem]" />
          </div>

          <div className="mx-auto mt-6 w-full max-w-[22rem] px-1 sm:mt-8 sm:max-w-[26rem]">
            <div className="h-[0.38rem] overflow-hidden rounded-full bg-white/65 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: theme.card,
                }}
              />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[22rem] flex-1 flex-col justify-center pt-4 pb-6 min-[380px]:max-w-[23rem] sm:max-w-[30rem] sm:pb-8">
              <p
                className="pb-3 text-center text-[1.25rem] font-bold leading-tight text-[#EDECEC] min-[380px]:text-[1.45rem] sm:pb-4 sm:text-[1.6rem]"
              >
                {category.label}
              </p>
            <div
              className="rounded-[1.05rem] px-2 py-3 shadow-[0_16px_32px_rgba(0,0,0,0.2)] min-[380px]:px-2.5 sm:rounded-[1.15rem] sm:px-4 sm:py-4"
              style={{ backgroundColor: theme.card }}
            >
              <h1 className="px-2 pt-2 pb-3 text-center text-[1rem] font-medium leading-[1.35] text-white min-[380px]:text-[1.08rem] sm:px-6 sm:pb-4 sm:text-[1.12rem] sm:leading-[1.45]">
                {currentQuestion.text}
              </h1>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <QuizOption
                    accentColor={theme.accent}
                    accentTextColor={theme.accentText}
                    key={option.key}
                    option={option}
                    isSelected={currentAnswer?.key === option.key}
                    onSelect={() => selectAnswer(currentQuestion.id, option)}
                  />
                ))}
              </div>

              {submitError ? (
                <p className="px-2 pt-3 pb-1 text-center text-xs font-semibold text-[#ffd5d5]">{submitError}</p>
              ) : null}

              <div className="flex w-full items-center justify-between px-3 pb-2 pt-3">
                <NavArrow
                  direction="prev"
                  disabled={isFirst || isSubmitting}
                  label="Previous question"
                  onClick={goPrev}
                />

                <NavArrow
                  direction="next"
                  disabled={!hasAnswered || isSubmitting}
                  label={isLast ? "Submit quiz" : "Next question"}
                  onClick={handleAdvance}
                />
              </div>
            </div>
          </div>


        </div>
      </section>
    </Shell>
  )
}
