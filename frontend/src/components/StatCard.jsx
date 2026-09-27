export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-cyan-400",
  iconBg = "bg-cyan-400/10",
  trend
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-[#07111f] p-5 transition hover:border-slate-700 hover:shadow-cyber">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <p className="text-xs text-slate-600">
          {subtitle}
        </p>

        {trend && (
          <span className="text-xs font-medium text-emerald-400">
            {trend}
          </span>
        )}

      </div>

    </div>
  );
}