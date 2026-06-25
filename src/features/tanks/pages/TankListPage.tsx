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
import type { TankDto } from '../../../shared/types'
import TankForm from '../components/TankForm'
import TankTable, {
  TANK_TABLE_DEFAULT_SORT,
  TANK_TRASH_TABLE_DEFAULT_SORT,
} from '../components/TankTable'
import {
  useCreateTank,
  useDeleteTank,
  useRestoreTank,
  useTanks,
  useUpdateTank,
} from '../hooks/useTanks'

type DialogMode = 'create' | 'edit' | null

export default function TankListPage() {
  const search = usePageSearchTerm()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const isTrashView = searchParams.get('view') === 'trash'
  const [page, setPage] = useState(1)
  const defaultSort = isTrashView ? TANK_TRASH_TABLE_DEFAULT_SORT : TANK_TABLE_DEFAULT_SORT
  const { sortField, sortDir, toggleSort, resetSort } = useSort(
    defaultSort.field,
    defaultSort.direction,
  )
  const { data, isLoading, isFetching, isError, error, refetch } = useTanks({
    search,
    sortBy: sortField,
    sortDir,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    deletedOnly: isTrashView,
  })
  const tanks = data?.items ?? []
  const createTank = useCreateTank()
  const updateTank = useUpdateTank()
  const deleteTank = useDeleteTank()
  const restoreTank = useRestoreTank()

  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [selectedTank, setSelectedTank] = useState<TankDto | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TankDto | null>(null)
  const [restoreTarget, setRestoreTarget] = useState<TankDto | null>(null)
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
    setSelectedTank(null)
  }

  function openCreate() {
    setSelectedTank(null)
    setDialogMode('create')
  }

  async function confirmDelete() {
    if (!deleteTarget) return

    setIsDeleting(true)
    setDeletingId(deleteTarget.id)
    try {
      await deleteTank.mutateAsync(deleteTarget.id)
      if (selectedTank?.id === deleteTarget.id) closeDialog()
      setDeleteTarget(null)
      toast.success('Tanque inativado com sucesso.')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Não foi possível excluir o tanque.'))
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
      await restoreTank.mutateAsync(restoreTarget.id)
      setRestoreTarget(null)
      toast.success('Tanque restaurado com sucesso.')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Não foi possível restaurar o tanque.'))
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
        message={getApiErrorMessage(error, 'Não foi possível carregar os tanques.')}
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <>
      <Dialog
        open={dialogMode !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
        title={dialogMode === 'create' ? 'Novo tanque' : 'Editar tanque'}
        icon={dialogMode === 'create' ? 'tank' : 'pencil'}
      >
        {dialogMode === 'create' && (
          <TankForm
            layout="dialog"
            submitLabel="Cadastrar"
            onCancel={closeDialog}
            onSubmit={async (payload) => {
              await createTank.mutateAsync(payload)
              toast.success('Tanque cadastrado com sucesso.')
              closeDialog()
            }}
          />
        )}

        {dialogMode === 'edit' && selectedTank && (
          <TankForm
            key={selectedTank.id}
            layout="dialog"
            initialName={selectedTank.name}
            initialCapacity={selectedTank.capacityLiters}
            submitLabel="Salvar alterações"
            onCancel={closeDialog}
            onSubmit={async (payload) => {
              await updateTank.mutateAsync({ id: selectedTank.id, payload })
              toast.success('Tanque atualizado com sucesso.')
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
        title={deleteTarget ? 'Inativar tanque?' : 'Confirmar exclusão'}
        highlightName={deleteTarget?.name}
        description="O tanque deixará de aparecer nas listagens ativas."
        confirmLabel="Inativar"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        open={restoreTarget !== null}
        onOpenChange={(open) => {
          if (!open && !isRestoring) setRestoreTarget(null)
        }}
        title={restoreTarget ? 'Restaurar tanque?' : 'Confirmar restauração'}
        highlightName={restoreTarget?.name}
        description="O tanque voltará a aparecer nas listagens ativas."
        confirmLabel="Restaurar"
        confirmVariant="primary"
        isLoading={isRestoring}
        onConfirm={confirmRestore}
      />

      <TableToolbar
        title={isTrashView ? 'Lixeira' : undefined}
        searchPlaceholder="Buscar tanque por nome..."
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
            Novo tanque
          </Button>
        ) : null}
      </TableToolbar>

      <div className="table-panel">
        <TankTable
          tanks={tanks}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          isRefreshing={showResultsSkeleton}
          hasActiveFilters={Boolean(search?.trim())}
          isTrashView={isTrashView}
          onCreate={isTrashView ? undefined : openCreate}
          onEdit={
            isTrashView
              ? undefined
              : (tank) => {
                  setSelectedTank(tank)
                  setDialogMode('edit')
                }
          }
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
