import { describe, expect, it, beforeEach } from 'vitest'
import { persistSidebarCollapsed, readSidebarCollapsed } from './sidebarStorage'

describe('sidebarStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns false when sidebar state is not persisted', () => {
    expect(readSidebarCollapsed()).toBe(false)
  })

  it('persists and reads collapsed state', () => {
    persistSidebarCollapsed(true)
    expect(readSidebarCollapsed()).toBe(true)

    persistSidebarCollapsed(false)
    expect(readSidebarCollapsed()).toBe(false)
  })
})
