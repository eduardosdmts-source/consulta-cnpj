export default function StatusBadge({ situacao, isAtiva }) {
  const classes = isAtiva
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-red-50 text-red-700 border-red-200'
  const dotClasses = isAtiva ? 'bg-emerald-500' : 'bg-red-500'

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${classes}`}>
      <span className={`w-2 h-2 rounded-full ${dotClasses}`} />
      {situacao}
    </span>
  )
}
