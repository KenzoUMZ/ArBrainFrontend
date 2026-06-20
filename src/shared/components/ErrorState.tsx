interface ErrorStateProps {
  message?: string
}

export default function ErrorState({
  message = 'Ocorreu um erro ao carregar os dados.',
}: ErrorStateProps) {
  return <div className="state-message state-message--error">{message}</div>
}
