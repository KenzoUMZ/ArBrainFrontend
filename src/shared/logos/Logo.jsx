import { logoNames } from '../../assets/logos/logoNames'
import './Logo.css'

const logos = import.meta.glob('../../assets/logos/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const logoMap = Object.fromEntries(
  Object.entries(logos).map(([path, svg]) => {
    const name = path.split('/').pop().replace('.svg', '')
    return [name, svg]
  }),
)

export { logoNames }

/**
 * Logo ArBrain exportada do Figma (Frame 170).
 * @param {'logo-arbrain' | 'logo-mark' | 'logo-wordmark'} name
 */
export function Logo({ name = 'logo-mark', height = 36, className = '', title = 'ArBrain' }) {
  const svg = logoMap[name]

  if (!svg) {
    return null
  }

  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)
  const [, , vbWidth = 1, vbHeight = 1] = (viewBoxMatch?.[1] ?? '0 0 1 1').split(/\s+/).map(Number)
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
