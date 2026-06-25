import Button from '../../../shared/components/Button'
import ComplianceBadge from '../../../shared/components/ComplianceBadge'
import SortableHeader from '../../../shared/components/SortableHeader'
import { TableBodySkeleton } from '../../../shared/components/shimmer'
import { Icon } from '../../../shared/icons/Icon'
import type { SortDirection } from '../../../shared/sort'
import type { FermentationRecordDto } from '../../../shared/types'
import { formatDateTime, formatNumber } from '../../../shared/utils/format'

/** Primeira coluna da tabela — ordenação padrão da listagem. */
export const FERMENTATION_RECORD_TABLE_DEFAULT_SORT = {
  field: 'registeredAt',
  direction: 'desc' as SortDirection,
}

interface FermentationRecordTableProps {
  records: FermentationRecordDto[]
  sortField: string
  sortDir: SortDirection
  onSort: (field: string) => void
  isRefreshing?: boolean
  hasActiveFilters?: boolean
  onCreate?: () => void
}

export default function FermentationRecordTable({
  records,
  sortField,
  sortDir,
  onSort,
  isRefreshing = false,
  hasActiveFilters = false,
  onCreate,
}: FermentationRecordTableProps) {
  if (!isRefreshing && records.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state__icon">
          <Icon name="envase" size={40} />
        </div>
        <p>
          {hasActiveFilters
            ? 'Nenhum apontamento encontrado para os filtros atuais.'
            : 'Nenhum apontamento registrado ainda.'}
        </p>
        {onCreate && !hasActiveFilters ? (
          <div className="empty-state__action">
            <Button onClick={onCreate}>
              <Icon name="add" size={16} />
              Novo apontamento
            </Button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className="data-table card"
      aria-busy={isRefreshing}
      aria-live={isRefreshing ? 'polite' : undefined}
    >
      <table>
        <thead>
          <tr>
            <SortableHeader
              label="Data"
              field="registeredAt"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Lote"
              field="batchNumber"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Cerveja"
              field="beerName"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Tanque"
              field="tankName"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Temp."
              field="temperature"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="pH"
              field="ph"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Extrato"
              field="extract"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Status"
              field="complianceStatus"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
          </tr>
        </thead>
        <tbody
          className={
            isRefreshing && records.length > 0 ? 'data-table__body--refreshing' : undefined
          }
        >
          {isRefreshing && records.length === 0 ? (
            <TableBodySkeleton columns={8} rows={5} />
          ) : (
            records.map((record) => (
            <tr key={record.id}>
              <td>
                <div className="cell-anchor">
                  <strong className="cell-anchor__title">{formatDateTime(record.registeredAt)}</strong>
                  <span className="cell-anchor__subtitle">{record.batchNumber}</span>
                </div>
              </td>
              <td>
                <div className="cell-anchor">
                  <strong className="cell-anchor__title">{record.batchNumber}</strong>
                  <span className="cell-anchor__subtitle">{record.beerName}</span>
                </div>
              </td>
              <td>{record.beerName}</td>
              <td>{record.tankName}</td>
              <td>{formatNumber(record.temperature, 1)} °C</td>
              <td>{formatNumber(record.ph, 2)}</td>
              <td>{formatNumber(record.extract, 1)} °P</td>
              <td>
                <ComplianceBadge status={record.complianceStatus} />
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
