import { SearchIcon } from './icons'
import { maskCNPJ } from '../lib/format'

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  function handleChange(event) {
    onChange(maskCNPJ(event.target.value))
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="00.000.000/0000-00"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium shadow-sm hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition whitespace-nowrap"
      >
        {loading ? 'Consultando...' : 'Consultar'}
      </button>
    </div>
  )
}
