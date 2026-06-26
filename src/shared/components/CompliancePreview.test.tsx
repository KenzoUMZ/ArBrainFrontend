import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FermentationComplianceStatus } from '../types'
import CompliancePreview from './CompliancePreview'

const parameters = {
  minTemperature: 18,
  maxTemperature: 22,
  minPh: 4.0,
  maxPh: 4.6,
  minExtract: 10,
  maxExtract: 14,
}

describe('CompliancePreview', () => {
  it('shows helper text when parameters are missing', () => {
    render(<CompliancePreview temperature={20} ph={4.3} extract={12} parameters={null} />)

    expect(
      screen.getByText('Selecione uma cerveja com parâmetros para ver a conformidade.'),
    ).toBeInTheDocument()
  })

  it('shows compliance badge preview when parameters exist', () => {
    render(<CompliancePreview temperature={20} ph={4.3} extract={12} parameters={parameters} />)

    expect(screen.getByText('Prévia de conformidade')).toBeInTheDocument()
    expect(screen.getByText('Dentro do padrão')).toBeInTheDocument()
  })

  it('shows out-of-standard preview for invalid metrics', () => {
    render(<CompliancePreview temperature={25} ph={4.3} extract={12} parameters={parameters} />)

    expect(screen.getByText('Fora do padrão')).toHaveClass('badge--danger')
  })
})
