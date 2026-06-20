import apiClient from '../../../shared/api/apiClient'
import type { CreateTankDto, TankDto, UpdateTankDto } from '../../../shared/types'

export const tankApi = {
  getAll: async (): Promise<TankDto[]> => {
    const { data } = await apiClient.get<TankDto[]>('/api/tanks')
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
}
