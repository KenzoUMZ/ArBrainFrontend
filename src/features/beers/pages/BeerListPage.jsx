import ErrorState from '../../../shared/components/ErrorState'
import LoadingState from '../../../shared/components/LoadingState'
import BeerTable from '../components/BeerTable'
import { useBeers } from '../hooks/useBeers'

export default function BeerListPage() {
  const { data, isLoading, isError, error } = useBeers()

  return (
    <>
      <div className="page-heading">
        <h1>Cervejas</h1>
        <p>Catálogo de produtos e níveis de estoque.</p>
      </div>

      {isLoading && <LoadingState message="Carregando cervejas..." />}
      {isError && (
        <ErrorState
          message={error?.message ?? 'Não foi possível carregar as cervejas.'}
        />
      )}
      {data && <BeerTable beers={data} />}
    </>
  )
}
