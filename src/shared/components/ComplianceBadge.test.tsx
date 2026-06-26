import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FermentationComplianceStatus } from '../types'
import ComplianceBadge from './ComplianceBadge'

describe('ComplianceBadge', () => {
  it('renders label and status class for each compliance level', () => {
    const { rerender } = render(
      <ComplianceBadge status={FermentationComplianceStatus.WithinStandard} />,
    )

    expect(screen.getByText('Dentro do padrão')).toHaveClass('badge', 'badge--success')

    rerender(<ComplianceBadge status={FermentationComplianceStatus.RequiresAttention} />)
    expect(screen.getByText('Requer atenção')).toHaveClass('badge--warning')

    rerender(<ComplianceBadge status={FermentationComplianceStatus.OutOfStandard} />)
    expect(screen.getByText('Fora do padrão')).toHaveClass('badge--danger')
  })
})
