import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from '../icons/Icon'

export type DialogIconTone = 'primary' | 'accent' | 'danger' | 'success'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  icon?: string
  iconTone?: DialogIconTone
  size?: 'md' | 'lg'
  children: ReactNode
}

export default function Dialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  iconTone = 'primary',
  size = 'md',
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      return
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`dialog dialog--${size}`}
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        event.preventDefault()
        onOpenChange(false)
      }}
    >
      <div className="dialog__panel">
        <header className="dialog__header">
          <div className="dialog__title-row">
            {icon ? (
              <span className={`dialog__title-icon dialog__title-icon--${iconTone}`} aria-hidden="true">
                <Icon name={icon} size={20} />
              </span>
            ) : null}
            <div className="dialog__title-copy">
              <h2 className="dialog__title">{title}</h2>
              {description ? <p className="dialog__description">{description}</p> : null}
            </div>
          </div>
          <button
            type="button"
            className="dialog__close btn btn--icon"
            aria-label="Fechar"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </header>
        <div className="dialog__body">{children}</div>
      </div>
    </dialog>
  )
}
