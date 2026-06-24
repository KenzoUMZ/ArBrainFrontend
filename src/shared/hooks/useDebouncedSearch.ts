import { SEARCH_DEBOUNCE_MS } from '../config/search'
import { useDebouncedValue } from './useDebouncedValue'

export function toSearchTerm(value: string): string | undefined {
  const term = value.trim()
  return term.length > 0 ? term : undefined
}

/** Debounce reutilizável para qualquer campo de pesquisa. */
export function useDebouncedSearch(
  value: string,
  delayMs: number = SEARCH_DEBOUNCE_MS,
): string {
  return useDebouncedValue(value, delayMs)
}

/** Valor debounced já normalizado para query params (`undefined` se vazio). */
export function useDebouncedSearchTerm(
  value: string,
  delayMs: number = SEARCH_DEBOUNCE_MS,
): string | undefined {
  const debounced = useDebouncedSearch(value, delayMs)
  return toSearchTerm(debounced)
}
