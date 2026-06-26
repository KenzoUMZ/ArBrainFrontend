import { describe, expect, it } from 'vitest'
import { beerApi } from './beerApi'

describe('beerApi integration', () => {
  it('fetches paginated beers from API', async () => {
    const result = await beerApi.getAll({ search: 'ipa', page: 1, pageSize: 10 })

    expect(result.page).toBe(1)
    expect(result.totalItems).toBe(1)
    expect(result.items[0]?.name).toBe('ArBrain IPA')
  })

  it('forwards list query params to the API', async () => {
    const result = await beerApi.getAll({
      sortBy: 'name',
      sortDir: 'asc',
      page: 2,
      pageSize: 5,
    })

    expect(result.items).toHaveLength(1)
  })
})
