import { describe, expect, it } from 'vitest'
import { buildComplianceRates, formatCompliancePercent } from './complianceRates'

describe('buildComplianceRates', () => {
  it('returns null when there are no records', () => {
    expect(
      buildComplianceRates({
        totalRecords: 0,
        withinStandardCount: 0,
        requiresAttentionCount: 0,
        outOfStandardCount: 0,
      }),
    ).toBeNull()
  })

  it('calculates percentage distribution from summary counts', () => {
    expect(
      buildComplianceRates({
        totalRecords: 8,
        withinStandardCount: 5,
        requiresAttentionCount: 2,
        outOfStandardCount: 1,
      }),
    ).toEqual({
      withinPercent: 62.5,
      attentionPercent: 25,
      outPercent: 12.5,
    })
  })
})

describe('formatCompliancePercent', () => {
  it('formats values using pt-BR locale', () => {
    expect(formatCompliancePercent(62.5)).toBe('62,5')
    expect(formatCompliancePercent(100)).toBe('100')
  })
})
