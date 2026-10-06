import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";


export default function ThreatChart({
  data
}) {

  return (

    <div className="glass rounded-2xl p-5">

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

          <p
            className="
            font-semibold
            text-white
            "
          >
            Threat Activity
          </p>

          <p
            className="
            mt-1
            text-xs
            text-slate-500
            "
          >
            Demo telemetry over the last 7 days
          </p>

        </div>


        <span
          className="
          rounded-lg
          border
          border-white/10
          px-2
          py-1
          font-mono
          text-[10px]
          text-slate-500
          "
        >
          MOCK
        </span>

      </div>


      <div className="mt-6 h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="phishingFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.28}
                />

                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>


            <CartesianGrid
              stroke="#ffffff10"
              vertical={false}
            />


            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />


            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              width={30}
            />


            <Tooltip
              contentStyle={{
                background: "#091525",
                border: "1px solid #ffffff15",
                borderRadius: 12
              }}
            />


            <Area
              type="monotone"
              dataKey="phishing"
              stroke="#22d3ee"
              fill="url(#phishingFill)"
              strokeWidth={2}
            />


            <Area
              type="monotone"
              dataKey="impersonation"
              stroke="#818cf8"
              fill="none"
              strokeWidth={2}
            />


            <Area
              type="monotone"
              dataKey="takeover"
              stroke="#f59e0b"
              fill="none"
              strokeWidth={2}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>


      <div
        className="
        mt-2
        flex
        gap-5
        text-[11px]
        text-slate-500
        "
      >

        <span>

          <i
            className="
            mr-1.5
            inline-block
            h-2
            w-2
            rounded-full
            bg-cyan-400
            "
          />

          Phishing

        </span>


        <span>

          <i
            className="
            mr-1.5
            inline-block
            h-2
            w-2
            rounded-full
            bg-indigo-400
            "
          />

          Impersonation

        </span>


        <span>

          <i
            className="
            mr-1.5
            inline-block
            h-2
            w-2
            rounded-full
            bg-amber-400
            "
          />

          Account Takeover

        </span>

      </div>

    </div>

  );

}