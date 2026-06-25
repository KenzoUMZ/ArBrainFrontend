import ShimmerBlock from '../../../shared/components/shimmer/ShimmerBlock'

export default function ComplianceSummarySkeleton() {
  return (
    <div className="compliance-summary compliance-summary--skeleton" aria-busy="true">
      <div className="compliance-summary__header">
        <div className="compliance-summary__intro">
          <ShimmerBlock width="55%" height="1.1rem" />
          <ShimmerBlock width="75%" height="0.85rem" />
        </div>
        <ShimmerBlock width="4.5rem" height="2.75rem" shape="md" />
      </div>
      <ShimmerBlock width="100%" height="0.55rem" shape="pill" />
      <div className="compliance-summary__legend">
        <ShimmerBlock width="30%" height="0.8rem" />
        <ShimmerBlock width="32%" height="0.8rem" />
        <ShimmerBlock width="28%" height="0.8rem" />
      </div>
    </div>
  )
}
