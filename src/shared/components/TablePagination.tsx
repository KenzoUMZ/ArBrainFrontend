import Button from './Button'

interface TablePaginationProps {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function TablePagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  if (totalItems === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  return (
    <div className="table-pagination card">
      <span className="table-pagination__info">
        {from}–{to} de {totalItems}
      </span>
      <div className="table-pagination__actions">
        <Button
          variant="secondary"
          className="btn--icon"
          title="Página anterior"
          aria-label="Página anterior"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ‹
        </Button>
        <span className="table-pagination__page">
          {page} / {Math.max(totalPages, 1)}
        </span>
        <Button
          variant="secondary"
          className="btn--icon"
          title="Próxima página"
          aria-label="Próxima página"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </Button>
      </div>
    </div>
  )
}
