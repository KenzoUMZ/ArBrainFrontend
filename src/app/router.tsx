import { createBrowserRouter } from 'react-router-dom'
import BeerListPage from '../features/beers/pages/BeerListPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import BatchHistoryPage from '../features/fermentation/pages/BatchHistoryPage'
import FermentationRecordsPage from '../features/fermentation/pages/FermentationRecordsPage'
import TankListPage from '../features/tanks/pages/TankListPage'
import Layout from '../shared/components/Layout'

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
      {
        path: 'tanques',
        element: <TankListPage />,
      },
      {
        path: 'fermentacao',
        element: <FermentationRecordsPage />,
      },
      {
        path: 'lotes',
        element: <BatchHistoryPage />,
      },
    ],
  },
])

export default router
