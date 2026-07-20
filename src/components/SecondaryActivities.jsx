import { ListIcon } from './icons'

export default function SecondaryActivities({ atividades }) {
  if (!atividades || atividades.length === 0) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <ListIcon className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg font-semibold text-slate-900">Atividades secundárias</h2>
      </div>
      <ul className="space-y-2">
        {atividades.map((atividade, index) => (
          <li
            key={atividade.subclasse ?? atividade.id ?? index}
            className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm"
          >
            <span className="shrink-0 font-mono text-slate-400">
              {atividade.subclasse ?? atividade.codigo ?? atividade.id ?? '—'}
            </span>
            <span className="text-slate-700">{atividade.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
