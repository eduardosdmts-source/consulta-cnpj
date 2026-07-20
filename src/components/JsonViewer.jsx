import { useState } from 'react'
import { ChevronDownIcon, CodeIcon } from './icons'

export default function JsonViewer({ data }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-6 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <CodeIcon className="w-4 h-4 text-slate-500" />
          Ver estrutura de dados completa (JSON)
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <pre className="bg-slate-950 text-emerald-400 text-xs leading-relaxed p-4 overflow-x-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
