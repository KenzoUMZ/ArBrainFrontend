import type { CSSProperties } from 'react'

type ShimmerShape = 'default' | 'md' | 'pill' | 'circle'

interface ShimmerBlockProps {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  shape?: ShimmerShape
  className?: string
}

const shapeClass: Record<ShimmerShape, string> = {
  default: '',
  md: 'shimmer--md',
  pill: 'shimmer--pill',
  circle: 'shimmer--circle',
}

export default function ShimmerBlock({
  width = '100%',
  height = '1rem',
  shape = 'default',
  className = '',
}: ShimmerBlockProps) {
  return (
    <span
      className={`shimmer ${shapeClass[shape]} ${className}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
