import ShimmerBlock from './ShimmerBlock'

interface FormPanelSkeletonProps {
  fields?: number
  columns?: number
  withTextarea?: boolean
}

export default function FormPanelSkeleton({
  fields = 4,
  columns = 2,
  withTextarea = false,
}: FormPanelSkeletonProps) {
  return (
    <div className="card panel-card" aria-busy="true" aria-label="Carregando formulário">
      <div className="panel-card__header">
        <ShimmerBlock width="12rem" height="1rem" />
      </div>
      <div
        className="form-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className="form-field">
            <ShimmerBlock width="40%" height="0.85rem" />
            <ShimmerBlock width="100%" height="2.35rem" shape="md" />
          </div>
        ))}
        {withTextarea && (
          <div className="form-field" style={{ gridColumn: '1 / -1' }}>
            <ShimmerBlock width="30%" height="0.85rem" />
            <ShimmerBlock width="100%" height="5.5rem" shape="md" />
          </div>
        )}
      </div>
      <div className="form-actions">
        <ShimmerBlock width="6.5rem" height="2.35rem" shape="md" />
        <ShimmerBlock width="5.5rem" height="2.35rem" shape="md" />
      </div>
    </div>
  )
}
