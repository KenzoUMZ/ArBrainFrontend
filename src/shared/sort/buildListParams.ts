import { FermentationComplianceStatus } from '../types'
import type { ListQueryOptions } from './types'

function complianceStatusParam(status: FermentationComplianceStatus): string | undefined {
  return Object.entries(FermentationComplianceStatus).find(([, value]) => value === status)?.[0]
}

export function buildListParams(options?: ListQueryOptions) {
  if (!options) return undefined

  const params: Record<string, string> = {}

  const search = options.search?.trim()
  if (search) params.search = search
  if (options.sortBy) params.sortBy = options.sortBy
  if (options.sortDir) params.sortDir = options.sortDir
  if (options.page !== undefined) params.page = String(options.page)
  if (options.pageSize !== undefined) params.pageSize = String(options.pageSize)

  if (options.complianceStatus !== undefined) {
    const compliance = complianceStatusParam(options.complianceStatus)
    if (compliance) params.complianceStatus = compliance
  }

  return Object.keys(params).length > 0 ? params : undefined
}
