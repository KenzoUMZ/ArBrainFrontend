import ShimmerBlock from './ShimmerBlock'

interface BatchListSkeletonProps {
  items?: number
}

export default function BatchListSkeleton({ items = 5 }: BatchListSkeletonProps) {
  return (
    <div className="batch-list" aria-busy="true" aria-label="Carregando lotes">
      <div className="batch-list__header batch-list__header--skeleton" aria-hidden="true">
        <ShimmerBlock width="2.5rem" height="0.7rem" />
        <ShimmerBlock width="3.5rem" height="0.7rem" />
        <ShimmerBlock width="2.75rem" height="0.7rem" />
      </div>
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="batch-list__item batch-list__item--skeleton">
          <ShimmerBlock width={`${55 + (index % 2) * 15}%`} height="0.95rem" />
          <ShimmerBlock
            width={`${40 + (index % 3) * 10}%`}
            height="0.75rem"
            className="batch-list__meta-skeleton"
          />
          <ShimmerBlock width="4.5rem" height="1.5rem" shape="pill" />
        </div>
      ))}
    </div>
  )
}
