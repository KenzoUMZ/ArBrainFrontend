import { logoNames } from '../../assets/logos/logoNames'
import './Logo.css'

const logos = import.meta.glob('../../assets/logos/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const logoMap = Object.fromEntries(
  Object.entries(logos).map(([path, svg]) => {
    const name = path.split('/').pop()?.replace('.svg', '') ?? ''
    return [name, svg as string]
  }),
)

// eslint-disable-next-line react-refresh/only-export-components
export { logoNames }

/** Variantes de logo (Frame 170 + sidebar). */
export type LogoName =
  | 'logo-colored'
  | 'logo-icon-white'
  | 'logo-white'
  | 'logo-wordmark-white'

interface LogoProps {
  name?: LogoName
  height?: number
  className?: string
  title?: string
}

export function Logo({
  name = 'logo-icon-white',
  height = 36,
  className = '',
  title = 'ArBrain',
}: LogoProps) {
  const svg = logoMap[name]

  if (!svg) {
    return null
  }

  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)
  const [, , vbWidth = 1, vbHeight = 1] = (viewBoxMatch?.[1] ?? '0 0 1 1')
    .split(/\s+/)
    .map(Number)
  const width = Math.round((height * vbWidth) / vbHeight)

  const sizedSvg = svg
    .replace('<svg ', `<svg aria-hidden="${title ? 'false' : 'true'}" `)
    .replace(/width="[^"]*"/, `width="${width}"`)
    .replace(/height="[^"]*"/, `height="${height}"`)

  return (
    <span
      className={`logo ${className}`.trim()}
      style={{ width, height }}
      title={title}
      role={title ? 'img' : undefined}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: sizedSvg }}
    />
  )
}
