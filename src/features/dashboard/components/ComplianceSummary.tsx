import type { DashboardSummaryDto } from '../../../shared/types'
import {
  buildComplianceRates,
  formatCompliancePercent,
  type ComplianceRates,
} from '../utils/complianceRates'

interface ComplianceSummaryProps {
  summary: DashboardSummaryDto
  rates: ComplianceRates
}

export default function ComplianceSummary({ summary, rates }: ComplianceSummaryProps) {
  const needsFollowUp = summary.outOfStandardCount + summary.requiresAttentionCount
  const allWithinStandard = needsFollowUp === 0

  const barLabel = [
    `${formatCompliancePercent(rates.withinPercent)}% dentro do padrão`,
    `${formatCompliancePercent(rates.attentionPercent)}% requer atenção`,
    `${formatCompliancePercent(rates.outPercent)}% fora do padrão`,
  ].join(', ')

  return (
    <section className="compliance-summary" aria-label="Taxa de conformidade">
      <div className="compliance-summary__header">
        <div className="compliance-summary__intro">
          <h2 className="compliance-summary__title">Taxa de conformidade</h2>
          <p className="compliance-summary__subtitle">
            {allWithinStandard
              ? 'Todos os apontamentos estão dentro do padrão.'
              : `${needsFollowUp} apontamento(s) precisam de acompanhamento.`}
          </p>
        </div>
        <div
          className="compliance-summary__rate"
          aria-label={`${formatCompliancePercent(rates.withinPercent)} por cento dentro do padrão`}
        >
          <span className="compliance-summary__rate-value">
            {formatCompliancePercent(rates.withinPercent)}%
          </span>
          <span className="compliance-summary__rate-label">dentro do padrão</span>
        </div>
      </div>

      <div
        className="compliance-summary__bar"
        role="img"
        aria-label={`Distribuição de conformidade: ${barLabel}`}
      >
        <span
          className="compliance-summary__segment compliance-summary__segment--success"
          style={{ width: `${rates.withinPercent}%` }}
        />
        <span
          className="compliance-summary__segment compliance-summary__segment--accent"
          style={{ width: `${rates.attentionPercent}%` }}
        />
        <span
          className="compliance-summary__segment compliance-summary__segment--danger"
          style={{ width: `${rates.outPercent}%` }}
        />
      </div>

      <ul className="compliance-summary__legend">
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--success" />
          Dentro do padrão ({summary.withinStandardCount})
        </li>
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--accent" />
          Requer atenção ({summary.requiresAttentionCount})
        </li>
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--danger" />
          Fora do padrão ({summary.outOfStandardCount})
        </li>
      </ul>
    </section>
  )
}

export function buildComplianceSummaryProps(summary: DashboardSummaryDto) {
  const rates = buildComplianceRates(summary)
  if (!rates) {
    return null
  }

  return { summary, rates }
}
