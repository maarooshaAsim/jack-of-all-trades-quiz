import { useEffect, useState } from 'react'
import axios from 'axios'
import { questions } from '../config/questions.config.js'

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [outcome, setOutcome] = useState(null)

  const currentQuestion = questions[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === questions.length - 1
  const hasAnswered = !!answers[currentQuestion?.id]

  useEffect(() => {
    const warn = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', warn)

    return () => {
      window.removeEventListener('beforeunload', warn)
    }
  }, [])

  const selectAnswer = (questionId, option) => {
    setAnswers((previousAnswers) => ({ ...previousAnswers, [questionId]: option }))
  }

  const goNext = () => {
    if (!isLast) {
      setCurrentIndex((index) => index + 1)
    }
  }

  const goPrev = () => {
    if (!isFirst) {
      setCurrentIndex((index) => index - 1)
    }
  }

  const submit = async () => {
    setIsSubmitting(true)

    try {
      const payload = {
        session_id: crypto.randomUUID(),
        answers: questions.map((question, index) => {
          const selectedOption = answers[question.id]

          return {
            question_id: question.id,
            category: question.category,
            answer_key: selectedOption.key,
            answer_text: selectedOption.text,
            question_index: index,
            score_breadth: selectedOption.scores.breadth,
            score_depth: selectedOption.scores.depth,
            score_integration: selectedOption.scores.integration,
            score_output: selectedOption.scores.output,
            score_recognition: selectedOption.scores.recognition,
          }
        }),
      }

      const { data } = await axios.post('/api/submit', payload)

      setOutcome(data)

      return data
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    hasAnswered,
    isFirst,
    isLast,
    isSubmitting,
    outcome,
    selectAnswer,
    goNext,
    goPrev,
    submit,
  }
}
