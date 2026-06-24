import { useEffect, useRef, useState } from 'react'
import { SHIMMER_MIN_VISIBLE_MS } from '../config/loading'

/**
 * Mantém um estado "ativo" verdadeiro por pelo menos `minMs` depois que ele começou.
 * Útil para que o skeleton/shimmer não pisque quando a resposta chega rápido demais.
 */
export function useMinimumVisible(
  active: boolean,
  minMs: number = SHIMMER_MIN_VISIBLE_MS,
): boolean {
  const [visible, setVisible] = useState(active)
  const startRef = useRef<number | null>(active ? Date.now() : null)

  useEffect(() => {
    if (active) {
      if (startRef.current === null) {
        startRef.current = Date.now()
      }
      setVisible(true)
      return
    }

    const start = startRef.current
    if (start === null) {
      setVisible(false)
      return
    }

    const remaining = minMs - (Date.now() - start)
    if (remaining <= 0) {
      startRef.current = null
      setVisible(false)
      return
    }

    const timer = window.setTimeout(() => {
      startRef.current = null
      setVisible(false)
    }, remaining)

    return () => window.clearTimeout(timer)
  }, [active, minMs])

  return visible
}
