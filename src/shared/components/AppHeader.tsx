import { Icon } from '../icons/Icon'

interface AppHeaderProps {
  title: string
  description: string
  icon?: string
}

export default function AppHeader({ title, description, icon }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__top">
        <div className="app-header__identity">
          {icon && (
            <span className="app-header__icon">
              <Icon name={icon} size={22} />
            </span>
          )}
          <div className="app-header__text">
            <h1 className="app-header__title">{title}</h1>
            <p className="app-header__description">{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
