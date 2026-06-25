import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import { DEFAULT_PAGE_SIZE } from '../../../shared/config/pagination'
import type { ListQueryOptions } from '../../../shared/sort'
import type { CreateTankDto, UpdateTankDto } from '../../../shared/types'
import { tankApi } from '../api/tankApi'

export function useTanks(options?: ListQueryOptions) {
  const search = options?.search?.trim() || undefined
  const sortBy = options?.sortBy
  const sortDir = options?.sortDir
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE
  const deletedOnly = options?.deletedOnly ?? false

  return useQuery({
    queryKey: queryKeys.tanks.list(search, sortBy, sortDir, page, pageSize, deletedOnly),
    queryFn: () => tankApi.getAll({ search, sortBy, sortDir, page, pageSize, deletedOnly }),
    placeholderData: keepPreviousData,
  })
}

export function useTank(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.tanks.detail(id ?? ''),
    queryFn: () => tankApi.getById(id!),
    enabled: Boolean(id),
  })
}

export function useCreateTank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTankDto) => tankApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tanks.all })
    },
  })
}

export function useUpdateTank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTankDto }) =>
      tankApi.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tanks.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.tanks.detail(id) })
    },
  })
}

export function useDeleteTank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tankApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tanks.all })
    },
  })
}

export function useRestoreTank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tankApi.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tanks.all })
    },
  })
}
