import { getApiErrorMessage } from '../../../shared/api/apiClient'
import ErrorState from '../../../shared/components/ErrorState'
import ScrollFade from '../../../shared/components/ScrollFade'
import TableToolbar from '../../../shared/components/TableToolbar'
import { TimelineSkeleton } from '../../../shared/components/shimmer'
import { useMinimumVisible } from '../../../shared/hooks/useMinimumVisible'
import { usePageSearchTerm } from '../../../shared/search'
import { useSort } from '../../../shared/sort'
import BatchSelector, { BATCH_LIST_DEFAULT_SORT } from '../components/BatchSelector'
import BatchTimeline from '../components/BatchTimeline'
import { useBatchHistory, useBatches, useSelectedBatch } from '../hooks/useBatches'
import './BatchHistoryPage.css'

export default function BatchHistoryPage() {
  const search = usePageSearchTerm()
  const { sortField, sortDir, toggleSort } = useSort(
    BATCH_LIST_DEFAULT_SORT.field,
    BATCH_LIST_DEFAULT_SORT.direction,
  )
  const {
    data: batches = [],
    isLoading: batchesLoading,
    isFetching: batchesFetching,
    isError: batchesError,
    error: batchesErr,
    refetch: refetchBatches,
  } = useBatches({
    search,
    sortBy: sortField,
    sortDir,
  })
  const { selectedBatch, setSelectedBatch } = useSelectedBatch(
    batches,
    !batchesLoading,
  )

  const {
    data: history,
    isLoading: historyLoading,
    isFetching: historyFetching,
    isError: historyError,
    error: historyErr,
    refetch: refetchHistory,
  } = useBatchHistory(selectedBatch ?? undefined)

  const showBatchesSkeleton = useMinimumVisible(batchesLoading || batchesFetching)
  // Mantém o shimmer da timeline durante o carregamento dos lotes (evita coluna vazia
  // antes de um lote ser selecionado) e durante o carregamento do histórico em si.
  const historyBusy =
    batchesLoading ||
    (Boolean(selectedBatch) && (historyLoading || historyFetching))
  const showHistorySkeleton = useMinimumVisible(historyBusy)

  if (batchesError) {
    return (
      <ErrorState
        message={getApiErrorMessage(batchesErr, 'Não foi possível carregar os lotes.')}
        onRetry={() => void refetchBatches()}
      />
    )
  }

  const showHistoryPlaceholder =
    !showBatchesSkeleton && !showHistorySkeleton && batches.length === 0

  return (
    <div className="batch-history-page">
      <TableToolbar searchPlaceholder="Buscar lote ou cerveja..." />
      <div className="page-layout-split">
        <section className="page-layout-split__column page-layout-split__column--list">
          <h3 className="page-layout-split__title">Lotes</h3>
          <ScrollFade
            className="page-layout-split__scroll"
            aria-label="Lista de lotes"
          >
            <BatchSelector
              batches={batches}
              selectedBatch={selectedBatch}
              sortField={sortField}
              sortDir={sortDir}
              onSort={toggleSort}
              onSelect={setSelectedBatch}
              isRefreshing={showBatchesSkeleton}
            />
          </ScrollFade>
        </section>

        <section className="page-layout-split__column">
          <h3 className="page-layout-split__title">Histórico</h3>

          {showHistorySkeleton && <TimelineSkeleton />}

          {showHistoryPlaceholder && (
            <div className="empty-state card">
              <p>Nenhum lote disponível.</p>
            </div>
          )}

          {selectedBatch && historyError && !showHistorySkeleton && (
            <ErrorState
              message={getApiErrorMessage(historyErr, 'Não foi possível carregar o histórico.')}
              onRetry={() => void refetchHistory()}
            />
          )}

          {selectedBatch && !historyError && !showHistorySkeleton && history && (
            <BatchTimeline
              batchNumber={history.batchNumber}
              beerName={history.beerName}
              records={history.records}
            />
          )}
        </section>
      </div>
    </div>
  )
}
