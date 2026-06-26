import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { queryKeys } from '../../../shared/api/queryKeys'
import type { ListQueryOptions } from '../../../shared/sort'
import type { BatchSummaryDto } from '../../../shared/types'
import { batchApi } from '../api/batchApi'
import {
  persistBatchSelection,
  readPersistedBatchSelection,
} from '../batchSelectionStorage'

export function useBatches(options?: ListQueryOptions) {
  const search = options?.search?.trim() || undefined
  const sortBy = options?.sortBy
  const sortDir = options?.sortDir

  return useQuery({
    queryKey: queryKeys.batches.list(search, sortBy, sortDir),
    queryFn: () => batchApi.getAll({ search, sortBy, sortDir }),
    placeholderData: keepPreviousData,
  })
}

export function useBatchHistory(batchNumber: string | undefined) {
  return useQuery({
    queryKey: queryKeys.batches.history(batchNumber ?? ''),
    queryFn: () => batchApi.getHistory(batchNumber!),
    enabled: Boolean(batchNumber),
    gcTime: 5 * 60_000,
  })
}

function resolveSelection(
  batches: BatchSummaryDto[],
  current: string | null,
): string | null {
  if (batches.length === 0) return null

  // Mantém a seleção atual quando o lote ainda existe na lista filtrada.
  if (current && batches.some((batch) => batch.batchNumber === current)) {
    return current
  }

  return batches[0].batchNumber
}

/** Restaura o lote selecionado da sessão e sincroniza com a lista carregada. */
export function useSelectedBatch(batches: BatchSummaryDto[], batchesReady: boolean) {
  const [selectedBatch, setSelectedBatchState] = useState<string | null>(() =>
    readPersistedBatchSelection(),
  )

  useEffect(() => {
    if (!batchesReady) return

    setSelectedBatchState((current) => {
      const next = resolveSelection(batches, current)
      if (next !== current) {
        persistBatchSelection(next)
      }
      return next
    })
  }, [batches, batchesReady])

  const setSelectedBatch = useCallback((batchNumber: string) => {
    setSelectedBatchState(batchNumber)
    persistBatchSelection(batchNumber)
  }, [])

  return { selectedBatch, setSelectedBatch }
}
