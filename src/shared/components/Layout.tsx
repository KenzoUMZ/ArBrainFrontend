import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { findNavItem } from '../navigation/navItems'
import AnimatedOutlet from './AnimatedOutlet'
import AppHeader from './AppHeader'
import { PageSearchProvider } from './PageSearchContext'
import Sidebar from './Sidebar'
import './Layout.css'

function LayoutMain() {
  const { pathname } = useLocation()
  const navItem = findNavItem(pathname)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return (
    <div className="layout__main">
      {navItem && (
        <div key={pathname} className="app-header-transition">
          <AppHeader
            title={navItem.title}
            description={navItem.description}
            icon={navItem.icon}
          />
        </div>
      )}
      <main ref={contentRef} className="layout__content">
        <AnimatedOutlet />
      </main>
    </div>
  )
}

export default function Layout() {
  return (
    <PageSearchProvider>
      <div className="layout">
        <Sidebar />
        <LayoutMain />
      </div>
    </PageSearchProvider>
  )
}
