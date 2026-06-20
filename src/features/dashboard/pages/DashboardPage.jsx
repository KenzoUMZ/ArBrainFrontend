import ErrorState from '../../../shared/components/ErrorState'
import LoadingState from '../../../shared/components/LoadingState'
import { useBeers } from '../../beers/hooks/useBeers'

export default function DashboardPage() {
  const { data, isLoading, isError } = useBeers()

  if (isLoading) {
    return <LoadingState message="Carregando dashboard..." />
  }

  if (isError) {
    return <ErrorState message="Não foi possível carregar o dashboard." />
  }

  const totalBeers = data.length
  const lowStock = data.filter((beer) => beer.isLowStock).length
  const totalStock = data.reduce((sum, beer) => sum + beer.stockQuantity, 0)
  const avgPrice =
    totalBeers === 0
      ? 0
      : data.reduce((sum, beer) => sum + beer.price, 0) / totalBeers

  return (
    <>
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Visão geral do estoque de cervejas.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__label">Total de cervejas</div>
          <div className="stat-card__value">{totalBeers}</div>
        </div>
        <div className="stat-card stat-card--accent">
          <div className="stat-card__label">Unidades em estoque</div>
          <div className="stat-card__value">{totalStock}</div>
        </div>
        <div className="stat-card stat-card--danger">
          <div className="stat-card__label">Estoque baixo</div>
          <div className="stat-card__value">{lowStock}</div>
        </div>
        <div className="stat-card stat-card--success">
          <div className="stat-card__label">Preço médio</div>
          <div className="stat-card__value">
            {avgPrice.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
          Alertas de estoque
        </h3>
        {lowStock === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>
            Nenhuma cerveja com estoque abaixo do mínimo.
          </p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
            {data
              .filter((beer) => beer.isLowStock)
              .map((beer) => (
                <li key={beer.id}>
                  {beer.name}: {beer.stockQuantity} un. (mín. {beer.minimumStock})
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  )
}
