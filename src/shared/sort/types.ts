import type { FermentationComplianceStatus } from '../types'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: string
  direction: SortDirection
}

export interface ListQueryOptions {
  search?: string
  sortBy?: string
  sortDir?: SortDirection
  page?: number
  pageSize?: number
  complianceStatus?: FermentationComplianceStatus
  deletedOnly?: boolean
}
