import { useCallback, useState } from 'react'
import type { SortDirection, SortState } from './types'

export function useSort(defaultField: string, defaultDirection: SortDirection = 'asc') {
  const [sortField, setSortField] = useState(defaultField)
  const [sortDir, setSortDir] = useState<SortDirection>(defaultDirection)

  const toggleSort = useCallback((field: string, alphabetical = false) => {
    if (alphabetical) {
      setSortField(field)
      setSortDir('asc')
      return
    }

    setSortField((currentField) => {
      if (currentField === field) {
        setSortDir((currentDir) => (currentDir === 'asc' ? 'desc' : 'asc'))
        return currentField
      }

      setSortDir('asc')
      return field
    })
  }, [])

  const sort: SortState = { field: sortField, direction: sortDir }

  return { sortField, sortDir, sort, toggleSort }
}
