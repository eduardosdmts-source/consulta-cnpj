import { useState } from 'react'
import { ChevronDownIcon, ListIcon, ExternalLinkIcon } from './icons'
import { fetchCNPJ } from '../lib/api'
import { onlyDigits, formatCNPJDigits, getSituacaoCadastral, isSituacaoAtiva, getAtividadePrincipal } from '../lib/format'
import {
  isMEI,
  getRegimeTributario,
  getRegimeLabel,
  REGIME_SIMPLES,
  REGIME_FORA_SIMPLES,
  DEBT_CHECK_LINKS,
} from '../lib/tax'
import StatusBadge from './StatusBadge'

const MAX_BATCH = 20
const DELAY_BETWEEN_REQUESTS_MS = 250

function splitCNPJs(text) {
  const digitsList = text
    .split(/[\n,;]+/)
    .map((item) => onlyDigits(item))
    .filter((item) => item.length === 14)
  return [...new Set(digitsList)]
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function AdvancedSearch() {
  const [open, setOpen] = useState(false)
  const [rawInput, setRawInput] = useState('')
  const [cnaeFilter, setCnaeFilter] = useState('')
  const [regimeFilter, setRegimeFilter] = useState('todos')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [results, setResults] = useState([])
  const [meiExcludedCount, setMeiExcludedCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [searched, setSearched] = useState(false)

  const cnpjs = splitCNPJs(rawInput)

  async function handleBatchSearch() {
    if (cnpjs.length === 0) return
    const list = cnpjs.slice(0, MAX_BATCH)

    setLoading(true)
    setSearched(true)
    setResults([])
    setMeiExcludedCount(0)
    setErrorCount(0)
    setProgress({ done: 0, total: list.length })

    const collected = []
    let meiCount = 0
    let errCount = 0

    for (let i = 0; i < list.length; i += 1) {
      try {
        const data = await fetchCNPJ(list[i])
        if (isMEI(data)) {
          meiCount += 1
        } else {
          collected.push(data)
        }
      } catch {
        errCount += 1
      }
      setProgress({ done: i + 1, total: list.length })
      if (i < list.length - 1) await delay(DELAY_BETWEEN_REQUESTS_MS)
    }

    setResults(collected)
    setMeiExcludedCount(meiCount)
    setErrorCount(errCount)
    setLoading(false)
  }

  const filtered = results.filter((item) => {
    const regime = getRegimeTributario(item)
    if (regimeFilter !== 'todos' && regime !== regimeFilter) return false

    const needle = cnaeFilter.trim().toLowerCase()
    if (needle) {
      const principal = item.estabelecimento?.atividade_principal
      const codigo = String(principal?.subclasse ?? principal?.id ?? '').toLowerCase()
      const descricao = (principal?.descricao || '').toLowerCase()
      if (!codigo.includes(needle) && !descricao.includes(needle)) return false
    }
    return true
  })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-6 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <ListIcon className="w-4 h-4 text-slate-500" />
          Consulta avançada: filtrar por CNAE e regime tributário (múltiplos CNPJs)
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 border-t border-slate-100 pt-6 flex flex-col gap-5">
          <p className="text-sm text-slate-500">
            A API pública não permite buscar diretamente por CNAE — ela só consulta um CNPJ por
            vez. Cole abaixo os CNPJs que deseja verificar (um por linha, vírgula ou ponto e
            vírgula) e, depois de consultados, filtre os resultados por CNAE e por regime
            tributário. Empresas MEI são sempre excluídas dos resultados. Máximo de {MAX_BATCH}{' '}
            CNPJs por consulta.
          </p>

          <textarea
            value={rawInput}
            onChange={(event) => setRawInput(event.target.value)}
            rows={4}
            placeholder={'00.000.000/0000-00\n11.111.111/0001-11\n...'}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition font-mono text-sm"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={cnaeFilter}
              onChange={(event) => setCnaeFilter(event.target.value)}
              placeholder="Filtrar por CNAE (código ou descrição) — opcional"
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
            />
            <select
              value={regimeFilter}
              onChange={(event) => setRegimeFilter(event.target.value)}
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
            >
              <option value="todos">Todos os regimes (exceto MEI)</option>
              <option value={REGIME_SIMPLES}>Simples Nacional</option>
              <option value={REGIME_FORA_SIMPLES}>Fora do Simples (Lucro Presumido ou Real)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleBatchSearch}
            disabled={loading || cnpjs.length === 0}
            className="self-start px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium shadow-sm hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading
              ? `Consultando ${progress.done}/${progress.total}...`
              : `Consultar ${cnpjs.length || ''} CNPJ${cnpjs.length === 1 ? '' : 's'}`}
          </button>

          {searched && !loading && (
            <p className="text-xs text-slate-400">
              {results.length + meiExcludedCount + errorCount} consultados · {meiExcludedCount}{' '}
              MEI excluídos · {errorCount} não encontrados/com erro · {filtered.length} exibidos
              após filtros
            </p>
          )}

          {searched && !loading && filtered.length > 0 && (
            <div className="flex flex-col gap-3">
              {filtered.map((item) => {
                const estabelecimento = item.estabelecimento || {}
                const situacao = getSituacaoCadastral(estabelecimento)
                const ativa = isSituacaoAtiva(estabelecimento)
                const regime = getRegimeTributario(item)
                return (
                  <div
                    key={estabelecimento.cnpj}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col gap-2"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{item.razao_social}</p>
                        <p className="text-xs text-slate-500 font-mono">
                          {formatCNPJDigits(estabelecimento.cnpj)}
                        </p>
                      </div>
                      <StatusBadge situacao={situacao} isAtiva={ativa} />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                        {getRegimeLabel(regime)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                        {getAtividadePrincipal(item)}
                      </span>
                    </div>
                    <a
                      href={DEBT_CHECK_LINKS[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2 w-fit"
                    >
                      Verificar dívida ativa (PGFN)
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                )
              })}
            </div>
          )}

          {searched && !loading && filtered.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma empresa encontrada com os filtros aplicados.</p>
          )}
        </div>
      )}
    </div>
  )
}
