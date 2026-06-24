import {
  COMPLIANCE_STATUS_LABELS,
  FermentationComplianceStatus,
  type FermentationComplianceStatus as ComplianceStatus,
} from '../types'

interface ComplianceBadgeProps {
  status: ComplianceStatus
}

const badgeClass: Record<ComplianceStatus, string> = {
  [FermentationComplianceStatus.WithinStandard]: 'badge--success',
  [FermentationComplianceStatus.RequiresAttention]: 'badge--warning',
  [FermentationComplianceStatus.OutOfStandard]: 'badge--danger',
}

const badgeDot: Record<ComplianceStatus, string> = {
  [FermentationComplianceStatus.WithinStandard]: 'compliance-dot--success',
  [FermentationComplianceStatus.RequiresAttention]: 'compliance-dot--warning',
  [FermentationComplianceStatus.OutOfStandard]: 'compliance-dot--danger',
}

export default function ComplianceBadge({ status }: ComplianceBadgeProps) {
  return (
    <span className={`badge ${badgeClass[status]}`}>
      <span className={`compliance-dot ${badgeDot[status]}`} aria-hidden="true" />
      {COMPLIANCE_STATUS_LABELS[status]}
    </span>
  )
}
