export default function AppHeader({ title, meta }) {
  return (
    <header className="app-header">
      <h2 className="app-header__title">{title}</h2>
      {meta && <span className="app-header__meta">{meta}</span>}
    </header>
  )
}
