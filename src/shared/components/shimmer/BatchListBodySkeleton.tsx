import ShimmerBlock from './ShimmerBlock'

interface BatchListBodySkeletonProps {
  items?: number
}

export default function BatchListBodySkeleton({ items = 5 }: BatchListBodySkeletonProps) {
  return (
    <>
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="batch-list__item batch-list__item--skeleton" aria-hidden="true">
          <div className="batch-list__item-batch">
            <ShimmerBlock width={`${55 + (index % 2) * 15}%`} height="0.95rem" />
          </div>
          <div className="batch-list__item-beer">
            <ShimmerBlock width={`${65 + (index % 3) * 10}%`} height="0.75rem" />
          </div>
          <div className="batch-list__item-status">
            <ShimmerBlock width="5.5rem" height="1.5rem" shape="pill" />
          </div>
          <span className="batch-list__item-count">
            <ShimmerBlock width="4.5rem" height="1.5rem" shape="pill" />
          </span>
        </div>
      ))}
    </>
  )
}
