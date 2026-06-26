/** Estilos de cerveja — valores numéricos conforme serialização da API. */
export const BeerStyle = {
  IPA: 1,
  Lager: 2,
  Pilsner: 3,
  Stout: 4,
  Porter: 5,
  Weiss: 6,
  Sour: 7,
  PaleAle: 8,
} as const

export type BeerStyle = (typeof BeerStyle)[keyof typeof BeerStyle]

export const BEER_STYLE_LABELS: Record<BeerStyle, string> = {
  [BeerStyle.IPA]: 'IPA',
  [BeerStyle.Lager]: 'Lager',
  [BeerStyle.Pilsner]: 'Pilsner',
  [BeerStyle.Stout]: 'Stout',
  [BeerStyle.Porter]: 'Porter',
  [BeerStyle.Weiss]: 'Weiss',
  [BeerStyle.Sour]: 'Sour',
  [BeerStyle.PaleAle]: 'Pale Ale',
}

/** Status de conformidade fermentativa calculado no backend. */
export const FermentationComplianceStatus = {
  WithinStandard: 1,
  RequiresAttention: 2,
  OutOfStandard: 3,
} as const

export type FermentationComplianceStatus =
  (typeof FermentationComplianceStatus)[keyof typeof FermentationComplianceStatus]

export const COMPLIANCE_STATUS_LABELS: Record<FermentationComplianceStatus, string> = {
  [FermentationComplianceStatus.WithinStandard]: 'Dentro do padrão',
  [FermentationComplianceStatus.RequiresAttention]: 'Requer atenção',
  [FermentationComplianceStatus.OutOfStandard]: 'Fora do padrão',
}

export interface BeerFermentationParametersDto {
  minTemperature: number
  maxTemperature: number
  minPh: number
  maxPh: number
  minExtract: number
  maxExtract: number
}

export interface BeerDto {
  id: string
  name: string
  style: BeerStyle
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  parameters: BeerFermentationParametersDto | null
}

export interface CreateBeerDto {
  name: string
  style: BeerStyle
}

export interface UpdateBeerDto {
  name: string
  style: BeerStyle
}

export type UpsertBeerParametersDto = BeerFermentationParametersDto

export interface TankDto {
  id: string
  name: string
  capacityLiters: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface CreateTankDto {
  name: string
  capacityLiters: number
}

export interface UpdateTankDto {
  name: string
  capacityLiters: number
}

export interface FermentationRecordDto {
  id: string
  registeredAt: string
  beerId: string
  beerName: string
  tankId: string
  tankName: string
  batchNumber: string
  temperature: number
  ph: number
  extract: number
  observations: string | null
  complianceStatus: FermentationComplianceStatus
  createdAt: string
}

export interface CreateFermentationRecordDto {
  registeredAt: string
  beerId: string
  tankId: string
  batchNumber: string
  temperature: number
  ph: number
  extract: number
  observations?: string | null
}

export interface BatchSummaryDto {
  batchNumber: string
  beerName: string
  recordCount: number
  complianceStatus: FermentationComplianceStatus
}

export interface BatchHistoryDto {
  batchNumber: string
  beerName: string
  records: FermentationRecordDto[]
}

export interface DashboardSummaryDto {
  totalRecords: number
  withinStandardCount: number
  requiresAttentionCount: number
  outOfStandardCount: number
}

export interface HealthDto {
  status: string
  timestamp: string
}

export interface ApiErrorBody {
  title?: string
  errors?: Record<string, string[]>
}

export interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}
