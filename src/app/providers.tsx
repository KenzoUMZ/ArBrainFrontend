import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from '../shared/components/toast'
import router from './router'

function isTransientApiError(error: unknown): boolean {
  const status = (error as { response?: { status?: number } })?.response?.status
  return status === undefined || status === 502 || status === 503 || status === 504
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) =>
        isTransientApiError(error) ? failureCount < 5 : failureCount < 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
    },
  },
})

export default function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  )
}
