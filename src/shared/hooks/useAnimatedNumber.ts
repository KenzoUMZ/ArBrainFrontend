import { useEffect, useState } from 'react'

/** Animação numérica para métricas do dashboard (contagem progressiva). */
interface UseAnimatedNumberOptions {
  duration?: number
  delay?: number
  decimals?: number
  enabled?: boolean
}

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function shouldAnimate(): boolean {
  if (import.meta.env.MODE === 'test') {
    return false
  }

  return !prefersReducedMotion()
}

export function useAnimatedNumber(
  target: number,
  {
    duration = 900,
    delay = 0,
    decimals = 0,
    enabled = true,
  }: UseAnimatedNumberOptions = {},
): number {
  const [value, setValue] = useState(() => (enabled && shouldAnimate() ? 0 : target))

  useEffect(() => {
    if (!enabled || !shouldAnimate()) {
      setValue(target)
      return
    }

    let frame = 0
    let delayTimer = 0

    const startAnimation = () => {
      const from = 0
      const start = performance.now()
      const factor = 10 ** decimals

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const current = from + (target - from) * easeOutCubic(progress)
        setValue(Math.round(current * factor) / factor)

        if (progress < 1) {
          frame = requestAnimationFrame(tick)
        }
      }

      frame = requestAnimationFrame(tick)
    }

    if (delay > 0) {
      delayTimer = window.setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    return () => {
      window.clearTimeout(delayTimer)
      cancelAnimationFrame(frame)
    }
  }, [target, duration, delay, decimals, enabled])

  return value
}
