import { FileSearchIcon } from './icons'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400">
      <FileSearchIcon className="w-12 h-12 mb-4" />
      <p className="text-slate-500">Digite um CNPJ acima para ver os dados completos.</p>
    </div>
  )
}
