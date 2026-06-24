export const queryKeys = {
  beers: {
    all: ['beers'] as const,
    list: (
      search?: string,
      sortBy?: string,
      sortDir?: string,
      page?: number,
      pageSize?: number,
    ) =>
      ['beers', 'list', search ?? '', sortBy ?? '', sortDir ?? '', page ?? 1, pageSize ?? 10] as const,
    detail: (id: string) => ['beers', id] as const,
    parameters: (id: string) => ['beers', id, 'parameters'] as const,
  },
  tanks: {
    all: ['tanks'] as const,
    list: (
      search?: string,
      sortBy?: string,
      sortDir?: string,
      page?: number,
      pageSize?: number,
    ) =>
      ['tanks', 'list', search ?? '', sortBy ?? '', sortDir ?? '', page ?? 1, pageSize ?? 10] as const,
    detail: (id: string) => ['tanks', id] as const,
  },
  fermentationRecords: {
    all: ['fermentation-records'] as const,
    list: (
      search?: string,
      sortBy?: string,
      sortDir?: string,
      page?: number,
      pageSize?: number,
      complianceStatus?: string,
    ) =>
      [
        'fermentation-records',
        'list',
        search ?? '',
        sortBy ?? '',
        sortDir ?? '',
        page ?? 1,
        pageSize ?? 10,
        complianceStatus ?? '',
      ] as const,
    detail: (id: string) => ['fermentation-records', id] as const,
  },
  batches: {
    all: ['batches'] as const,
    list: (search?: string, sortBy?: string, sortDir?: string) =>
      ['batches', 'list', search ?? '', sortBy ?? '', sortDir ?? ''] as const,
    history: (batchNumber: string) => ['batches', 'history', batchNumber] as const,
  },
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
  },
  health: ['health'] as const,
} as const
