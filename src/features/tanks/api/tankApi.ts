import apiClient from '../../../shared/api/apiClient'
import { buildListParams } from '../../../shared/sort'
import type { ListQueryOptions } from '../../../shared/sort'
import type { CreateTankDto, PagedResult, TankDto, UpdateTankDto } from '../../../shared/types'

export const tankApi = {
  getAll: async (options?: ListQueryOptions): Promise<PagedResult<TankDto>> => {
    const { data } = await apiClient.get<PagedResult<TankDto>>('/api/tanks', {
      params: buildListParams(options),
    })
    return data
  },

  getById: async (id: string): Promise<TankDto> => {
    const { data } = await apiClient.get<TankDto>(`/api/tanks/${id}`)
    return data
  },

  create: async (payload: CreateTankDto): Promise<TankDto> => {
    const { data } = await apiClient.post<TankDto>('/api/tanks', payload)
    return data
  },

  update: async (id: string, payload: UpdateTankDto): Promise<TankDto> => {
    const { data } = await apiClient.put<TankDto>(`/api/tanks/${id}`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/tanks/${id}`)
  },

  restore: async (id: string): Promise<void> => {
    await apiClient.post(`/api/tanks/${id}/restore`)
  },
}
