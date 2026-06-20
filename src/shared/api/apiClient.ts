import axios, { type AxiosError } from 'axios'
import type { ApiErrorBody } from '../types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiErrorMessage(error: unknown, fallback = 'Erro inesperado.'): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const axiosError = error as AxiosError<ApiErrorBody>
  const data = axiosError.response?.data

  if (data?.title) {
    return data.title
  }

  if (data?.errors) {
    return Object.values(data.errors).flat().join(' ')
  }

  return axiosError.message || fallback
}

export default apiClient
