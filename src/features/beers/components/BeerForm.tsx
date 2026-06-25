import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
import { FormField, SelectInput, TextInput } from '../../../shared/components/FormField'
import { Icon } from '../../../shared/icons/Icon'
import { BEER_STYLE_LABELS, BeerStyle, type CreateBeerDto, type UpdateBeerDto } from '../../../shared/types'

interface BeerFormProps {
  initialName?: string
  initialStyle?: BeerStyle
  submitLabel: string
  layout?: 'default' | 'dialog'
  onSubmit: (payload: CreateBeerDto | UpdateBeerDto) => Promise<void>
  onCancel: () => void
}

export default function BeerForm({
  initialName = '',
  initialStyle = BeerStyle.IPA,
  submitLabel,
  layout = 'default',
  onSubmit,
  onCancel,
}: BeerFormProps) {
  const [name, setName] = useState(initialName)
  const [style, setStyle] = useState<BeerStyle>(initialStyle)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({ name: name.trim(), style })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível salvar a cerveja.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert--error">{error}</div>}

      <div className="form-grid">
        <FormField label="Nome" htmlFor="beer-name">
          <TextInput
            id="beer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: ArBrain IPA"
            required
          />
        </FormField>

        <FormField label="Estilo" htmlFor="beer-style">
          <SelectInput
            id="beer-style"
            value={style}
            onChange={(e) => setStyle(Number(e.target.value) as BeerStyle)}
          >
            {Object.entries(BEER_STYLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </FormField>
      </div>

      <div className={`form-actions${layout === 'dialog' ? ' form-actions--dialog' : ''}`}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          <span className="btn__glyph" aria-hidden="true">×</span>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || !name.trim()}>
          <Icon name={submitLabel.toLowerCase().includes('cadastrar') ? 'add' : 'check'} size={16} />
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
