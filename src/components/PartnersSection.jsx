import { UsersIcon } from './icons'

function getInitial(name) {
  if (!name) return '?'
  return name.trim().charAt(0).toUpperCase()
}

export default function PartnersSection({ socios }) {
  if (!socios || socios.length === 0) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <UsersIcon className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg font-semibold text-slate-900">Quadro societário</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socios.map((socio, index) => {
          const nome = socio.nome_socio || socio.nome || 'Sócio não identificado'
          const qualificacao = socio.qualificacao_socio?.descricao || '—'
          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="shrink-0 w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
                {getInitial(nome)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{nome}</p>
                <p className="text-xs text-slate-500">{qualificacao}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
