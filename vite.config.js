import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const isRestricted = process.env.VITE_RESTRICTED === 'true'

export default defineConfig({
  base: isRestricted ? '/consulta-cnpj/restrito/' : '/consulta-cnpj/',
  plugins: [react(), tailwindcss()],
})
