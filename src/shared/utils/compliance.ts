import { COMPLIANCE_STATUS_LABELS, FermentationComplianceStatus } from '../types'

export type ComplianceParamKey = keyof typeof FermentationComplianceStatus

export function parseComplianceParam(
  value: string | null,
): FermentationComplianceStatus | undefined {
  if (!value) return undefined

  const entry = Object.entries(FermentationComplianceStatus).find(([name]) => name === value)
  return entry ? (entry[1] as FermentationComplianceStatus) : undefined
}

export function complianceLabel(status: FermentationComplianceStatus): string {
  return COMPLIANCE_STATUS_LABELS[status]
}
