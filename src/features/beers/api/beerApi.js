import apiClient from '../../../shared/api/apiClient'

export async function fetchBeers() {
  const { data } = await apiClient.get('/api/beers')
  return data
}
