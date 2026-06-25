import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
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
import { complianceFilterChipClass, complianceLabel, parseComplianceParam } from '../../../shared/utils/compliance'
import FermentationRecordForm from '../components/FermentationRecordForm'
import FermentationRecordTable, {
  FERMENTATION_RECORD_TABLE_DEFAULT_SORT,
} from '../components/FermentationRecordTable'
import { useCreateFermentationRecord, useFermentationRecords } from '../hooks/useFermentation'

export default function FermentationRecordsPage() {
  const search = usePageSearchTerm()
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const complianceFilter = parseComplianceParam(searchParams.get('compliance'))
  const [page, setPage] = useState(1)
  const { sortField, sortDir, toggleSort } = useSort(
    FERMENTATION_RECORD_TABLE_DEFAULT_SORT.field,
    FERMENTATION_RECORD_TABLE_DEFAULT_SORT.direction,
  )
  const { data, isLoading, isFetching, isError, error, refetch } = useFermentationRecords({
    search,
    sortBy: sortField,
    sortDir,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    complianceStatus: complianceFilter,
  })
  const records = data?.items ?? []
  const createRecord = useCreateFermentationRecord()
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [search, sortField, sortDir, complianceFilter])

  function clearComplianceFilter() {
    const next = new URLSearchParams(searchParams)
    next.delete('compliance')
    setSearchParams(next, { replace: true })
  }

  const showResultsSkeleton = useMinimumVisible(isLoading || isFetching)
  const hasActiveFilters = Boolean(search?.trim()) || complianceFilter !== undefined

  if (isError) {
    return (
      <ErrorState
        message={getApiErrorMessage(error, 'Não foi possível carregar os apontamentos.')}
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <>
      <Dialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Novo apontamento"
        icon="envase"
        size="lg"
      >
        <FermentationRecordForm
          key={createOpen ? 'open' : 'closed'}
          layout="dialog"
          onCancel={() => setCreateOpen(false)}
          onSubmit={async (payload) => {
            await createRecord.mutateAsync(payload)
            toast.success(`Apontamento do lote ${payload.batchNumber} registrado com sucesso.`)
            setCreateOpen(false)
          }}
        />
      </Dialog>

      <TableToolbar searchPlaceholder="Buscar por lote, cerveja ou tanque...">
        {complianceFilter !== undefined ? (
          <button
            type="button"
            className={`filter-chip ${complianceFilterChipClass(complianceFilter)}`}
            onClick={clearComplianceFilter}
            aria-label={`Remover filtro ${complianceLabel(complianceFilter)}`}
          >
            {complianceLabel(complianceFilter)}
            <span className="filter-chip__remove" aria-hidden="true">×</span>
          </button>
        ) : null}
        <Button onClick={() => setCreateOpen(true)}>
          <Icon name="add" size={16} />
          Novo apontamento
        </Button>
      </TableToolbar>

      <div className="table-panel">
        <FermentationRecordTable
          records={records}
          sortField={sortField}
          sortDir={sortDir}
          onSort={toggleSort}
          isRefreshing={showResultsSkeleton}
          hasActiveFilters={hasActiveFilters}
          onCreate={() => setCreateOpen(true)}
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
