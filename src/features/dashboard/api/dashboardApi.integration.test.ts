import { describe, expect, it } from 'vitest'
import { dashboardApi } from './dashboardApi'

describe('dashboardApi integration', () => {
  it('fetches dashboard summary from API', async () => {
    const summary = await dashboardApi.getSummary()

    expect(summary).toEqual({
      totalRecords: 8,
      withinStandardCount: 5,
      requiresAttentionCount: 2,
      outOfStandardCount: 1,
    })
  })
})
