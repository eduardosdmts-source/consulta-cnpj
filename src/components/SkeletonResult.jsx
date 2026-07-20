function Block({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
}

export default function SkeletonResult() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <Block className="h-4 w-24 mb-4" />
      <Block className="h-7 w-2/3 mb-2" />
      <Block className="h-4 w-1/3 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-100 p-4">
            <Block className="h-3 w-1/2 mb-3" />
            <Block className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
