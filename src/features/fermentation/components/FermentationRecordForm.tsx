import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
import CompliancePreview from '../../../shared/components/CompliancePreview'
import { FormField, SelectInput, TextAreaInput, TextInput } from '../../../shared/components/FormField'
import { OPTION_LIST_PAGE_SIZE } from '../../../shared/config/pagination'
import { Icon } from '../../../shared/icons/Icon'
import type { CreateFermentationRecordDto } from '../../../shared/types'
import { toDateTimeLocalValue } from '../../../shared/utils/format'
import { useBeers } from '../../beers/hooks/useBeers'
import { useTanks } from '../../tanks/hooks/useTanks'

interface FermentationRecordFormProps {
  layout?: 'default' | 'dialog'
  onSubmit: (payload: CreateFermentationRecordDto) => Promise<void>
  onCancel?: () => void
}

export default function FermentationRecordForm({
  layout = 'default',
  onSubmit,
  onCancel,
}: FermentationRecordFormProps) {
  const { data: beerPage } = useBeers({ pageSize: OPTION_LIST_PAGE_SIZE })
  const { data: tankPage } = useTanks({ pageSize: OPTION_LIST_PAGE_SIZE })
  const beers = beerPage?.items ?? []
  const tanks = tankPage?.items ?? []

  const beersWithParams = beers.filter((b) => b.parameters)

  const [registeredAt, setRegisteredAt] = useState(toDateTimeLocalValue())
  const [beerId, setBeerId] = useState('')
  const [tankId, setTankId] = useState('')
  const [batchNumber, setBatchNumber] = useState('')
  const [temperature, setTemperature] = useState(20)
  const [ph, setPh] = useState(4.4)
  const [extract, setExtract] = useState(12)
  const [observations, setObservations] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        registeredAt: new Date(registeredAt).toISOString(),
        beerId,
        tankId,
        batchNumber: batchNumber.trim().toUpperCase(),
        temperature,
        ph,
        extract,
        observations: observations.trim() || null,
      })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível registrar o apontamento.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit =
    beerId &&
    tankId &&
    batchNumber.trim() &&
    beersWithParams.length > 0 &&
    tanks.length > 0

  const selectedBeer = beersWithParams.find((beer) => beer.id === beerId)

  return (
    <form onSubmit={handleSubmit}>
      {beersWithParams.length === 0 && (
        <div className="alert alert--error">
          Cadastre ao menos uma cerveja com parâmetros fermentativos antes de registrar apontamentos.
        </div>
      )}

      {error && <div className="alert alert--error">{error}</div>}

      <div className="form-grid">
        <FormField label="Data e hora" htmlFor="registered-at">
          <TextInput
            id="registered-at"
            type="datetime-local"
            value={registeredAt}
            onChange={(e) => setRegisteredAt(e.target.value)}
            required
          />
        </FormField>

        <FormField label="Lote" htmlFor="batch-number">
          <TextInput
            id="batch-number"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value.toUpperCase())}
            placeholder="Ex.: IPA001"
            required
          />
        </FormField>

        <FormField label="Cerveja" htmlFor="beer-id">
          <SelectInput
            id="beer-id"
            value={beerId}
            onChange={(e) => setBeerId(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {beersWithParams.map((beer) => (
              <option key={beer.id} value={beer.id}>
                {beer.name}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField label="Tanque" htmlFor="tank-id">
          <SelectInput
            id="tank-id"
            value={tankId}
            onChange={(e) => setTankId(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {tanks.map((tank) => (
              <option key={tank.id} value={tank.id}>
                {tank.name}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField label="Temperatura (°C)" htmlFor="temperature">
          <TextInput
            id="temperature"
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            required
          />
        </FormField>

        <FormField label="pH" htmlFor="ph">
          <TextInput
            id="ph"
            type="number"
            step="0.01"
            value={ph}
            onChange={(e) => setPh(Number(e.target.value))}
            required
          />
        </FormField>

        <FormField label="Extrato (°P)" htmlFor="extract">
          <TextInput
            id="extract"
            type="number"
            step="0.1"
            value={extract}
            onChange={(e) => setExtract(Number(e.target.value))}
            required
          />
        </FormField>
      </div>

      <FormField label="Observações" htmlFor="observations">
        <TextAreaInput
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Opcional"
        />
      </FormField>

      <CompliancePreview
        temperature={temperature}
        ph={ph}
        extract={extract}
        parameters={selectedBeer?.parameters}
      />

      <div className={`form-actions${layout === 'dialog' ? ' form-actions--dialog' : ''}`}>
        {layout === 'dialog' && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            <span className="btn__glyph" aria-hidden="true">×</span>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || !canSubmit}>
          <Icon name="add" size={16} />
          {isSubmitting ? 'Registrando...' : 'Registrar apontamento'}
        </Button>
      </div>
    </form>
  )
}
