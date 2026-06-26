import { describe, expect, it } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'
import { getApiErrorMessage } from './apiClient'

describe('getApiErrorMessage', () => {
  it('returns fallback for non-axios errors', () => {
    expect(getApiErrorMessage(new Error('boom'), 'Falha')).toBe('Falha')
  })

  it('returns API title when present', () => {
    const error = new AxiosError('Request failed')
    error.response = {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: { title: 'Nome inválido' },
    }

    expect(getApiErrorMessage(error)).toBe('Nome inválido')
  })

  it('flattens validation errors when title is absent', () => {
    const error = new AxiosError('Request failed')
    error.response = {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: {
        errors: {
          name: ['O nome é obrigatório.'],
          style: ['Estilo inválido.'],
        },
      },
    }

    expect(getApiErrorMessage(error)).toBe('O nome é obrigatório. Estilo inválido.')
  })
})
