import { describe, expect, it } from 'vitest'
import { FermentationComplianceStatus } from '../types'
import { buildListParams } from './buildListParams'

describe('buildListParams', () => {
  it('returns undefined when options are empty', () => {
    expect(buildListParams()).toBeUndefined()
    expect(buildListParams({})).toBeUndefined()
  })

  it('builds search, sort and pagination params', () => {
    expect(
      buildListParams({
        search: '  ipa  ',
        sortBy: 'name',
        sortDir: 'asc',
        page: 2,
        pageSize: 20,
      }),
    ).toEqual({
      search: 'ipa',
      sortBy: 'name',
      sortDir: 'asc',
      page: '2',
      pageSize: '20',
    })
  })

  it('serializes compliance status as enum name', () => {
    expect(
      buildListParams({
        complianceStatus: FermentationComplianceStatus.RequiresAttention,
      }),
    ).toEqual({
      complianceStatus: 'RequiresAttention',
    })
  })

  it('serializes deletedOnly flag', () => {
    expect(buildListParams({ deletedOnly: true })).toEqual({ deletedOnly: 'true' })
    expect(buildListParams({ deletedOnly: false })).toEqual({ deletedOnly: 'false' })
  })
})
