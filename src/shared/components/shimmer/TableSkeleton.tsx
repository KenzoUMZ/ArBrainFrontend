import type { ReactNode } from 'react'
import TableBodySkeleton from './TableBodySkeleton'

interface TableSkeletonProps {
  columns: number
  rows?: number
  actionColumns?: number
  /** Cabeçalhos reais da tabela (sem shimmer). */
  header: ReactNode
}

export default function TableSkeleton({
  columns,
  rows = 5,
  actionColumns = 0,
  header,
}: TableSkeletonProps) {
  return (
    <div className="data-table card" aria-busy="true" aria-label="Carregando tabela">
      <table>
        <thead>{header}</thead>
        <tbody>
          <TableBodySkeleton columns={columns} rows={rows} actionColumns={actionColumns} />
        </tbody>
      </table>
    </div>
  )
}
