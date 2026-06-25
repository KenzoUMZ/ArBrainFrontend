import apiClient from '../../../shared/api/apiClient'
import { buildListParams } from '../../../shared/sort'
import type { ListQueryOptions } from '../../../shared/sort'
import type { BatchHistoryDto, BatchSummaryDto } from '../../../shared/types'

export const batchApi = {
  getAll: async (options?: ListQueryOptions): Promise<BatchSummaryDto[]> => {
    const { data } = await apiClient.get<BatchSummaryDto[]>(
      '/api/fermentation-records/batches',
      {
        params: buildListParams(options),
      },
    )
    return data
  },

  getHistory: async (batchNumber: string): Promise<BatchHistoryDto> => {
    const { data } = await apiClient.get<BatchHistoryDto>(
      `/api/fermentation-records/batches/${encodeURIComponent(batchNumber)}`,
    )
    return data
  },
}
