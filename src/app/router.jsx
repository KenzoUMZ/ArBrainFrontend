import { createBrowserRouter } from 'react-router-dom'
import Layout from '../shared/components/Layout'
import BeerListPage from '../features/beers/pages/BeerListPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'cervejas',
        element: <BeerListPage />,
      },
    ],
  },
])

export default router
