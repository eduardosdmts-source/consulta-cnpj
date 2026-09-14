import { AlertTriangleIcon, ExternalLinkIcon } from './icons'
import { DEBT_CHECK_LINKS } from '../lib/tax'

export default function DebtCheckLinks() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-semibold text-slate-900">Situação fiscal e dívida ativa</h2>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        A base pública de CNPJ não informa pendências financeiras. Não existe API pública
        gratuita para consultar dívida ativa em tempo real — para verificar se há débitos
        perante a Receita Federal/PGFN, use os canais oficiais do governo:
      </p>
      <ul className="space-y-2">
        {DEBT_CHECK_LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2"
            >
              {link.label}
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
