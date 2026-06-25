import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import { DEFAULT_PAGE_SIZE } from '../../../shared/config/pagination'
import type { ListQueryOptions } from '../../../shared/sort'
import { FermentationComplianceStatus, type CreateFermentationRecordDto } from '../../../shared/types'
import { fermentationApi } from '../api/fermentationApi'

function complianceQueryKey(status?: FermentationComplianceStatus): string {
  if (status === undefined) return ''
  return Object.entries(FermentationComplianceStatus).find(([, value]) => value === status)?.[0] ?? ''
}

export function useFermentationRecords(options?: ListQueryOptions) {
  const search = options?.search?.trim() || undefined
  const sortBy = options?.sortBy
  const sortDir = options?.sortDir
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE
  const complianceStatus = options?.complianceStatus
  const complianceKey = complianceQueryKey(complianceStatus)

  return useQuery({
    queryKey: queryKeys.fermentationRecords.list(
      search,
      sortBy,
      sortDir,
      page,
      pageSize,
      complianceKey,
    ),
    queryFn: () =>
      fermentationApi.getAll({
        search,
        sortBy,
        sortDir,
        page,
        pageSize,
        complianceStatus,
      }),
    placeholderData: keepPreviousData,
  })
}

export function useFermentationRecord(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.fermentationRecords.detail(id ?? ''),
    queryFn: () => fermentationApi.getById(id!),
    enabled: Boolean(id),
  })
}

export function useCreateFermentationRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateFermentationRecordDto) =>
      fermentationApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fermentationRecords.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.batches.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary })
    },
  })
}
