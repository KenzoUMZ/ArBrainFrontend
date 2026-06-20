import { useQuery } from '@tanstack/react-query'
import { fetchBeers } from '../api/beerApi'

export function useBeers() {
  return useQuery({
    queryKey: ['beers'],
    queryFn: fetchBeers,
  })
}
