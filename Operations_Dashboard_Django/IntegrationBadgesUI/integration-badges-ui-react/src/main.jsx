import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('Operations_WebApp_IntegrationBadges')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
