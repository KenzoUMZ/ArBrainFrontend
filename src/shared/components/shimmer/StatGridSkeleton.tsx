import ShimmerBlock from './ShimmerBlock'

interface StatGridSkeletonProps {
  count?: number
}

export default function StatGridSkeleton({ count = 4 }: StatGridSkeletonProps) {
  return (
    <div className="stat-grid" aria-busy="true" aria-label="Carregando indicadores">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="stat-card">
          <ShimmerBlock width="40px" height="40px" shape="md" />
          <div className="stat-card__body">
            <ShimmerBlock width="70%" height="0.8rem" />
            <ShimmerBlock width="45%" height="1.75rem" className="stat-card__value-skeleton" />
          </div>
        </div>
      ))}
    </div>
  )
}
