interface LoadingStateProps {
  message?: string
}

export default function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  return <div className="state-message">{message}</div>
}
