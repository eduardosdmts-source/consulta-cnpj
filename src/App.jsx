import { useState } from 'react'
import SearchBar from './components/SearchBar'
import EmptyState from './components/EmptyState'
import ErrorMessage from './components/ErrorMessage'
import SkeletonResult from './components/SkeletonResult'
import ResultCard from './components/ResultCard'
import SecondaryActivities from './components/SecondaryActivities'
import PartnersSection from './components/PartnersSection'
import DebtCheckLinks from './components/DebtCheckLinks'
import MeiExcludedNotice from './components/MeiExcludedNotice'
import AdvancedSearch from './components/AdvancedSearch'
import JsonViewer from './components/JsonViewer'
import { fetchCNPJ, ApiError } from './lib/api'
import { isMEI } from './lib/tax'
import siteConfig from '../site.config.mjs'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [meiNotice, setMeiNotice] = useState(null)

  async function handleSearch() {
    setLoading(true)
    setError(null)
    setMeiNotice(null)
    setData(null)

    try {
      const json = await fetchCNPJ(inputValue)

      if (isMEI(json)) {
        setMeiNotice({ razaoSocial: json.razao_social })
        return
      }

      setData(json)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">{siteConfig.siteName}</h1>
          <p className="mt-2 text-slate-500">{siteConfig.subtitle}</p>
        </header>

        <div className="flex flex-col gap-3">
          <SearchBar
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSearch}
            loading={loading}
          />
          {error && <ErrorMessage message={error} />}
          {!loading && meiNotice && <MeiExcludedNotice info={meiNotice} />}
        </div>

        {loading && <SkeletonResult />}

        {!loading && !error && !meiNotice && !data && <EmptyState />}

        {!loading && data && (
          <>
            <ResultCard data={data} />
            <SecondaryActivities atividades={data.estabelecimento?.atividades_secundarias} />
            <PartnersSection socios={data.socios} />
            <DebtCheckLinks />
            <JsonViewer data={data} />
          </>
        )}

        <AdvancedSearch />
      </div>
    </div>
  )
}

export default App
