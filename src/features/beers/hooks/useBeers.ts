import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../shared/api/queryKeys'
import { DEFAULT_PAGE_SIZE } from '../../../shared/config/pagination'
import type { ListQueryOptions } from '../../../shared/sort'
import type { CreateBeerDto, UpdateBeerDto, UpsertBeerParametersDto } from '../../../shared/types'
import { beerApi } from '../api/beerApi'

export function useBeers(options?: ListQueryOptions) {
  const search = options?.search?.trim() || undefined
  const sortBy = options?.sortBy
  const sortDir = options?.sortDir
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE
  const deletedOnly = options?.deletedOnly ?? false

  return useQuery({
    queryKey: queryKeys.beers.list(search, sortBy, sortDir, page, pageSize, deletedOnly),
    queryFn: () => beerApi.getAll({ search, sortBy, sortDir, page, pageSize, deletedOnly }),
    placeholderData: keepPreviousData,
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

export function useRestoreBeer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => beerApi.restore(id),
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
