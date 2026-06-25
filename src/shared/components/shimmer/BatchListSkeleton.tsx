import ShimmerBlock from './ShimmerBlock'

interface BatchListSkeletonProps {
  items?: number
}

export default function BatchListSkeleton({ items = 5 }: BatchListSkeletonProps) {
  return (
    <div className="batch-list" aria-busy="true" aria-label="Carregando lotes">
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="batch-list__item batch-list__item--skeleton">
          <div style={{ flex: 1, minWidth: 0 }}>
            <ShimmerBlock width={`${55 + (index % 2) * 15}%`} height="0.95rem" />
            <ShimmerBlock
              width={`${40 + (index % 3) * 10}%`}
              height="0.75rem"
              className="batch-list__meta-skeleton"
            />
          </div>
          <ShimmerBlock width="4.5rem" height="1.5rem" shape="pill" />
        </div>
      ))}
    </div>
  )
}
