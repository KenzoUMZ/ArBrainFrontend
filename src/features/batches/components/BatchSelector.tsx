import type { BatchSummaryDto } from '../../../shared/types'
import SortableHeader from '../../../shared/components/SortableHeader'
import type { SortDirection } from '../../../shared/sort'
import { Icon } from '../../../shared/icons/Icon'

/** Ordenação padrão da lista de lotes — mais recentes primeiro. */
export const BATCH_LIST_DEFAULT_SORT = {
  field: 'batchNumber',
  direction: 'desc' as SortDirection,
}

interface BatchSelectorProps {
  batches: BatchSummaryDto[]
  selectedBatch: string | null
  sortField: string
  sortDir: SortDirection
  onSort: (field: string) => void
  onSelect: (batchNumber: string) => void
}

export default function BatchSelector({
  batches,
  selectedBatch,
  sortField,
  sortDir,
  onSort,
  onSelect,
}: BatchSelectorProps) {
  if (batches.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state__icon">
          <Icon name="ticket-confirmation" size={36} />
        </div>
        <p>Nenhum lote com apontamentos registrados.</p>
      </div>
    )
  }

  return (
    <div className="batch-list">
      <div className="batch-list__header" role="row">
        <SortableHeader
          as="div"
          label="Lote"
          field="batchNumber"
          sortField={sortField}
          sortDir={sortDir}
          onSort={onSort}
          className="batch-list__header-cell batch-list__header-cell--batch"
        />
        <SortableHeader
          as="div"
          label="Cerveja"
          field="beerName"
          sortField={sortField}
          sortDir={sortDir}
          onSort={onSort}
          className="batch-list__header-cell batch-list__header-cell--beer"
        />
        <SortableHeader
          as="div"
          label="Apont."
          field="recordCount"
          sortField={sortField}
          sortDir={sortDir}
          onSort={onSort}
          className="batch-list__header-cell batch-list__header-cell--count"
        />
      </div>
      {batches.map((batch) => (
        <button
          key={batch.batchNumber}
          type="button"
          className={`batch-list__item${selectedBatch === batch.batchNumber ? ' batch-list__item--active' : ''}`}
          onClick={() => onSelect(batch.batchNumber)}
        >
          <div className="batch-list__item-batch">{batch.batchNumber}</div>
          <div className="batch-list__item-beer">{batch.beerName}</div>
          <span className="badge badge--neutral batch-list__item-count">
            {batch.recordCount} apont.
          </span>
        </button>
      ))}
    </div>
  )
}
