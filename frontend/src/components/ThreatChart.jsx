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
      border-violet-400/10
      bg-violet-400/[.03]
      px-2
      py-1
      font-mono
      text-[10px]
      text-violet-400/70
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

          {/* Violet gradient for primary threat activity */}

          <linearGradient
            id="phishingFill"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopColor="#8b5cf6"
              stopOpacity={0.28}
            />

            <stop
              offset="100%"
              stopColor="#8b5cf6"
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
          stroke="#71717a"
          tickLine={false}
          axisLine={false}
        />


        <YAxis
          stroke="#71717a"
          tickLine={false}
          axisLine={false}
          width={30}
        />


        <Tooltip
          contentStyle={{
            background: "#111116",
            border: "1px solid rgba(139,92,246,0.18)",
            borderRadius: 12,
            color: "#e8e5f5",
            boxShadow: "0 12px 35px rgba(0,0,0,0.35)"
          }}
          labelStyle={{
            color: "#a78bfa",
            fontWeight: 600
          }}
        />


        {/* Phishing - Primary Violet */}

        <Area
          type="monotone"
          dataKey="phishing"
          stroke="#8b5cf6"
          fill="url(#phishingFill)"
          strokeWidth={2}
        />


        {/* Impersonation - Secondary Teal */}

        <Area
          type="monotone"
          dataKey="impersonation"
          stroke="#2dd4bf"
          fill="none"
          strokeWidth={2}
        />


        {/* Account Takeover - Warning Amber */}

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
        bg-violet-400
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
        bg-teal-400
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
