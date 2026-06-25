import { useState, type FormEvent } from 'react'
import { getApiErrorMessage } from '../../../shared/api/apiClient'
import Button from '../../../shared/components/Button'
import { FormField, TextInput } from '../../../shared/components/FormField'
import { Icon } from '../../../shared/icons/Icon'
import type { CreateTankDto, UpdateTankDto } from '../../../shared/types'

interface TankFormProps {
  initialName?: string
  initialCapacity?: number
  submitLabel: string
  layout?: 'default' | 'dialog'
  onSubmit: (payload: CreateTankDto | UpdateTankDto) => Promise<void>
  onCancel: () => void
}

export default function TankForm({
  initialName = '',
  initialCapacity = 1000,
  submitLabel,
  layout = 'default',
  onSubmit,
  onCancel,
}: TankFormProps) {
  const [name, setName] = useState(initialName)
  const [capacityLiters, setCapacityLiters] = useState(initialCapacity)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({ name: name.trim(), capacityLiters })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível salvar o tanque.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert--error">{error}</div>}

      <div className="form-grid">
        <FormField label="Nome" htmlFor="tank-name">
          <TextInput
            id="tank-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: FV-01"
            required
          />
        </FormField>

        <FormField label="Capacidade (L)" htmlFor="tank-capacity">
          <TextInput
            id="tank-capacity"
            type="number"
            min="1"
            step="1"
            value={capacityLiters}
            onChange={(e) => setCapacityLiters(Number(e.target.value))}
            required
          />
        </FormField>
      </div>

      <div className={`form-actions${layout === 'dialog' ? ' form-actions--dialog' : ''}`}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          <span className="btn__glyph" aria-hidden="true">×</span>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || !name.trim() || capacityLiters <= 0}>
          <Icon name={submitLabel.toLowerCase().includes('cadastrar') ? 'add' : 'check'} size={16} />
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
