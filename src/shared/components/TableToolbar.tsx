import type { ReactNode } from 'react'
import { Icon } from '../icons/Icon'
import { usePageSearch } from './PageSearchContext'

interface TableToolbarProps {
  title?: string
  searchPlaceholder?: string
  children?: ReactNode
}

export default function TableToolbar({
  title,
  searchPlaceholder,
  children,
}: TableToolbarProps) {
  const { search, setSearch, isSearchPending } = usePageSearch()
  const showSearch = searchPlaceholder !== undefined

  if (!title && !showSearch && !children) return null

  return (
    <div className="table-toolbar">
      <div className="table-toolbar__start">
        {title ? <h2 className="table-toolbar__title">{title}</h2> : null}
        {showSearch && (
          <div
            className={`table-toolbar__search${isSearchPending ? ' table-toolbar__search--pending' : ''}`}
          >
            <span className="table-toolbar__search-icon">
              {isSearchPending ? (
                <span className="search-spinner" aria-hidden="true" />
              ) : (
                <Icon name="lupa-preta-fundo-transp" size={16} />
              )}
            </span>
            <input
              type="search"
              className="table-toolbar__search-input"
              value={search}
              placeholder={searchPlaceholder}
              onChange={(event) => setSearch(event.target.value)}
              aria-label={searchPlaceholder}
              aria-busy={isSearchPending}
            />
          </div>
        )}
      </div>
      {children ? <div className="table-toolbar__actions">{children}</div> : null}
    </div>
  )
}
