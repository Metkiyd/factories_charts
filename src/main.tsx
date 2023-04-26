import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DetailsPage } from './pages/DetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'details/:factoryId/:month',
    element: <DetailsPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
