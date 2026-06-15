import React, { useEffect, useRef, useState } from 'react'
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
  const autoAdvanceTimeout = useRef(null)

  useEffect(() => {
    if (!participant) {
      navigate('/quiz/info', { replace: true })
    }
  }, [navigate, participant])

  useEffect(() => {
    return () => {
      window.clearTimeout(autoAdvanceTimeout.current)
    }
  }, [])

  if (!participant) {
    return null
  }

  const currentAnswer = answers[currentQuestion.id]
  const category = getCategoryMeta(currentQuestion.category)
  const theme = getQuestionTheme(currentQuestion.category)
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  const handleAdvance = async () => {
    window.clearTimeout(autoAdvanceTimeout.current)

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

  const submitQuiz = async (answersToSubmit) => {
    setSubmitError(null)

    try {
      const result = await submit(answersToSubmit)

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

  const handleSelectAnswer = (option) => {
    if (isSubmitting) {
      return
    }

    window.clearTimeout(autoAdvanceTimeout.current)

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    }

    selectAnswer(currentQuestion.id, option)

    if (!isLast) {
      autoAdvanceTimeout.current = window.setTimeout(() => {
        goNext()
      }, 180)

      return
    }

    submitQuiz(nextAnswers)
  }

  const handlePrevious = () => {
    window.clearTimeout(autoAdvanceTimeout.current)
    goPrev()
  }

  return (
    <Shell tone="" backgroundColor={category.color} fullBleed>    
      <section
        className="joat-artboard relative h-[100svh] overflow-hidden px-3 py-3 min-[380px]:px-5 min-[380px]:py-4"
        style={{ backgroundColor: category.color }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.9] bg-[length:25rem_auto] md:bg-[length:32rem_auto] xl:bg-[length:34rem_auto]"
          style={{
            backgroundImage: `url(${questionStarsPath})`,
            backgroundPosition: 'center 20rem',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[10rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.015) 38%, rgba(255,255,255,0.03) 100%)',
          }}
        />

        <div className="relative pb-10 z-10 flex h-full min-h-0 flex-col items-center">
          <div className="mt-7 flex w-full shrink-0 justify-center min-[390px]:mt-8">
            <Logo variant="light" className="max-w-[16.5rem] min-[390px]:max-w-[18rem]" />
          </div>

          <div className="mx-auto mt-4 w-full max-w-[21rem] shrink-0 px-1 min-[380px]:mt-5">
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

          <div className="mx-auto mt-[clamp(1.75rem,6svh,4rem)] w-full max-w-[21rem] shrink-0 pb-2 min-[380px]:max-w-[23rem] min-[380px]:pb-3">
              <p
                className="relative z-20 pb-2 text-center font-['Outfit'] text-[1rem] font-bold uppercase leading-tight text-[#EDECEC] min-[380px]:text-[1.40rem]"
              >
                {category.label}
              </p>
            <div
              className="relative z-10 rounded-[1.05rem] px-2 py-2.5 shadow-[0_16px_32px_rgba(0,0,0,0.2)] min-[380px]:px-2.5 min-[380px]:py-3"
              style={{ backgroundColor: theme.card }}
            >
              <h1 className="px-2 pb-2 pt-1.5 text-center font-['Outfit'] text-[0.78rem] leading-[1.22] text-white min-[380px]:pb-3 min-[380px]:pt-2 min-[380px]:text-[0.98rem]">
                {currentQuestion.text}
              </h1>

              <div className="space-y-2.5 min-[380px]:space-y-3">
                {currentQuestion.options.map((option) => (
                  <QuizOption
                    accentColor={theme.accent}
                    accentTextColor={theme.accentText}
                    key={option.key}
                    option={option}
                    isSelected={currentAnswer?.key === option.key}
                    onSelect={() => handleSelectAnswer(option)}
                    disabled={isSubmitting}
                  />
                ))}
              </div>

              {submitError ? (
                <p className="px-2 pt-3 pb-1 text-center text-xs font-semibold text-[#ffd5d5]">{submitError}</p>
              ) : null}

              <div className="flex w-full items-center justify-between px-3 pb-1 pt-2.5 min-[380px]:pb-2 min-[380px]:pt-3">
                <NavArrow
                  direction="prev"
                  disabled={isFirst || isSubmitting}
                  label="Previous question"
                  onClick={handlePrevious}
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
