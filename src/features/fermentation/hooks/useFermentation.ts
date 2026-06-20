import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import type { CreateFermentationRecordDto } from '../../../shared/types'
import { fermentationApi } from '../api/fermentationApi'

export function useFermentationRecords() {
  return useQuery({
    queryKey: queryKeys.fermentationRecords.all,
    queryFn: fermentationApi.getAll,
  })
}

export function useFermentationRecord(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.fermentationRecords.detail(id ?? ''),
    queryFn: () => fermentationApi.getById(id!),
    enabled: Boolean(id),
  })
}

export function useBatches() {
  return useQuery({
    queryKey: queryKeys.fermentationRecords.batches,
    queryFn: fermentationApi.getBatches,
  })
}

export function useBatchHistory(batchNumber: string | undefined) {
  return useQuery({
    queryKey: queryKeys.fermentationRecords.batchHistory(batchNumber ?? ''),
    queryFn: () => fermentationApi.getBatchHistory(batchNumber!),
    enabled: Boolean(batchNumber),
  })
}

export function useCreateFermentationRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateFermentationRecordDto) =>
      fermentationApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fermentationRecords.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.fermentationRecords.batches })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary })
    },
  })
}
