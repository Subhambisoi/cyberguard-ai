import {
  ShieldAlert,
  ExternalLink
} from "lucide-react";

import { Link } from "react-router-dom";

function severityStyle(severity) {
  switch (severity) {
    case "Critical":
      return "bg-red-400/10 text-red-400 border-red-400/20";

    case "High":
      return "bg-orange-400/10 text-orange-400 border-orange-400/20";

    case "Medium":
      return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";

    default:
      return "bg-slate-400/10 text-slate-400 border-slate-400/20";
  }
}

function statusStyle(status) {
  if (status === "Blocked") {
    return "text-emerald-400";
  }

  if (status === "Under Review" || status === "Investigating") {
    return "text-yellow-400";
  }

  return "text-slate-400";
}

export default function IncidentTable({ incidents = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#07111f]">

      <div className="flex items-center justify-between border-b border-slate-800 p-5">

        <div>

          <h3 className="font-semibold text-white">
            Recent Incidents
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest detected security events
          </p>

        </div>

        <Link
          to="/incidents"
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          View All
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[750px] text-left">

          <thead className="border-b border-slate-800 bg-slate-900/40">

            <tr>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Incident
              </th>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Severity
              </th>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Confidence
              </th>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-medium text-slate-500">
                Time
              </th>

              <th />
            </tr>

          </thead>

          <tbody>

            {incidents.map((incident) => (

              <tr
                key={incident.id}
                className="border-b border-slate-800/70 transition hover:bg-slate-900/50"
              >

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-400/10">

                      <ShieldAlert
                        size={17}
                        className="text-red-400"
                      />

                    </div>

                    <div>

                      <p className="text-sm font-medium text-white">
                        {incident.id}
                      </p>

                      <p className="max-w-[180px] truncate text-xs text-slate-600">
                        {incident.target}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4 text-sm text-slate-400">
                  {incident.type}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${severityStyle(
                      incident.severity
                    )}`}
                  >
                    {incident.severity}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span className="text-sm font-semibold text-white">
                    {incident.confidence}%
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span
                    className={`text-xs font-medium ${statusStyle(
                      incident.status
                    )}`}
                  >
                    {incident.status}
                  </span>

                </td>

                <td className="px-5 py-4 text-xs text-slate-500">
                  {incident.time}
                </td>

                <td className="px-5 py-4">

                  <Link
                    to={`/incidents/${incident.id}`}
                    className="text-slate-500 hover:text-cyan-400"
                  >
                    <ExternalLink size={16} />
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}