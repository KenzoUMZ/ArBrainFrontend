import { BEER_STYLE_LABELS, type BeerDto, type BeerStyle } from '../../../shared/types'
import Button from '../../../shared/components/Button'
import SortableHeader from '../../../shared/components/SortableHeader'
import { TableBodySkeleton } from '../../../shared/components/shimmer'
import type { SortDirection } from '../../../shared/sort'
import { Icon } from '../../../shared/icons/Icon'
import { formatDateTime } from '../../../shared/utils/format'

/** Ordenação padrão — mais recentes primeiro. */
export const BEER_TABLE_DEFAULT_SORT = {
  field: 'updatedAt',
  direction: 'desc' as SortDirection,
}

/** Ordenação padrão na lixeira — excluídos mais recentes primeiro. */
export const BEER_TRASH_TABLE_DEFAULT_SORT = {
  field: 'deletedAt',
  direction: 'desc' as SortDirection,
}

interface BeerTableProps {
  beers: BeerDto[]
  sortField: string
  sortDir: SortDirection
  onSort: (field: string) => void
  isRefreshing?: boolean
  hasActiveFilters?: boolean
  isTrashView?: boolean
  onCreate?: () => void
  onEdit?: (beer: BeerDto) => void
  onParameters?: (beer: BeerDto) => void
  onDelete?: (beer: BeerDto) => void
  onRestore?: (beer: BeerDto) => void
  deletingId?: string
  restoringId?: string
}

export default function BeerTable({
  beers,
  sortField,
  sortDir,
  onSort,
  isRefreshing = false,
  hasActiveFilters = false,
  isTrashView = false,
  onCreate,
  onEdit,
  onParameters,
  onDelete,
  onRestore,
  deletingId,
  restoringId,
}: BeerTableProps) {
  if (!isRefreshing && beers.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state__icon">
          <Icon name={isTrashView ? 'trash' : 'barril-vazio'} size={40} />
        </div>
        <p>
          {hasActiveFilters
            ? 'Nenhuma cerveja encontrada para os filtros atuais.'
            : isTrashView
              ? 'A lixeira está vazia.'
              : 'Nenhuma cerveja cadastrada ainda.'}
        </p>
        {onCreate && !hasActiveFilters && !isTrashView ? (
          <div className="empty-state__action">
            <Button onClick={onCreate}>
              <Icon name="add" size={16} />
              Nova cerveja
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
              label="Estilo"
              field="style"
              sortField={sortField}
              sortDir={sortDir}
              onSort={onSort}
            />
            <SortableHeader
              label="Parâmetros"
              field="parameters"
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
            isRefreshing && beers.length > 0 ? 'data-table__body--refreshing' : undefined
          }
        >
          {isRefreshing && beers.length === 0 ? (
            <TableBodySkeleton
              columns={isTrashView ? 7 : 6}
              actionColumns={isTrashView ? 1 : 3}
              rows={5}
            />
          ) : (
            beers.map((beer) => (
            <tr key={beer.id}>
              <td>
                <div className="cell-anchor">
                  <strong className="cell-anchor__title">{beer.name}</strong>
                  <span className="cell-anchor__subtitle">{BEER_STYLE_LABELS[beer.style as BeerStyle]}</span>
                </div>
              </td>
              <td>{BEER_STYLE_LABELS[beer.style as BeerStyle]}</td>
              <td>
                {beer.parameters ? (
                  <span className="badge badge--success">Configurados</span>
                ) : (
                  <span className="badge badge--neutral">Pendente</span>
                )}
              </td>
              <td>{formatDateTime(beer.createdAt)}</td>
              <td>{formatDateTime(beer.updatedAt)}</td>
              {isTrashView ? (
                <td>{beer.deletedAt ? formatDateTime(beer.deletedAt) : '—'}</td>
              ) : null}
              <td className="data-table__actions-col">
                <div className="row-actions">
                  {isTrashView ? (
                    <Button
                      variant="icon"
                      iconTone="restore"
                      title="Restaurar"
                      aria-label="Restaurar"
                      disabled={restoringId === beer.id}
                      onClick={() => onRestore?.(beer)}
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
                        onClick={() => onEdit?.(beer)}
                      >
                        <Icon name="pencil" size={18} />
                      </Button>
                      <Button
                        variant="icon"
                        iconTone="config"
                        title="Parâmetros fermentativos"
                        aria-label="Parâmetros fermentativos"
                        onClick={() => onParameters?.(beer)}
                      >
                        <Icon name="settings" size={18} />
                      </Button>
                      <Button
                        variant="icon"
                        iconTone="delete"
                        title="Excluir"
                        aria-label="Excluir"
                        disabled={deletingId === beer.id}
                        onClick={() => onDelete?.(beer)}
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
