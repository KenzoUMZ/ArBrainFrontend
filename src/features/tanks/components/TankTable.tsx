import type { TankDto } from '../../../shared/types'
import Button from '../../../shared/components/Button'
import SortableHeader from '../../../shared/components/SortableHeader'
import { TableBodySkeleton } from '../../../shared/components/shimmer'
import type { SortDirection } from '../../../shared/sort'
import { Icon } from '../../../shared/icons/Icon'
import { formatDateTime, formatNumber } from '../../../shared/utils/format'

/** Ordenação padrão — mais recentes primeiro. */
export const TANK_TABLE_DEFAULT_SORT = {
  field: 'updatedAt',
  direction: 'desc' as SortDirection,
}

/** Ordenação padrão na lixeira — excluídos mais recentes primeiro. */
export const TANK_TRASH_TABLE_DEFAULT_SORT = {
  field: 'deletedAt',
  direction: 'desc' as SortDirection,
}

interface TankTableProps {
  tanks: TankDto[]
  sortField: string
  sortDir: SortDirection
  onSort: (field: string) => void
  isRefreshing?: boolean
  hasActiveFilters?: boolean
  isTrashView?: boolean
  onCreate?: () => void
  onEdit?: (tank: TankDto) => void
  onDelete?: (tank: TankDto) => void
  onRestore?: (tank: TankDto) => void
  deletingId?: string
  restoringId?: string
}

export default function TankTable({
  tanks,
  sortField,
  sortDir,
  onSort,
  isRefreshing = false,
  hasActiveFilters = false,
  isTrashView = false,
  onCreate,
  onEdit,
  onDelete,
  onRestore,
  deletingId,
  restoringId,
}: TankTableProps) {
  if (!isRefreshing && tanks.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state__icon">
          <Icon name={isTrashView ? 'trash' : 'tanque-vazio'} size={40} />
        </div>
        <p>
          {hasActiveFilters
            ? 'Nenhum tanque encontrado para os filtros atuais.'
            : isTrashView
              ? 'A lixeira está vazia.'
              : 'Nenhum tanque cadastrado ainda.'}
        </p>
        {onCreate && !hasActiveFilters && !isTrashView ? (
          <div className="empty-state__action">
            <Button onClick={onCreate}>
              <Icon name="add" size={16} />
              Novo tanque
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
              label="Nome"
              field="name"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Capacidade"
              field="capacity"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Data de criação"
              field="createdAt"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Última atualização"
              field="updatedAt"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            {isTrashView ? (
              <SortableHeader
                label="Excluído em"
                field="deletedAt"
                sortField={sortField}
                sortDir={sortDir}
                onSort={onSort}
              />
            ) : null}
            <th className="data-table__actions-col">Ações</th>
          </tr>
        </thead>
        <tbody
          className={
            isRefreshing && tanks.length > 0 ? 'data-table__body--refreshing' : undefined
          }
        >
          {isRefreshing && tanks.length === 0 ? (
            <TableBodySkeleton
              columns={isTrashView ? 6 : 5}
              actionColumns={isTrashView ? 1 : 2}
              rows={5}
            />
          ) : (
            tanks.map((tank) => (
            <tr key={tank.id}>
              <td>
                <div className="cell-anchor">
                  <strong className="cell-anchor__title">{tank.name}</strong>
                  <span className="cell-anchor__subtitle">{formatNumber(tank.capacityLiters, 0)} L</span>
                </div>
              </td>
              <td>{formatNumber(tank.capacityLiters, 0)} L</td>
              <td>{formatDateTime(tank.createdAt)}</td>
              <td>{formatDateTime(tank.updatedAt)}</td>
              {isTrashView ? (
                <td>{tank.deletedAt ? formatDateTime(tank.deletedAt) : '—'}</td>
              ) : null}
              <td className="data-table__actions-col">
                <div className="row-actions">
                  {isTrashView ? (
                    <Button
                      variant="icon"
                      iconTone="restore"
                      title="Restaurar"
                      aria-label="Restaurar"
                      disabled={restoringId === tank.id}
                      onClick={() => onRestore?.(tank)}
                    >
                      <Icon name="entrada-estoque" size={18} />
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="icon"
                        iconTone="edit"
                        title="Editar"
                        aria-label="Editar"
                        onClick={() => onEdit?.(tank)}
                      >
                        <Icon name="pencil" size={18} />
                      </Button>
                      <Button
                        variant="icon"
                        iconTone="delete"
                        title="Excluir"
                        aria-label="Excluir"
                        disabled={deletingId === tank.id}
                        onClick={() => onDelete?.(tank)}
                      >
                        <Icon name="trash" size={18} />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
