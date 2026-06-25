import type { SortDirection } from '../sort/types'

interface SortableHeaderProps {
  label: string
  field: string
  sortField: string
  sortDir: SortDirection
  onSort: (field: string) => void
  /** Render as table header cell or div (for non-table lists). */
  as?: 'th' | 'div'
  className?: string
}

export default function SortableHeader({
  label,
  field,
  sortField,
  sortDir,
  onSort,
  as: Tag = 'th',
  className = '',
}: SortableHeaderProps) {
  const isActive = sortField === field

  return (
    <Tag
      scope={Tag === 'th' ? 'col' : undefined}
      role={Tag === 'div' ? 'button' : undefined}
      tabIndex={Tag === 'div' ? 0 : undefined}
      className={[
        'sortable-header',
        isActive && 'sortable-header--active',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onSort(field)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSort(field)
        }
      }}
      aria-sort={
        isActive ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'
      }
    >
      <span className="sortable-header__label">{label}</span>
      <span className="sortable-header__indicator" aria-hidden="true">
        {isActive ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </Tag>
  )
}
