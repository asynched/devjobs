import { useRef, useEffect, useCallback } from 'react'

export default function useDebounce<F extends (...args: any) => any>(
  fn: F,
  debounceTimeout: number
): (...args: Parameters<F>) => ReturnType<F> {
  const timer = useRef<NodeJS.Timer | null>()
  const savedFunc = useRef<F | null>(fn)

  useEffect(() => {
    savedFunc.current = fn
  }, [debounceTimeout])

  return useCallback((...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }

    timer.current = setTimeout(
      () => savedFunc.current?.(...args),
      debounceTimeout
    )
  }, []) as (...args: Parameters<F>) => ReturnType<F>
}
