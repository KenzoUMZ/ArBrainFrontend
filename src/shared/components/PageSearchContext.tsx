import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'
import { SEARCH_DEBOUNCE_MS } from '../config/search'
import { toSearchTerm, useDebouncedSearch } from '../hooks/useDebouncedSearch'

interface PageSearchContextValue {
  search: string
  setSearch: (value: string) => void
  debouncedSearch: string
  debouncedSearchTerm: string | undefined
  isSearchPending: boolean
  debounceMs: number
}

const PageSearchContext = createContext<PageSearchContextValue | null>(null)

export function PageSearchProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedSearch(search, SEARCH_DEBOUNCE_MS)
  const debouncedSearchTerm = toSearchTerm(debouncedSearch)
  const isSearchPending = search !== debouncedSearch

  useEffect(() => {
    setSearch('')
  }, [pathname])

  const value = useMemo(
    () => ({
      search,
      setSearch,
      debouncedSearch,
      debouncedSearchTerm,
      isSearchPending,
      debounceMs: SEARCH_DEBOUNCE_MS,
    }),
    [search, debouncedSearch, debouncedSearchTerm, isSearchPending],
  )

  return <PageSearchContext.Provider value={value}>{children}</PageSearchContext.Provider>
}

export function usePageSearch() {
  const context = useContext(PageSearchContext)
  if (!context) {
    throw new Error('usePageSearch must be used within PageSearchProvider')
  }
  return context
}

export function usePageSearchTerm() {
  const { debouncedSearchTerm } = usePageSearch()
  return debouncedSearchTerm
}
