import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className={`form-field${error ? ' form-field--error' : ''}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && !error && <span className="form-field__hint">{hint}</span>}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id: string }

export function TextInput({ className = '', ...props }: InputProps) {
  return <input className={`form-input ${className}`.trim()} {...props} />
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { id: string }

export function SelectInput({ className = '', children, ...props }: SelectProps) {
  return (
    <select className={`form-input form-input--select ${className}`.trim()} {...props}>
      {children}
    </select>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }

export function TextAreaInput({ className = '', ...props }: TextareaProps) {
  return <textarea className={`form-input form-input--textarea ${className}`.trim()} {...props} />
}
