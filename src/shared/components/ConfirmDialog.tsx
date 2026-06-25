import { Icon } from '../icons/Icon'
import Button from './Button'
import Dialog, { type DialogIconTone } from './Dialog'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  highlightName?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'danger' | 'primary'
  titleIcon?: string
  titleIconTone?: DialogIconTone
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  highlightName,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmVariant = 'danger',
  titleIcon,
  titleIconTone,
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  async function handleConfirm() {
    try {
      await onConfirm()
      onOpenChange(false)
    } catch {
      // Mantém o diálogo aberto em caso de erro.
    }
  }

  const confirmIcon = confirmVariant === 'danger' ? 'trash' : 'check'
  const dialogIcon = titleIcon ?? (confirmVariant === 'danger' ? 'trash' : 'entrada-estoque')
  const dialogIconTone = titleIconTone ?? (confirmVariant === 'danger' ? 'danger' : 'success')

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={dialogIcon}
      iconTone={dialogIconTone}
    >
      {highlightName ? (
        <p className="confirm-dialog__highlight" aria-label={`Item: ${highlightName}`}>
          {highlightName}
        </p>
      ) : null}
      <div className="form-actions form-actions--dialog">
        <Button type="button" variant="secondary" disabled={isLoading} onClick={() => onOpenChange(false)}>
          <span className="btn__glyph" aria-hidden="true">×</span>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={confirmVariant === 'danger' ? 'danger' : 'primary'}
          disabled={isLoading}
          onClick={() => void handleConfirm()}
        >
          <Icon name={confirmIcon} size={16} />
          {isLoading ? 'Aguarde...' : confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}
