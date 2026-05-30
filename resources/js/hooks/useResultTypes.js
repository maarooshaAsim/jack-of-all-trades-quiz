import { useEffect, useState } from 'react'
import axios from 'axios'

export function useResultTypes() {
  const [resultTypes, setResultTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadResultTypes() {
      try {
        const { data } = await axios.get('/api/result-types')

        if (isMounted) {
          setResultTypes(data.data)
          setError(null)
        }
      } catch (requestError) {
        if (isMounted) {
          setError('Could not load the result types.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadResultTypes()

    return () => {
      isMounted = false
    }
  }, [])

  return { resultTypes, isLoading, error }
}

export function useResultType(slug) {
  const [resultType, setResultType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadResultType() {
      try {
        const { data } = await axios.get(`/api/result-types/${slug}`)

        if (isMounted) {
          setResultType(data.data)
          setError(null)
        }
      } catch (requestError) {
        if (isMounted) {
          setError('Could not load this result type.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadResultType()

    return () => {
      isMounted = false
    }
  }, [slug])

  return { resultType, isLoading, error }
}
