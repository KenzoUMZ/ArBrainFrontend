import { iconNames } from '../../assets/icons/iconNames'

const icons = import.meta.glob('../../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const iconMap = Object.fromEntries(
  Object.entries(icons).map(([path, svg]) => {
    const name = path.split('/').pop()?.replace('.svg', '') ?? ''
    return [name, svg as string]
  }),
)

// eslint-disable-next-line react-refresh/only-export-components
export { iconNames }

interface IconProps {
  name: string
  size?: number
  className?: string
  title?: string
}

export function Icon({ name, size = 20, className = '', title }: IconProps) {
  const svg = iconMap[name]

  if (!svg) {
    return null
  }

  const sizedSvg = svg
    .replace(
      '<svg ',
      `<svg aria-hidden="${title ? 'false' : 'true'}" `,
    )
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`)

  return (
    <span
      className={`icon ${className}`.trim()}
      style={{ width: size, height: size }}
      title={title}
      role={title ? 'img' : undefined}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: sizedSvg }}
    />
  )
}
