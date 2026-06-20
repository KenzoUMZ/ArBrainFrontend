export const queryKeys = {
  beers: {
    all: ['beers'] as const,
    detail: (id: string) => ['beers', id] as const,
    parameters: (id: string) => ['beers', id, 'parameters'] as const,
  },
  tanks: {
    all: ['tanks'] as const,
    detail: (id: string) => ['tanks', id] as const,
  },
  fermentationRecords: {
    all: ['fermentation-records'] as const,
    detail: (id: string) => ['fermentation-records', id] as const,
    batches: ['fermentation-records', 'batches'] as const,
    batchHistory: (batchNumber: string) =>
      ['fermentation-records', 'batches', batchNumber] as const,
  },
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
  },
  health: ['health'] as const,
} as const
