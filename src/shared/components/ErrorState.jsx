export default function ErrorState({ message = 'Ocorreu um erro ao carregar os dados.' }) {
  return <div className="state-message state-message--error">{message}</div>
}
