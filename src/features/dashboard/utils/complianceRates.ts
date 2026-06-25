import type { DashboardSummaryDto } from '../../../shared/types'

export interface ComplianceRates {
  withinPercent: number
  attentionPercent: number
  outPercent: number
}

export function buildComplianceRates(summary: DashboardSummaryDto): ComplianceRates | null {
  if (summary.totalRecords <= 0) {
    return null
  }

  const total = summary.totalRecords

  return {
    withinPercent: (summary.withinStandardCount / total) * 100,
    attentionPercent: (summary.requiresAttentionCount / total) * 100,
    outPercent: (summary.outOfStandardCount / total) * 100,
  }
}

export function formatCompliancePercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value)
}
