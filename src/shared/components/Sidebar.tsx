import { NavLink } from 'react-router-dom'
import { Icon } from '../icons/Icon'
import { Logo } from '../logos/Logo'
import './Sidebar.css'

const navItems: Array<{
  to: string
  label: string
  icon: string
  end?: boolean
}> = [
  { to: '/', label: 'Dashboard', icon: 'home', end: true },
  { to: '/cervejas', label: 'Cervejas', icon: 'barril-cheio' },
  { to: '/tanques', label: 'Tanques', icon: 'tanque-cheio' },
  { to: '/fermentacao', label: 'Fermentação', icon: 'monitor-dashboard' },
  { to: '/lotes', label: 'Lotes', icon: 'ticket-confirmation' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Logo name="logo-mark" height={36} className="sidebar__logo" />
        <div>
          <div className="sidebar__title">ArBrain ERP</div>
          <div className="sidebar__subtitle">Gestão fermentativa</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
