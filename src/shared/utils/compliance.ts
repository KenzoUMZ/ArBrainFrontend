import {
  COMPLIANCE_STATUS_LABELS,
  FermentationComplianceStatus,
  type BeerFermentationParametersDto,
} from '../types'

export type ComplianceParamKey = keyof typeof FermentationComplianceStatus

const ATTENTION_MARGIN_RATIO = 0.1

type MetricStatus = 'within' | 'near' | 'out'

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

export function complianceFilterChipClass(status: FermentationComplianceStatus): string {
  const map: Record<FermentationComplianceStatus, string> = {
    [FermentationComplianceStatus.WithinStandard]: 'filter-chip--success',
    [FermentationComplianceStatus.RequiresAttention]: 'filter-chip--warning',
    [FermentationComplianceStatus.OutOfStandard]: 'filter-chip--danger',
  }

  return map[status]
}

function evaluateMetric(value: number, min: number, max: number): MetricStatus {
  if (value < min || value > max) {
    return 'out'
  }

  const range = max - min
  if (range <= 0) {
    return value === min ? 'within' : 'out'
  }

  const margin = range * ATTENTION_MARGIN_RATIO
  const nearMin = value <= min + margin
  const nearMax = value >= max - margin

  return nearMin || nearMax ? 'near' : 'within'
}

/** Espelha a lógica do backend para prévia em tempo real no formulário. */
export function evaluateCompliance(
  temperature: number,
  ph: number,
  extract: number,
  parameters: BeerFermentationParametersDto,
): FermentationComplianceStatus {
  const temperatureStatus = evaluateMetric(
    temperature,
    parameters.minTemperature,
    parameters.maxTemperature,
  )
  const phStatus = evaluateMetric(ph, parameters.minPh, parameters.maxPh)
  const extractStatus = evaluateMetric(extract, parameters.minExtract, parameters.maxExtract)

  if (temperatureStatus === 'out' || phStatus === 'out' || extractStatus === 'out') {
    return FermentationComplianceStatus.OutOfStandard
  }

  if (temperatureStatus === 'near' || phStatus === 'near' || extractStatus === 'near') {
    return FermentationComplianceStatus.RequiresAttention
  }

  return FermentationComplianceStatus.WithinStandard
}
