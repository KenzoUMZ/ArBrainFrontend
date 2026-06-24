import type { SortDirection } from '../sort/types'

interface SortableHeaderProps {
  label: string
  field: string
  sortField: string
  sortDir: SortDirection
  onSort: (field: string, alphabetical?: boolean) => void
  /** Colunas de nome: apenas destaque visual, sem seta de direção; sempre A→Z. */
  alphabetical?: boolean
}

export default function SortableHeader({
  label,
  field,
  sortField,
  sortDir,
  onSort,
  alphabetical = false,
}: SortableHeaderProps) {
  const isActive = sortField === field

  return (
    <th
      scope="col"
      className={[
        'sortable-header',
        isActive && 'sortable-header--active',
        alphabetical && 'sortable-header--alphabetical',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onSort(field, alphabetical)}
      aria-sort={
        isActive
          ? alphabetical || sortDir === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <span className="sortable-header__label">{label}</span>
      <span
        className={[
          'sortable-header__indicator',
          alphabetical && 'sortable-header__indicator--reserved',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {alphabetical ? '↕' : isActive ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
      </span>
    </th>
  )
}
