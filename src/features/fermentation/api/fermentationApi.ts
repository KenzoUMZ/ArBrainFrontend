import apiClient from '../../../shared/api/apiClient'
import type {
  BatchHistoryDto,
  BatchSummaryDto,
  CreateFermentationRecordDto,
  FermentationRecordDto,
} from '../../../shared/types'

export const fermentationApi = {
  getAll: async (): Promise<FermentationRecordDto[]> => {
    const { data } = await apiClient.get<FermentationRecordDto[]>('/api/fermentation-records')
    return data
  },

  getById: async (id: string): Promise<FermentationRecordDto> => {
    const { data } = await apiClient.get<FermentationRecordDto>(
      `/api/fermentation-records/${id}`,
    )
    return data
  },

  create: async (payload: CreateFermentationRecordDto): Promise<FermentationRecordDto> => {
    const { data } = await apiClient.post<FermentationRecordDto>(
      '/api/fermentation-records',
      payload,
    )
    return data
  },

  getBatches: async (): Promise<BatchSummaryDto[]> => {
    const { data } = await apiClient.get<BatchSummaryDto[]>(
      '/api/fermentation-records/batches',
    )
    return data
  },

  getBatchHistory: async (batchNumber: string): Promise<BatchHistoryDto> => {
    const { data } = await apiClient.get<BatchHistoryDto>(
      `/api/fermentation-records/batches/${encodeURIComponent(batchNumber)}`,
    )
    return data
  },
}
