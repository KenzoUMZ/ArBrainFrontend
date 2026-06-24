import { useEffect, useState } from 'react'
import { LOADING_SKELETON_DELAY_MS } from '../config/loading'

export function useDelayedLoading(
  isLoading: boolean,
  delayMs: number = LOADING_SKELETON_DELAY_MS,
): boolean {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false)
      return
    }

    const timer = window.setTimeout(() => setShowLoading(true), delayMs)
    return () => window.clearTimeout(timer)
  }, [isLoading, delayMs])

  return showLoading
}
