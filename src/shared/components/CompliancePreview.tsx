import ComplianceBadge from './ComplianceBadge'
import type { FermentationComplianceStatus } from '../types'
import { evaluateCompliance } from '../utils/compliance'
import type { BeerFermentationParametersDto } from '../types'

interface CompliancePreviewProps {
  temperature: number
  ph: number
  extract: number
  parameters: BeerFermentationParametersDto | null | undefined
}

export default function CompliancePreview({
  temperature,
  ph,
  extract,
  parameters,
}: CompliancePreviewProps) {
  if (!parameters) {
    return (
      <div className="compliance-preview compliance-preview--empty" role="status">
        <p className="text-sm text-muted">Selecione uma cerveja com parâmetros para ver a conformidade.</p>
      </div>
    )
  }

  const status: FermentationComplianceStatus = evaluateCompliance(
    temperature,
    ph,
    extract,
    parameters,
  )

  return (
    <div className="compliance-preview" role="status" aria-live="polite">
      <span className="compliance-preview__label text-caps">Prévia de conformidade</span>
      <ComplianceBadge status={status} />
    </div>
  )
}
