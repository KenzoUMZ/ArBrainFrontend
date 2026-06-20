interface AppHeaderProps {
  title: string
  meta?: string
}

export default function AppHeader({ title, meta }: AppHeaderProps) {
  return (
    <header className="app-header">
      <h2 className="app-header__title">{title}</h2>
      {meta && <span className="app-header__meta">{meta}</span>}
    </header>
  )
}
