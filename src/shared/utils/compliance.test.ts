import { describe, expect, it } from 'vitest'
import { FermentationComplianceStatus } from '../types'
import {
  batchListItemClass,
  complianceBadgeClass,
  complianceDotClass,
  complianceFilterChipClass,
  complianceLabel,
  evaluateCompliance,
  parseComplianceParam,
} from './compliance'

const defaultParameters = {
  minTemperature: 18,
  maxTemperature: 22,
  minPh: 4.0,
  maxPh: 4.6,
  minExtract: 10,
  maxExtract: 14,
}

describe('compliance utils', () => {
  it('parseComplianceParam returns status for valid enum name', () => {
    expect(parseComplianceParam('WithinStandard')).toBe(FermentationComplianceStatus.WithinStandard)
    expect(parseComplianceParam('OutOfStandard')).toBe(FermentationComplianceStatus.OutOfStandard)
  })

  it('parseComplianceParam returns undefined for invalid or empty values', () => {
    expect(parseComplianceParam(null)).toBeUndefined()
    expect(parseComplianceParam('Invalid')).toBeUndefined()
  })

  it('complianceLabel returns localized label', () => {
    expect(complianceLabel(FermentationComplianceStatus.WithinStandard)).toBe('Dentro do padrão')
  })

  it('complianceFilterChipClass maps status to chip class', () => {
    expect(complianceFilterChipClass(FermentationComplianceStatus.RequiresAttention)).toBe(
      'filter-chip--warning',
    )
  })

  it('batchListItemClass maps status to batch card modifier', () => {
    expect(batchListItemClass(FermentationComplianceStatus.OutOfStandard)).toBe(
      'batch-list__item--out',
    )
  })

  it('complianceBadgeClass maps status to badge modifier', () => {
    expect(complianceBadgeClass(FermentationComplianceStatus.WithinStandard)).toBe('badge--success')
  })

  it('complianceDotClass maps status to dot modifier', () => {
    expect(complianceDotClass(FermentationComplianceStatus.RequiresAttention)).toBe(
      'compliance-dot--warning',
    )
  })

  it('evaluateCompliance returns WithinStandard for centered metrics', () => {
    expect(evaluateCompliance(20, 4.3, 12, defaultParameters)).toBe(
      FermentationComplianceStatus.WithinStandard,
    )
  })

  it('evaluateCompliance returns RequiresAttention near limits', () => {
    expect(evaluateCompliance(18.3, 4.3, 12, defaultParameters)).toBe(
      FermentationComplianceStatus.RequiresAttention,
    )
  })

  it('evaluateCompliance returns OutOfStandard when any metric is outside range', () => {
    expect(evaluateCompliance(17.9, 4.3, 12, defaultParameters)).toBe(
      FermentationComplianceStatus.OutOfStandard,
    )
  })
})
