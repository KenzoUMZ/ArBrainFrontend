import ComplianceBadge from '../../../shared/components/ComplianceBadge'
import SortableHeader from '../../../shared/components/SortableHeader'
import { BatchListBodySkeleton } from '../../../shared/components/shimmer'
import { Icon } from '../../../shared/icons/Icon'
import type { SortDirection } from '../../../shared/sort'
import type { BatchSummaryDto } from '../../../shared/types'
import {
  batchListItemClass,
  complianceDotClass,
  complianceLabel,
} from '../../../shared/utils/compliance'

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
  isRefreshing?: boolean
}

export default function BatchSelector({
  batches,
  selectedBatch,
  sortField,
  sortDir,
  onSort,
  onSelect,
  isRefreshing = false,
}: BatchSelectorProps) {
  if (!isRefreshing && batches.length === 0) {
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
    <div
      className="batch-list"
      aria-busy={isRefreshing}
      aria-live={isRefreshing ? 'polite' : undefined}
    >
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
          label="Status"
          field="complianceStatus"
          sortField={sortField}
          sortDir={sortDir}
          onSort={onSort}
          className="batch-list__header-cell batch-list__header-cell--status"
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
      <div
        className={
          isRefreshing && batches.length > 0 ? 'batch-list__items batch-list__items--refreshing' : 'batch-list__items'
        }
      >
        {isRefreshing && batches.length === 0 ? (
          <BatchListBodySkeleton items={8} />
        ) : (
          batches.map((batch) => (
            <button
              key={batch.batchNumber}
              type="button"
              className={[
                'batch-list__item',
                batchListItemClass(batch.complianceStatus),
                selectedBatch === batch.batchNumber && 'batch-list__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(batch.batchNumber)}
              aria-label={`Lote ${batch.batchNumber}, ${batch.beerName}, ${complianceLabel(batch.complianceStatus)}, ${batch.recordCount} apontamentos`}
            >
              <div className="batch-list__item-batch">
                <span
                  className={`compliance-dot batch-list__item-status-dot ${complianceDotClass(batch.complianceStatus)}`}
                  aria-hidden="true"
                />
                {batch.batchNumber}
              </div>
              <div className="batch-list__item-beer">{batch.beerName}</div>
              <div className="batch-list__item-status">
                <ComplianceBadge status={batch.complianceStatus} />
              </div>
              <span className="badge badge--neutral batch-list__item-count">
                {batch.recordCount} apont.
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
