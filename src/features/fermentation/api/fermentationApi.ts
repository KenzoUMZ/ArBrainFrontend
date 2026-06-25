import apiClient from '../../../shared/api/apiClient'
import { buildListParams } from '../../../shared/sort'
import type { ListQueryOptions } from '../../../shared/sort'
import type {
  CreateFermentationRecordDto,
  FermentationRecordDto,
  PagedResult,
} from '../../../shared/types'

export const fermentationApi = {
  getAll: async (options?: ListQueryOptions): Promise<PagedResult<FermentationRecordDto>> => {
    const { data } = await apiClient.get<PagedResult<FermentationRecordDto>>(
      '/api/fermentation-records',
      {
        params: buildListParams(options),
      },
    )
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
}
