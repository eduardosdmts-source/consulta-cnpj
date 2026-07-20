export default function InfoItem({ icon, label, value, wide = false }) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-slate-50/60 p-4 flex gap-3 ${
        wide ? 'sm:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div className="shrink-0 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-slate-800 break-words">{value || '—'}</p>
      </div>
    </div>
  )
}
