import { AlertTriangleIcon } from './icons'

export default function MeiExcludedNotice({ info }) {
  return (
    <div className="max-w-2xl mx-auto flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3">
      <AlertTriangleIcon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="text-sm">
        <p className="font-medium">
          {info?.razaoSocial
            ? `"${info.razaoSocial}" é um MEI (Microempreendedor Individual).`
            : 'Este CNPJ é de um MEI (Microempreendedor Individual).'}
        </p>
        <p className="mt-1 text-amber-700">
          Esta ferramenta não inclui empresas MEI na base de consulta.
        </p>
      </div>
    </div>
  )
}
