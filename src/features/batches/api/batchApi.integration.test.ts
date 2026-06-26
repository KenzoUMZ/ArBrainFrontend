import { describe, expect, it } from 'vitest'
import { FermentationComplianceStatus } from '../../../shared/types'
import { batchApi } from './batchApi'

describe('batchApi integration', () => {
  it('fetches batch summaries from API', async () => {
    const batches = await batchApi.getAll({ sortBy: 'batchNumber', sortDir: 'asc' })

    expect(batches).toHaveLength(1)
    expect(batches[0]).toEqual({
      batchNumber: 'IPA001',
      beerName: 'ArBrain IPA',
      recordCount: 2,
      complianceStatus: FermentationComplianceStatus.WithinStandard,
    })
  })

  it('fetches batch history by number', async () => {
    const history = await batchApi.getHistory('ipa001')

    expect(history.batchNumber).toBe('IPA001')
    expect(history.beerName).toBe('ArBrain IPA')
    expect(history.records).toHaveLength(1)
    expect(history.records[0]?.batchNumber).toBe('IPA001')
  })
})
