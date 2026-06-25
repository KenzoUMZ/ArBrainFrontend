const STORAGE_KEY = 'arbrain:sidebar-collapsed'

export function readSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function persistSidebarCollapsed(collapsed: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  } catch {
    // localStorage indisponível
  }
}
