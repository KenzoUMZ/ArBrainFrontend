import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
import { FormField, TextInput } from '../../../shared/components/FormField'
import { Icon } from '../../../shared/icons/Icon'
import type { BeerFermentationParametersDto, UpsertBeerParametersDto } from '../../../shared/types'

/** Valores iniciais sugeridos quando a cerveja ainda não possui parâmetros salvos. */
const DEFAULT_PARAMS: BeerFermentationParametersDto = {
  minTemperature: 18,
  maxTemperature: 22,
  minPh: 4.2,
  maxPh: 4.6,
  minExtract: 10,
  maxExtract: 14,
}

interface BeerParametersFormProps {
  beerName: string
  initial?: BeerFermentationParametersDto | null
  layout?: 'default' | 'dialog'
  onSubmit: (payload: UpsertBeerParametersDto) => Promise<void>
  onCancel: () => void
}

export default function BeerParametersForm({
  beerName,
  initial,
  layout = 'default',
  onSubmit,
  onCancel,
}: BeerParametersFormProps) {
  const [params, setParams] = useState<BeerFermentationParametersDto>(
    initial ?? DEFAULT_PARAMS,
  )
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof BeerFermentationParametersDto, value: string) {
    setParams((prev) => ({ ...prev, [field]: Number(value) }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit(params)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível salvar os parâmetros.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Faixas aceitáveis de fermentação para <strong>{beerName}</strong>.
      </p>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="form-grid">
        <FormField label="Temp. mínima (°C)" htmlFor="min-temp">
          <TextInput
            id="min-temp"
            type="number"
            step="0.1"
            value={params.minTemperature}
            onChange={(e) => updateField('minTemperature', e.target.value)}
            required
          />
        </FormField>
        <FormField label="Temp. máxima (°C)" htmlFor="max-temp">
          <TextInput
            id="max-temp"
            type="number"
            step="0.1"
            value={params.maxTemperature}
            onChange={(e) => updateField('maxTemperature', e.target.value)}
            required
          />
        </FormField>
        <FormField label="pH mínimo" htmlFor="min-ph">
          <TextInput
            id="min-ph"
            type="number"
            step="0.01"
            value={params.minPh}
            onChange={(e) => updateField('minPh', e.target.value)}
            required
          />
        </FormField>
        <FormField label="pH máximo" htmlFor="max-ph">
          <TextInput
            id="max-ph"
            type="number"
            step="0.01"
            value={params.maxPh}
            onChange={(e) => updateField('maxPh', e.target.value)}
            required
          />
        </FormField>
        <FormField label="Extrato mínimo (°P)" htmlFor="min-extract">
          <TextInput
            id="min-extract"
            type="number"
            step="0.1"
            value={params.minExtract}
            onChange={(e) => updateField('minExtract', e.target.value)}
            required
          />
        </FormField>
        <FormField label="Extrato máximo (°P)" htmlFor="max-extract">
          <TextInput
            id="max-extract"
            type="number"
            step="0.1"
            value={params.maxExtract}
            onChange={(e) => updateField('maxExtract', e.target.value)}
            required
          />
        </FormField>
      </div>

      <div className={`form-actions${layout === 'dialog' ? ' form-actions--dialog' : ''}`}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          <span className="btn__glyph" aria-hidden="true">×</span>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Icon name="check" size={16} />
          {isSubmitting ? 'Salvando...' : 'Salvar parâmetros'}
        </Button>
      </div>
    </form>
  )
}
