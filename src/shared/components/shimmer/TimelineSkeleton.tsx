import ShimmerBlock from './ShimmerBlock'

interface TimelineSkeletonProps {
  items?: number
}

export default function TimelineSkeleton({ items = 4 }: TimelineSkeletonProps) {
  return (
    <div className="card" aria-busy="true" aria-label="Carregando histórico">
      {/* Espelha .panel-card__header do BatchTimeline real */}
      <div className="panel-card__header">
        <div style={{ flex: 1 }}>
          {/* "Lote 001" — título em 1rem / font-weight 700 */}
          <ShimmerBlock width="6rem" height="1rem" />
          {/* "Beer name · N apontamento(s)" — subtítulo em 0.85rem */}
          <ShimmerBlock
            width="10rem"
            height="0.85rem"
            className="timeline-skeleton__subtitle"
          />
        </div>
        {/* ícone barril-parcial 32×32 */}
        <ShimmerBlock width="32px" height="32px" shape="md" />
      </div>

      {/* Espelha <div className="timeline"> com a linha ::before */}
      <div className="timeline timeline--skeleton">
        {Array.from({ length: items }, (_, index) => {
          const hasObs = index % 2 === 0

          return (
            <article key={index} className="timeline-item timeline-item--skeleton">
              {/* dot — agora anima via shimmer-slide no CSS */}
              <span
                className="timeline-item__dot timeline-item__dot--skeleton"
                aria-hidden="true"
              />

              {/* Espelha .timeline-item__header: data + badge */}
              <div className="timeline-item__header">
                <ShimmerBlock width="7rem" height="0.85rem" />
                <ShimmerBlock width="5.5rem" height="1.4rem" shape="pill" />
              </div>

              {/* Espelha .timeline-item__meta: Tanque / Temp / pH / Extrato */}
              <div className="timeline-item__meta">
                <ShimmerBlock width="6rem" height="0.85rem" />
                <ShimmerBlock width="5rem" height="0.85rem" />
                <ShimmerBlock width="3rem" height="0.85rem" />
                <ShimmerBlock width="6rem" height="0.85rem" />
              </div>

              {/* Espelha .timeline-item__obs (opcional) */}
              {hasObs && (
                <ShimmerBlock
                  width={`${58 + (index % 3) * 10}%`}
                  height="0.85rem"
                  className="timeline-item__obs-skeleton"
                />
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
