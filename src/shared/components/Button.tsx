import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon'

export type IconTone = 'edit' | 'config' | 'delete' | 'restore'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  iconTone?: IconTone
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  iconTone,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const iconToneClass = variant === 'icon' && iconTone ? `btn--icon-${iconTone}` : ''

  return (
    <button
      type="button"
      className={`btn btn--${variant} ${iconToneClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
