import {
  Filter,
  Search,
  ShieldAlert
} from "lucide-react";

import { useMemo, useState } from "react";

import { mockIncidents } from "../data/mockIncidents";

export default function Incidents() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");

  const filteredIncidents = useMemo(() => {

    return mockIncidents.filter((incident) => {

      const matchesSearch =
        incident.id.toLowerCase().includes(search.toLowerCase()) ||
        incident.type.toLowerCase().includes(search.toLowerCase()) ||
        incident.target.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity =
        severity === "All" ||
        incident.severity === severity;

      return matchesSearch && matchesSeverity;

    });

  }, [search, severity]);

  function severityClass(value) {

    if (value === "Critical") {
      return "bg-red-400/10 text-red-400 border-red-400/20";
    }

    if (value === "High") {
      return "bg-orange-400/10 text-orange-400 border-orange-400/20";
    }

    if (value === "Medium") {
      return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
    }

    return "bg-slate-400/10 text-slate-400 border-slate-400/20";
  }

  return (
    <div className="cyber-grid min-h-full">

      <div className="mx-auto max-w-[1600px]">

        {/* Heading */}

        <div className="mb-6">

          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Security Events
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Incidents
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and investigate detected security incidents.
          </p>

        </div>

        {/* Filters */}

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#07111f] p-4 md:flex-row">

          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4">

            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incidents..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
            />

          </div>

          <div className="flex items-center gap-2">

            <Filter
              size={17}
              className="text-slate-500"
            />

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 outline-none"
            >
              <option value="All">
                All Severity
              </option>

              <option value="Critical">
                Critical
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>
            </select>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#07111f]">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px] text-left">

              <thead className="border-b border-slate-800 bg-slate-900/50">

                <tr>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    ID
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Threat
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Source
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Target
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Severity
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Confidence
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs text-slate-500">
                    Time
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredIncidents.map((incident) => (

                  <tr
                    key={incident.id}
                    className="border-b border-slate-800/70 hover:bg-slate-900/50"
                  >

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2">

                        <ShieldAlert
                          size={17}
                          className="text-red-400"
                        />

                        <span className="text-sm font-medium text-white">
                          {incident.id}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-5 text-sm text-slate-300">
                      {incident.type}
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500">
                      {incident.source}
                    </td>

                    <td className="max-w-[230px] truncate px-5 py-5 text-sm text-slate-400">
                      {incident.target}
                    </td>

                    <td className="px-5 py-5">

                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] ${severityClass(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>

                    </td>

                    <td className="px-5 py-5 text-sm font-semibold text-white">
                      {incident.confidence}%
                    </td>

                    <td className="px-5 py-5">

                      <span className="text-xs text-emerald-400">
                        {incident.status}
                      </span>

                    </td>

                    <td className="px-5 py-5 text-xs text-slate-500">
                      {incident.time}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredIncidents.length === 0 && (

            <div className="p-10 text-center">

              <p className="text-sm text-slate-500">
                No incidents found.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}