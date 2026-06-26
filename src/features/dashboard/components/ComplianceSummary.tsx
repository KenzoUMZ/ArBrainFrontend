import { useEffect, useState } from 'react'
import { useAnimatedNumber } from '../../../shared/hooks/useAnimatedNumber'
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

const BAR_REVEAL_MS = 1100

export default function ComplianceSummary({ summary, rates }: ComplianceSummaryProps) {
  const [isRevealing, setIsRevealing] = useState(true)
  const needsFollowUp = summary.outOfStandardCount + summary.requiresAttentionCount
  const allWithinStandard = needsFollowUp === 0

  const animatedWithinPercent = useAnimatedNumber(rates.withinPercent, {
    duration: 1000,
    decimals: 1,
  })
  const animatedAttentionPercent = useAnimatedNumber(rates.attentionPercent, {
    duration: 1000,
    delay: 120,
    decimals: 1,
  })
  const animatedOutPercent = useAnimatedNumber(rates.outPercent, {
    duration: 1000,
    delay: 240,
    decimals: 1,
  })

  const animatedWithinCount = useAnimatedNumber(summary.withinStandardCount, { duration: 850 })
  const animatedAttentionCount = useAnimatedNumber(summary.requiresAttentionCount, {
    duration: 850,
    delay: 100,
  })
  const animatedOutCount = useAnimatedNumber(summary.outOfStandardCount, {
    duration: 850,
    delay: 200,
  })

  useEffect(() => {
    setIsRevealing(true)
    const timer = window.setTimeout(() => setIsRevealing(false), BAR_REVEAL_MS)
    return () => window.clearTimeout(timer)
  }, [summary, rates])

  const barLabel = [
    `${formatCompliancePercent(animatedWithinPercent)}% dentro do padrão`,
    `${formatCompliancePercent(animatedAttentionPercent)}% requer atenção`,
    `${formatCompliancePercent(animatedOutPercent)}% fora do padrão`,
  ].join(', ')

  return (
    <section
      className={`compliance-summary${isRevealing ? ' compliance-summary--revealing' : ''}`}
      aria-label="Taxa de conformidade"
    >
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
          aria-label={`${formatCompliancePercent(animatedWithinPercent)} por cento dentro do padrão`}
        >
          <span className="compliance-summary__rate-value">
            {formatCompliancePercent(animatedWithinPercent)}%
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
          style={{ width: `${animatedWithinPercent}%` }}
        />
        <span
          className="compliance-summary__segment compliance-summary__segment--accent"
          style={{ width: `${animatedAttentionPercent}%` }}
        />
        <span
          className="compliance-summary__segment compliance-summary__segment--danger"
          style={{ width: `${animatedOutPercent}%` }}
        />
      </div>

      <ul className="compliance-summary__legend">
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--success" />
          Dentro do padrão ({animatedWithinCount})
        </li>
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--accent" />
          Requer atenção ({animatedAttentionCount})
        </li>
        <li>
          <span className="compliance-summary__dot compliance-summary__dot--danger" />
          Fora do padrão ({animatedOutCount})
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
