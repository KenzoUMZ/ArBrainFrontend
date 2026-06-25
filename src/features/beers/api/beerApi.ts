import apiClient from '../../../shared/api/apiClient'
import { buildListParams } from '../../../shared/sort'
import type { ListQueryOptions } from '../../../shared/sort'
import type {
  BeerDto,
  BeerFermentationParametersDto,
  CreateBeerDto,
  PagedResult,
  UpdateBeerDto,
  UpsertBeerParametersDto,
} from '../../../shared/types'

export const beerApi = {
  getAll: async (options?: ListQueryOptions): Promise<PagedResult<BeerDto>> => {
    const { data } = await apiClient.get<PagedResult<BeerDto>>('/api/beers', {
      params: buildListParams(options),
    })
    return data
  },

  getById: async (id: string): Promise<BeerDto> => {
    const { data } = await apiClient.get<BeerDto>(`/api/beers/${id}`)
    return data
  },

  create: async (payload: CreateBeerDto): Promise<BeerDto> => {
    const { data } = await apiClient.post<BeerDto>('/api/beers', payload)
    return data
  },

  update: async (id: string, payload: UpdateBeerDto): Promise<BeerDto> => {
    const { data } = await apiClient.put<BeerDto>(`/api/beers/${id}`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/beers/${id}`)
  },

  restore: async (id: string): Promise<void> => {
    await apiClient.post(`/api/beers/${id}/restore`)
  },

  getParameters: async (id: string): Promise<BeerFermentationParametersDto> => {
    const { data } = await apiClient.get<BeerFermentationParametersDto>(
      `/api/beers/${id}/parameters`,
    )
    return data
  },

  upsertParameters: async (
    id: string,
    payload: UpsertBeerParametersDto,
  ): Promise<BeerFermentationParametersDto> => {
    const { data } = await apiClient.put<BeerFermentationParametersDto>(
      `/api/beers/${id}/parameters`,
      payload,
    )
    return data
  },
}
