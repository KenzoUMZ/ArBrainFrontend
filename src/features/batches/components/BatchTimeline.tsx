import type { FermentationRecordDto } from '../../../shared/types'
import { FermentationComplianceStatus } from '../../../shared/types'
import ComplianceBadge from '../../../shared/components/ComplianceBadge'
import { Icon } from '../../../shared/icons/Icon'
import { formatDateTime, formatNumber } from '../../../shared/utils/format'

const timelineDotClass: Record<number, string> = {
  [FermentationComplianceStatus.WithinStandard]: 'timeline-item__dot--success',
  [FermentationComplianceStatus.RequiresAttention]: 'timeline-item__dot--warning',
  [FermentationComplianceStatus.OutOfStandard]: 'timeline-item__dot--danger',
}

const observationCalloutClass: Record<number, string> = {
  [FermentationComplianceStatus.WithinStandard]: 'timeline-item__obs--success',
  [FermentationComplianceStatus.RequiresAttention]: 'timeline-item__obs--warning',
  [FermentationComplianceStatus.OutOfStandard]: 'timeline-item__obs--danger',
}

interface BatchTimelineProps {
  batchNumber: string
  beerName: string
  records: FermentationRecordDto[]
}

export default function BatchTimeline({ batchNumber, beerName, records }: BatchTimelineProps) {
  if (records.length === 0) {
    return (
      <div className="empty-state card">
        <div className="empty-state__icon">
          <Icon name="ticket-confirmation" size={40} />
        </div>
        <p>Selecione um lote para ver o histórico.</p>
      </div>
    )
  }

  const sorted = [...records].sort(
    (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime(),
  )

  return (
    <div className="card">
      <div className="panel-card__header">
        <div>
          <h3 className="panel-card__title">Lote {batchNumber}</h3>
          <p className="text-subtitle">
            {beerName} · {records.length} apontamento(s)
          </p>
        </div>
        <Icon name="barril-parcial" size={32} />
      </div>

      <div className="timeline">
        {sorted.map((record) => (
          <article key={record.id} className="timeline-item">
            <span
              className={`timeline-item__dot ${timelineDotClass[record.complianceStatus] ?? ''}`}
            />
            <div className="timeline-item__header">
              <span className="timeline-item__date">{formatDateTime(record.registeredAt)}</span>
              <ComplianceBadge status={record.complianceStatus} />
            </div>
            <div className="timeline-item__meta">
              <span className="timeline-item__metric">
                <Icon name="tank" size={14} />
                {record.tankName}
              </span>
              <span className="timeline-item__metric">
                <Icon name="manutencao" size={14} />
                {formatNumber(record.temperature, 1)} °C
              </span>
              <span className="timeline-item__metric">
                <Icon name="settings" size={14} />
                pH {formatNumber(record.ph, 2)}
              </span>
              <span className="timeline-item__metric">
                <Icon name="barril-parcial" size={14} />
                {formatNumber(record.extract, 1)} °P
              </span>
            </div>
            {record.observations ? (
              <p
                className={`timeline-item__obs ${observationCalloutClass[record.complianceStatus] ?? ''}`}
              >
                {record.observations}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
