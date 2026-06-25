import { useCallback, useState } from 'react'
import type { SortDirection, SortState } from './types'

export function useSort(defaultField: string, defaultDirection: SortDirection = 'asc') {
  const [sort, setSort] = useState<SortState>({
    field: defaultField,
    direction: defaultDirection,
  })

  const toggleSort = useCallback((field: string) => {
    setSort((current) => {
      if (current.field === field) {
        return {
          field,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return { field, direction: 'asc' }
    })
  }, [])

  const resetSort = useCallback((field: string, direction: SortDirection = 'asc') => {
    setSort({ field, direction })
  }, [])

  return {
    sortField: sort.field,
    sortDir: sort.direction,
    sort,
    toggleSort,
    resetSort,
  }
}
