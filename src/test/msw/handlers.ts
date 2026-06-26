import { http, HttpResponse } from 'msw'
import { BeerStyle, FermentationComplianceStatus } from '../../shared/types'

export const handlers = [
  http.get('/api/dashboard', () =>
    HttpResponse.json({
      totalRecords: 8,
      withinStandardCount: 5,
      requiresAttentionCount: 2,
      outOfStandardCount: 1,
    }),
  ),

  http.get('/api/beers', () =>
    HttpResponse.json({
      items: [
        {
          id: 'beer-1',
          name: 'ArBrain IPA',
          style: BeerStyle.IPA,
          createdAt: '2026-06-20T10:00:00.000Z',
          updatedAt: '2026-06-20T10:00:00.000Z',
          deletedAt: null,
          parameters: {
            minTemperature: 18,
            maxTemperature: 22,
            minPh: 4.0,
            maxPh: 4.6,
            minExtract: 10,
            maxExtract: 14,
          },
        },
      ],
      page: 1,
      pageSize: 10,
      totalItems: 1,
      totalPages: 1,
    }),
  ),

  http.get('/api/fermentation-records/batches', () =>
    HttpResponse.json([
      {
        batchNumber: 'IPA001',
        beerName: 'ArBrain IPA',
        recordCount: 2,
        complianceStatus: FermentationComplianceStatus.WithinStandard,
      },
    ]),
  ),

  http.get('/api/fermentation-records/batches/:batchNumber', ({ params }) => {
    const batchNumber = String(params.batchNumber).toUpperCase()

    return HttpResponse.json({
      batchNumber,
      beerName: 'ArBrain IPA',
      records: [
        {
          id: 'record-1',
          registeredAt: '2026-06-20T14:00:00.000Z',
          beerId: 'beer-1',
          beerName: 'ArBrain IPA',
          tankId: 'tank-1',
          tankName: 'Tanque FV-01',
          batchNumber,
          temperature: 20,
          ph: 4.3,
          extract: 12,
          observations: null,
          complianceStatus: FermentationComplianceStatus.WithinStandard,
          createdAt: '2026-06-20T14:01:00.000Z',
        },
      ],
    })
  }),
]
