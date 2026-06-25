import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './shared/components/ui.css'
import './shared/components/dialog.css'
import './shared/components/forms.css'
import './shared/components/AppHeader.css'
import './shared/components/pageTransition.css'
import './shared/components/shimmer/shimmer.css'
import './shared/components/toast/toast.css'
import './shared/icons/icons.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
