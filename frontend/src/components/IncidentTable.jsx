import {
  ArrowUpRight
} from "lucide-react";

import {
  riskClass
} from "../utils/formatters";


export default function IncidentTable({
  incidents,
  compact = false
}) {

  const rows =
    compact
      ? incidents.slice(0, 4)
      : incidents;


  return (

    <div className="glass overflow-hidden rounded-2xl">

      <div
        className="
        border-b
        border-white/10
        px-5
        py-4
        "
      >

        <p className="font-semibold text-white">

          Recent Security Incidents

        </p>

        <p className="mt-1 text-xs text-slate-500">

          Demo records for the command center

        </p>

      </div>


      <div className="overflow-x-auto">

        <table
          className="
          w-full
          min-w-[760px]
          text-left
          "
        >

          <thead
            className="
            bg-white/[.02]
            text-[10px]
            uppercase
            tracking-wider
            text-slate-600
            "
          >

            <tr>

              <th className="px-5 py-3">
                Incident
              </th>

              <th className="px-5 py-3">
                Type
              </th>

              <th className="px-5 py-3">
                Source
              </th>

              <th className="px-5 py-3">
                Risk
              </th>

              <th className="px-5 py-3">
                Status
              </th>

              <th className="px-5 py-3">
                Time
              </th>

            </tr>

          </thead>


          <tbody
            className="
            divide-y
            divide-white/5
            "
          >

            {rows.map(
              item => (

                <tr
                  key={item.id}
                  className="
                  text-sm
                  transition
                  hover:bg-white/[.025]
                  "
                >

                  <td
                    className="
                    px-5
                    py-4
                    font-mono
                    text-xs
                    text-cyan-300
                    "
                  >
                    {item.id}
                  </td>


                  <td
                    className="
                    px-5
                    py-4
                    font-semibold
                    text-slate-200
                    "
                  >
                    {item.type}
                  </td>


                  <td
                    className="
                    px-5
                    py-4
                    text-slate-500
                    "
                  >
                    {item.source}
                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`risk-pill ${riskClass(
                        item.risk
                      )}`}
                    >
                      {item.risk}
                    </span>

                  </td>


                  <td
                    className="
                    px-5
                    py-4
                    text-slate-400
                    "
                  >
                    {item.status}
                  </td>


                  <td
                    className="
                    px-5
                    py-4
                    text-slate-500
                    "
                  >
                    {item.time}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>


      {compact && (

        <div
          className="
          border-t
          border-white/10
          px-5
          py-3
          "
        >

          <a
            href="/incidents"
            className="
            inline-flex
            items-center
            gap-1
            text-xs
            font-bold
            text-cyan-400
            "
          >

            View all incidents

            <ArrowUpRight size={13} />

          </a>

        </div>

      )}

    </div>

  );

}