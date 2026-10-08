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

    <div
      className="
      glass
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      "
    >

      {/* HEADER */}

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


      {/* TABLE */}

      <div className="overflow-x-auto">

        <table
          className="
          w-full
          min-w-[760px]
          text-left
          "
        >

          {/* TABLE HEADER */}

          <thead
            className="
            bg-violet-500/5
            text-[10px]
            uppercase
            tracking-wider
            text-slate-500
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


          {/* TABLE BODY */}

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
                  duration-150
                  hover:bg-violet-500/5
                  "
                >

                  {/* INCIDENT ID */}

                  <td
                    className="
                    px-5
                    py-4
                    font-mono
                    text-xs
                    font-semibold
                    text-violet-300
                    "
                  >

                    {item.id}

                  </td>


                  {/* TYPE */}

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


                  {/* SOURCE */}

                  <td
                    className="
                    px-5
                    py-4
                    text-slate-500
                    "
                  >

                    {item.source}

                  </td>


                  {/* RISK */}

                  <td className="px-5 py-4">

                    <span
                      className={`risk-pill ${riskClass(
                        item.risk
                      )}`}
                    >

                      {item.risk}

                    </span>

                  </td>


                  {/* STATUS */}

                  <td
                    className="
                    px-5
                    py-4
                    text-slate-400
                    "
                  >

                    {item.status}

                  </td>


                  {/* TIME */}

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


      {/* VIEW ALL */}

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
            text-violet-400
            hover:text-violet-300
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
