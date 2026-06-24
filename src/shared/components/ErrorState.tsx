import Button from './Button'
import { Icon } from '../icons/Icon'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

export default function ErrorState({
  message = 'Ocorreu um erro ao carregar os dados.',
  onRetry,
  retryLabel = 'Tentar novamente',
}: ErrorStateProps) {
  return (
    <div className="empty-state card empty-state--error" role="alert">
      <div className="empty-state__icon empty-state__icon--error">
        <Icon name="attention" size={40} />
      </div>
      <p className="empty-state__message">{message}</p>
      {onRetry ? (
        <div className="empty-state__action">
          <Button variant="secondary" onClick={onRetry}>
            <Icon name="settings" size={16} />
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
