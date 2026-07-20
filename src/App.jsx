import { useState } from 'react'
import SearchBar from './components/SearchBar'
import EmptyState from './components/EmptyState'
import ErrorMessage from './components/ErrorMessage'
import SkeletonResult from './components/SkeletonResult'
import ResultCard from './components/ResultCard'
import SecondaryActivities from './components/SecondaryActivities'
import PartnersSection from './components/PartnersSection'
import JsonViewer from './components/JsonViewer'
import { onlyDigits } from './lib/format'

const API_BASE_URL = 'https://publica.cnpj.ws/cnpj'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function handleSearch() {
    const digits = onlyDigits(inputValue)

    if (digits.length !== 14) {
      setError('CNPJ inválido. Digite os 14 números do CNPJ.')
      setData(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/${digits}`)

      if (response.status === 404) {
        setData(null)
        setError('CNPJ não encontrado. Verifique o número digitado.')
        return
      }

      if (response.status === 400) {
        setData(null)
        setError('CNPJ inválido. Verifique se os números digitados estão corretos.')
        return
      }

      if (response.status === 429) {
        setData(null)
        setError('Muitas consultas em pouco tempo. Aguarde um instante e tente novamente.')
        return
      }

      if (!response.ok) {
        setData(null)
        setError('Não foi possível consultar o CNPJ. Tente novamente mais tarde.')
        return
      }

      const json = await response.json()
      setData(json)
    } catch {
      setData(null)
      setError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Consulta completa CNPJ
          </h1>
          <p className="mt-2 text-slate-500">
            Dados cadastrais, societários e fiscais em um único lugar (Use com responsabilidade e ética)
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <SearchBar
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSearch}
            loading={loading}
          />
          {error && <ErrorMessage message={error} />}
        </div>

        {loading && <SkeletonResult />}

        {!loading && !error && !data && <EmptyState />}

        {!loading && data && (
          <>
            <ResultCard data={data} />
            <SecondaryActivities atividades={data.estabelecimento?.atividades_secundarias} />
            <PartnersSection socios={data.socios} />
            <JsonViewer data={data} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
