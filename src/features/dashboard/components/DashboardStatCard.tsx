import { Link } from 'react-router-dom'
import { Icon } from '../../../shared/icons/Icon'
import { useAnimatedNumber } from '../../../shared/hooks/useAnimatedNumber'
import { formatCompliancePercent } from '../utils/complianceRates'

interface DashboardStatCardProps {
  label: string
  icon: string
  className?: string
  to: string
  value: number
  ratePercent?: number
}

export default function DashboardStatCard({
  label,
  icon,
  className = '',
  to,
  value,
  ratePercent,
}: DashboardStatCardProps) {
  const animatedValue = useAnimatedNumber(value, { duration: 850 })
  const animatedRate = useAnimatedNumber(ratePercent ?? 0, {
    duration: 850,
    delay: 120,
    decimals: 1,
    enabled: ratePercent !== undefined,
  })

  return (
    <Link to={to} className={`stat-card stat-card--link ${className}`.trim()}>
      <span className="stat-card__icon">
        <Icon name={icon} size={22} />
      </span>
      <div className="stat-card__body">
        <div className="stat-card__label">{label}</div>
        <div className="stat-card__value stat-card__value--animated">{animatedValue}</div>
        {ratePercent !== undefined ? (
          <div className="stat-card__meta">
            {formatCompliancePercent(animatedRate)}% do total
          </div>
        ) : null}
      </div>
    </Link>
  )
}
