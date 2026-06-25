import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import Dialog from '../../../shared/components/Dialog'
import ErrorState from '../../../shared/components/ErrorState'
import TablePagination from '../../../shared/components/TablePagination'
import TableToolbar from '../../../shared/components/TableToolbar'
import { useToast } from '../../../shared/components/toast'
import { DEFAULT_PAGE_SIZE } from '../../../shared/config/pagination'
import { Icon } from '../../../shared/icons/Icon'
import { usePageSearchTerm } from '../../../shared/search'
import { useSort } from '../../../shared/sort'
import { useMinimumVisible } from '../../../shared/hooks/useMinimumVisible'
import type { BeerDto } from '../../../shared/types'
import {
  useBeers,
  useCreateBeer,
  useDeleteBeer,
  useRestoreBeer,
  useUpdateBeer,
  useUpsertBeerParameters,
} from '../hooks/useBeers'
import BeerForm from '../components/BeerForm'
import BeerParametersForm from '../components/BeerParametersForm'
import BeerTable, {
  BEER_TABLE_DEFAULT_SORT,
  BEER_TRASH_TABLE_DEFAULT_SORT,
} from '../components/BeerTable'

type DialogMode = 'create' | 'edit' | 'parameters' | null

export default function BeerListPage() {
  const search = usePageSearchTerm()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const isTrashView = searchParams.get('view') === 'trash'
  const [page, setPage] = useState(1)
  const defaultSort = isTrashView ? BEER_TRASH_TABLE_DEFAULT_SORT : BEER_TABLE_DEFAULT_SORT
  const { sortField, sortDir, toggleSort, resetSort } = useSort(
    defaultSort.field,
    defaultSort.direction,
  )
  const { data, isLoading, isFetching, isError, error, refetch } = useBeers({
    search,
    sortBy: sortField,
    sortDir,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    deletedOnly: isTrashView,
  })
  const beers = data?.items ?? []
  const createBeer = useCreateBeer()
  const updateBeer = useUpdateBeer()
  const deleteBeer = useDeleteBeer()
  const restoreBeer = useRestoreBeer()
  const upsertParameters = useUpsertBeerParameters()

  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [selectedBeer, setSelectedBeer] = useState<BeerDto | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<BeerDto | null>(null)
  const [restoreTarget, setRestoreTarget] = useState<BeerDto | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [deletingId, setDeletingId] = useState<string>()
  const [restoringId, setRestoringId] = useState<string>()

  useEffect(() => {
    resetSort(defaultSort.field, defaultSort.direction)
    setPage(1)
  }, [isTrashView, defaultSort.field, defaultSort.direction, resetSort])

  useEffect(() => {
    setPage(1)
  }, [search, sortField, sortDir])

  function closeDialog() {
    setDialogMode(null)
    setSelectedBeer(null)
  }

  function openCreate() {
    setSelectedBeer(null)
    setDialogMode('create')
  }

  function openEdit(beer: BeerDto) {
    setSelectedBeer(beer)
    setDialogMode('edit')
  }

  function openParameters(beer: BeerDto) {
    setSelectedBeer(beer)
    setDialogMode('parameters')
  }

  async function confirmDelete() {
    if (!deleteTarget) return

    setIsDeleting(true)
    setDeletingId(deleteTarget.id)
    try {
      await deleteBeer.mutateAsync(deleteTarget.id)
      if (selectedBeer?.id === deleteTarget.id) closeDialog()
      setDeleteTarget(null)
      toast.success('Cerveja inativada com sucesso.')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Não foi possível excluir a cerveja.'))
      throw err
    } finally {
      setIsDeleting(false)
      setDeletingId(undefined)
    }
  }

  async function confirmRestore() {
    if (!restoreTarget) return

    setIsRestoring(true)
    setRestoringId(restoreTarget.id)
    try {
      await restoreBeer.mutateAsync(restoreTarget.id)
      setRestoreTarget(null)
      toast.success('Cerveja restaurada com sucesso.')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Não foi possível restaurar a cerveja.'))
      throw err
    } finally {
      setIsRestoring(false)
      setRestoringId(undefined)
    }
  }

  function toggleTrashView() {
    const next = new URLSearchParams(searchParams)
    if (isTrashView) {
      next.delete('view')
    } else {
      next.set('view', 'trash')
    }
    setSearchParams(next, { replace: true })
  }

  const showResultsSkeleton = useMinimumVisible(isLoading || isFetching)

  if (isError) {
    return (
      <ErrorState
        message={getApiErrorMessage(error, 'Não foi possível carregar as cervejas.')}
        onRetry={() => void refetch()}
      />
    )
  }

  const dialogTitle =
    dialogMode === 'create'
      ? 'Nova cerveja'
      : dialogMode === 'edit'
        ? 'Editar cerveja'
        : dialogMode === 'parameters'
          ? 'Parâmetros fermentativos'
          : ''

  const dialogIcon =
    dialogMode === 'create'
      ? 'beer'
      : dialogMode === 'edit'
        ? 'pencil'
        : dialogMode === 'parameters'
          ? 'settings'
          : undefined

  const dialogIconTone =
    dialogMode === 'parameters' ? 'accent' : 'primary'

  return (
    <>
      <Dialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
        title={dialogTitle}
        icon={dialogIcon}
        iconTone={dialogIconTone}
        size={dialogMode === 'parameters' ? 'lg' : 'md'}
        description={
          dialogMode === 'parameters' && selectedBeer
            ? selectedBeer.name
            : undefined
        }
      >
        {dialogMode === 'create' && (
          <BeerForm
            layout="dialog"
            submitLabel="Cadastrar"
            onCancel={closeDialog}
            onSubmit={async (payload) => {
              await createBeer.mutateAsync(payload)
              toast.success('Cerveja cadastrada com sucesso.')
              closeDialog()
            }}
          />
        )}

        {dialogMode === 'edit' && selectedBeer && (
          <BeerForm
            key={selectedBeer.id}
            layout="dialog"
            initialName={selectedBeer.name}
            initialStyle={selectedBeer.style}
            submitLabel="Salvar alterações"
            onCancel={closeDialog}
            onSubmit={async (payload) => {
              await updateBeer.mutateAsync({ id: selectedBeer.id, payload })
              toast.success('Cerveja atualizada com sucesso.')
              closeDialog()
            }}
          />
        )}

        {dialogMode === 'parameters' && selectedBeer && (
          <BeerParametersForm
            key={`${selectedBeer.id}-params`}
            layout="dialog"
            beerName={selectedBeer.name}
            initial={selectedBeer.parameters}
            onCancel={closeDialog}
            onSubmit={async (payload) => {
              await upsertParameters.mutateAsync({ id: selectedBeer.id, payload })
              toast.success('Parâmetros salvos com sucesso.')
              closeDialog()
            }}
          />
        )}
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteTarget(null)
        }}
        title={deleteTarget ? 'Inativar cerveja?' : 'Confirmar exclusão'}
        highlightName={deleteTarget?.name}
        description="A cerveja deixará de aparecer nas listagens ativas."
        confirmLabel="Inativar"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        open={restoreTarget !== null}
        onOpenChange={(open) => {
          if (!open && !isRestoring) setRestoreTarget(null)
        }}
        title={restoreTarget ? 'Restaurar cerveja?' : 'Confirmar restauração'}
        highlightName={restoreTarget?.name}
        description="A cerveja voltará a aparecer nas listagens ativas."
        confirmLabel="Restaurar"
        confirmVariant="primary"
        isLoading={isRestoring}
        onConfirm={confirmRestore}
      />

      <TableToolbar
        title={isTrashView ? 'Lixeira' : undefined}
        searchPlaceholder="Buscar por nome ou estilo..."
      >
        <Button
          variant={isTrashView ? 'secondary' : 'ghost'}
          onClick={toggleTrashView}
          aria-pressed={isTrashView}
        >
          <Icon name="trash" size={16} />
          {isTrashView ? 'Voltar à listagem' : 'Lixeira'}
        </Button>
        {!isTrashView ? (
          <Button onClick={openCreate}>
            <Icon name="add" size={16} />
            Nova cerveja
          </Button>
        ) : null}
      </TableToolbar>

      <div className="table-panel">
        <BeerTable
          beers={beers}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          isRefreshing={showResultsSkeleton}
          hasActiveFilters={Boolean(search?.trim())}
          isTrashView={isTrashView}
          onCreate={isTrashView ? undefined : openCreate}
          onEdit={isTrashView ? undefined : openEdit}
          onParameters={isTrashView ? undefined : openParameters}
          onDelete={isTrashView ? undefined : setDeleteTarget}
          onRestore={isTrashView ? setRestoreTarget : undefined}
          deletingId={deletingId}
          restoringId={restoringId}
        />

        {data ? (
          <TablePagination
            page={data.page}
            pageSize={data.pageSize}
            totalItems={data.totalItems}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        ) : null}
      </div>
    </>
  )
}
