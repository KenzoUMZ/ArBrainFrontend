import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from './AppHeader'
import Sidebar from './Sidebar'
import './Layout.css'

const pageTitles = {
  '/': 'Dashboard',
  '/cervejas': 'Cervejas',
}

export default function Layout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'ArBrain ERP'

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <AppHeader title={title} meta="Demo técnico" />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
