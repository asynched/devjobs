import { useCallback, useEffect, useState } from 'react'

type AsyncState<T> = {
  data: T
  error: Error
  isLoading: boolean
}

export default function useAsync<T>(
  fn: () => Promise<T>,
): AsyncState<T> {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  return {
    data,
    error,
    isLoading,
  } as any
}
