import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import type { CreateBeerDto, UpdateBeerDto, UpsertBeerParametersDto } from '../../../shared/types'
import { beerApi } from '../api/beerApi'

export function useBeers() {
  return useQuery({
    queryKey: queryKeys.beers.all,
    queryFn: beerApi.getAll,
  })
}

export function useBeer(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.beers.detail(id ?? ''),
    queryFn: () => beerApi.getById(id!),
    enabled: Boolean(id),
  })
}

export function useBeerParameters(beerId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.beers.parameters(beerId ?? ''),
    queryFn: () => beerApi.getParameters(beerId!),
    enabled: Boolean(beerId),
  })
}

export function useCreateBeer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateBeerDto) => beerApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.all })
    },
  })
}

export function useUpdateBeer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBeerDto }) =>
      beerApi.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.detail(id) })
    },
  })
}

export function useDeleteBeer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => beerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.all })
    },
  })
}

export function useUpsertBeerParameters() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpsertBeerParametersDto
    }) => beerApi.upsertParameters(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.beers.parameters(id) })
    },
  })
}
