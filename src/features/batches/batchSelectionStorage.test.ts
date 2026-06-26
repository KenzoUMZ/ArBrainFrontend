import { describe, expect, it, beforeEach } from 'vitest'
import { persistBatchSelection, readPersistedBatchSelection } from './batchSelectionStorage'

describe('batchSelectionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('persists and reads selected batch', () => {
    persistBatchSelection('IPA001')
    expect(readPersistedBatchSelection()).toBe('IPA001')
  })

  it('clears selection when batch is null', () => {
    persistBatchSelection('IPA001')
    persistBatchSelection(null)
    expect(readPersistedBatchSelection()).toBeNull()
  })
})
