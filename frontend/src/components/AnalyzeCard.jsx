import {
  ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";

export default function AnalyzeCard({
  title,
  description,
  icon: Icon,
  path,
  iconColor = "text-cyan-400",
  iconBg = "bg-cyan-400/10"
}) {
  return (
    <Link
      to={path}
      className="group rounded-2xl border border-slate-800 bg-[#07111f] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyber"
    >

      <div className="flex items-start justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>

        <ArrowRight
          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
          size={20}
        />

      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 text-xs font-medium text-cyan-400">
        Start Analysis →
      </div>

    </Link>
  );
}