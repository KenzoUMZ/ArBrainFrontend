import apiClient from '../../../shared/api/apiClient'
import type { DashboardSummaryDto } from '../../../shared/types'

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummaryDto> => {
    const { data } = await apiClient.get<DashboardSummaryDto>('/api/dashboard')
    return data
  },
}
