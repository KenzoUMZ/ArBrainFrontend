import apiClient from '../../../shared/api/apiClient'
import type {
  BeerDto,
  BeerFermentationParametersDto,
  CreateBeerDto,
  UpdateBeerDto,
  UpsertBeerParametersDto,
} from '../../../shared/types'

export const beerApi = {
  getAll: async (): Promise<BeerDto[]> => {
    const { data } = await apiClient.get<BeerDto[]>('/api/beers')
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
