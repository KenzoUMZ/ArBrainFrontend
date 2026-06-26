import { describe, expect, it } from 'vitest'
import { formatDateTime, formatNumber, toDateTimeLocalValue } from './format'

describe('format utils', () => {
  it('formatNumber uses pt-BR decimal separator', () => {
    expect(formatNumber(10.5)).toBe('10,50')
    expect(formatNumber(1234.5, 1)).toBe('1.234,5')
  })

  it('formatDateTime formats ISO date in pt-BR', () => {
    const formatted = formatDateTime('2026-06-20T14:30:00.000Z')
    expect(formatted).toMatch(/20\/06\/2026/)
    expect(formatted).toMatch(/14:30|11:30/)
  })

  it('toDateTimeLocalValue builds datetime-local value', () => {
    const date = new Date(2026, 5, 20, 14, 5)
    expect(toDateTimeLocalValue(date)).toBe('2026-06-20T14:05')
  })
})
