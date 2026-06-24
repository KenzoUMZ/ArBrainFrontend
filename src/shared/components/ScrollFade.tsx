import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import './scrollFade.css'

interface ScrollFadeProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export default function ScrollFade({
  children,
  className = '',
  'aria-label': ariaLabel,
}: ScrollFadeProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [fadeTop, setFadeTop] = useState(false)
  const [fadeBottom, setFadeBottom] = useState(false)

  const updateFades = useCallback(() => {
    const element = viewportRef.current
    if (!element) return

    const { scrollTop, scrollHeight, clientHeight } = element
    const edgeOffset = 6

    setFadeTop(scrollTop > edgeOffset)
    setFadeBottom(scrollTop + clientHeight < scrollHeight - edgeOffset)
  }, [])

  useEffect(() => {
    const element = viewportRef.current
    if (!element) return

    updateFades()

    const resizeObserver = new ResizeObserver(updateFades)
    resizeObserver.observe(element)

    const content = element.firstElementChild
    if (content) resizeObserver.observe(content)

    return () => resizeObserver.disconnect()
  }, [updateFades, children])

  const fadeClass = [
    'scroll-fade',
    fadeTop ? 'scroll-fade--top' : '',
    fadeBottom ? 'scroll-fade--bottom' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fadeClass}>
      <div
        ref={viewportRef}
        className={`scroll-fade__viewport ${className}`.trim()}
        aria-label={ariaLabel}
        tabIndex={-1}
        onScroll={updateFades}
      >
        {children}
      </div>
    </div>
  )
}
