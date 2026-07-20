import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PasswordGate from './components/PasswordGate.jsx'

const isRestricted = import.meta.env.VITE_RESTRICTED === 'true'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isRestricted ? (
      <PasswordGate>
        <App />
      </PasswordGate>
    ) : (
      <App />
    )}
  </StrictMode>,
)
