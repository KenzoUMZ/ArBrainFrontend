import { Link } from 'react-router-dom'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import ErrorState from '../../../shared/components/ErrorState'
import LoadingGate from '../../../shared/components/LoadingGate'
import { StatGridSkeleton } from '../../../shared/components/shimmer'
import { Icon } from '../../../shared/icons/Icon'
import ComplianceSummary, {
  buildComplianceSummaryProps,
} from '../components/ComplianceSummary'
import ComplianceSummarySkeleton from '../components/ComplianceSummarySkeleton'
import { useDashboardSummary } from '../hooks/useDashboard'
import { buildComplianceRates, formatCompliancePercent } from '../utils/complianceRates'
import './DashboardPage.css'

const stats = [
  {
    key: 'totalRecords' as const,
    label: 'Total de apontamentos',
    icon: 'monitor-dashboard',
    className: '',
    to: '/fermentacao',
    rateKey: null,
  },
  {
    key: 'withinStandardCount' as const,
    label: 'Dentro do padrão',
    icon: 'check',
    className: 'stat-card--success',
    to: '/fermentacao?compliance=WithinStandard',
    rateKey: 'withinPercent' as const,
  },
  {
    key: 'requiresAttentionCount' as const,
    label: 'Requer atenção',
    icon: 'attention',
    className: 'stat-card--accent',
    to: '/fermentacao?compliance=RequiresAttention',
    rateKey: 'attentionPercent' as const,
  },
  {
    key: 'outOfStandardCount' as const,
    label: 'Fora do padrão',
    icon: 'manutencao',
    className: 'stat-card--danger',
    to: '/fermentacao?compliance=OutOfStandard',
    rateKey: 'outPercent' as const,
  },
]

export default function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useDashboardSummary()

  if (isError || (!isLoading && !data)) {
    return (
      <ErrorState
        message={getApiErrorMessage(error, 'Não foi possível carregar o dashboard.')}
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <LoadingGate
      isLoading={isLoading || !data}
      skeleton={
        <>
          <ComplianceSummarySkeleton />
          <StatGridSkeleton />
        </>
      }
    >
      {() => {
        const summary = data!
        const rates = buildComplianceRates(summary)
        const complianceSummary = buildComplianceSummaryProps(summary)

        return (
          <>
            {complianceSummary ? (
              <ComplianceSummary
                summary={complianceSummary.summary}
                rates={complianceSummary.rates}
              />
            ) : null}

            <div className="stat-grid">
              {stats.map((stat) => (
                <Link
                  key={stat.key}
                  to={stat.to}
                  className={`stat-card stat-card--link ${stat.className}`.trim()}
                >
                  <span className="stat-card__icon">
                    <Icon name={stat.icon} size={22} />
                  </span>
                  <div className="stat-card__body">
                    <div className="stat-card__label">{stat.label}</div>
                    <div className="stat-card__value">{summary[stat.key]}</div>
                    {rates && stat.rateKey ? (
                      <div className="stat-card__meta">
                        {formatCompliancePercent(rates[stat.rateKey])}% do total
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>

            {summary.totalRecords === 0 && (
              <div className="card empty-state">
                <div className="empty-state__icon">
                  <Icon name="envase" size={40} />
                </div>
                <p>
                  Nenhum apontamento registrado. Acesse <strong>Fermentação</strong> para registrar o
                  primeiro.
                </p>
                <div className="empty-state__action">
                  <Link to="/fermentacao" className="btn btn--primary">
                    <Icon name="add" size={16} />
                    Ir para fermentação
                  </Link>
                </div>
              </div>
            )}
          </>
        )
      }}
    </LoadingGate>
  )
}
