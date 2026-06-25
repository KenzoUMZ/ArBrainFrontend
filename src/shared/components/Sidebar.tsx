import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDashboardSummary } from '../../features/dashboard/hooks/useDashboard'
import { Icon } from '../icons/Icon'
import { Logo } from '../logos/Logo'
import { navItems } from '../navigation/navItems'
import { persistSidebarCollapsed, readSidebarCollapsed } from '../navigation/sidebarStorage'
import './Sidebar.css'

function MenuIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => readSidebarCollapsed())
  const { data: dashboard } = useDashboardSummary()
  const hasComplianceAlerts = (dashboard?.outOfStandardCount ?? 0) > 0

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current
      persistSidebarCollapsed(next)
      return next
    })
  }

  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        {!collapsed && (
          <div className="sidebar__brand">
            <Logo name="logo-white" height={36} className="sidebar__logo" title="ArBrain ERP" />
          </div>
        )}
        <button
          type="button"
          className="sidebar__toggle"
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
          aria-expanded={!collapsed}
        >
          <MenuIcon />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const showAlertBadge = item.to === '/fermentacao' && hasComplianceAlerts

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              <span className="sidebar__link-icon-wrap">
                <Icon name={item.icon} size={20} />
                {showAlertBadge ? (
                  <span
                    className="sidebar__alert-badge"
                    aria-label="Há apontamentos fora do padrão"
                    title="Há apontamentos fora do padrão"
                  />
                ) : null}
              </span>
              <span className="sidebar__link-label">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {!collapsed ? (
        <div className="sidebar__footer">
          <Logo
            name="logo-text"
            height={84}
            className="sidebar__footer-logo"
            title="ArBrain"
          />
        </div>
      ) : null}
    </aside>
  )
}
