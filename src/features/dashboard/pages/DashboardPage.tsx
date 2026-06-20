import { getApiErrorMessage } from '../../../shared/api/apiClient'
import ErrorState from '../../../shared/components/ErrorState'
import LoadingState from '../../../shared/components/LoadingState'
import { useDashboardSummary } from '../hooks/useDashboard'

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboardSummary()

  if (isLoading) {
    return <LoadingState message="Carregando dashboard..." />
  }

  if (isError || !data) {
    return (
      <ErrorState
        message={getApiErrorMessage(error, 'Não foi possível carregar o dashboard.')}
      />
    )
  }

  return (
    <>
      <div className="page-heading">
        <h1>Dashboard fermentativo</h1>
        <p>Indicadores de conformidade dos apontamentos registrados.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__label">Total de apontamentos</div>
          <div className="stat-card__value">{data.totalRecords}</div>
        </div>
        <div className="stat-card stat-card--success">
          <div className="stat-card__label">Dentro do padrão</div>
          <div className="stat-card__value">{data.withinStandardCount}</div>
        </div>
        <div className="stat-card stat-card--accent">
          <div className="stat-card__label">Requer atenção</div>
          <div className="stat-card__value">{data.requiresAttentionCount}</div>
        </div>
        <div className="stat-card stat-card--danger">
          <div className="stat-card__label">Fora do padrão</div>
          <div className="stat-card__value">{data.outOfStandardCount}</div>
        </div>
      </div>
    </>
  )
}
