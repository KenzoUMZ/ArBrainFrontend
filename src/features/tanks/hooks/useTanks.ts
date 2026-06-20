import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import type { CreateTankDto, UpdateTankDto } from '../../../shared/types'
import { tankApi } from '../api/tankApi'

export function useTanks() {
  return useQuery({
    queryKey: queryKeys.tanks.all,
    queryFn: tankApi.getAll,
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
