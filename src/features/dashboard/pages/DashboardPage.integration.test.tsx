import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../../test/msw/server'
import { renderWithProviders } from '../../../test/testUtils'
import DashboardPage from './DashboardPage'

describe('DashboardPage integration', () => {
  it('renders dashboard metrics from API', async () => {
    renderWithProviders(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('Total de apontamentos')).toBeInTheDocument()
    })

    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Taxa de conformidade')).toBeInTheDocument()
    expect(screen.getByText('62,5%')).toBeInTheDocument()
    expect(screen.getByText('62,5% do total')).toBeInTheDocument()
    expect(screen.getByText('25% do total')).toBeInTheDocument()
    expect(screen.getByText('12,5% do total')).toBeInTheDocument()
  })

  it('shows empty state when there are no records', async () => {
    server.use(
      http.get('/api/dashboard', () =>
        HttpResponse.json({
          totalRecords: 0,
          withinStandardCount: 0,
          requiresAttentionCount: 0,
          outOfStandardCount: 0,
        }),
      ),
    )

    renderWithProviders(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/Nenhum apontamento registrado/i)).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: /Ir para fermentação/i })).toHaveAttribute(
      'href',
      '/fermentacao',
    )
  })

  it('shows error state and retries after API failure', async () => {
    let attempts = 0

    server.use(
      http.get('/api/dashboard', () => {
        attempts += 1
        if (attempts === 1) {
          return HttpResponse.json({ title: 'Falha no servidor' }, { status: 500 })
        }

        return HttpResponse.json({
          totalRecords: 3,
          withinStandardCount: 2,
          requiresAttentionCount: 1,
          outOfStandardCount: 0,
        })
      }),
    )

    renderWithProviders(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Falha no servidor')
    })

    await userEvent.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    await waitFor(() => {
      const totalLinks = screen.getAllByRole('link', { name: /Total de apontamentos/i })
      const latest = totalLinks[totalLinks.length - 1]
      expect(latest.querySelector('.stat-card__value')).toHaveTextContent('3')
    })

    expect(attempts).toBeGreaterThanOrEqual(2)
  })
})
