import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";


const COLORS = [
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b"
];


export default function ThreatDistribution({
  data
}) {

  return (
    <div className="glass rounded-2xl p-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <p className="font-semibold text-white">
            Threat Distribution
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Current demo classification mix
          </p>

        </div>


        <span
          className="
          rounded-lg
          border
          border-violet-400/10
          bg-violet-400/5
          px-2
          py-1
          font-mono
          text-[10px]
          font-semibold
          text-violet-400
          "
        >
          MOCK
        </span>

      </div>


      {/* CHART */}

      <div className="relative mt-4 h-[235px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >

              {data.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>


            <Tooltip
              contentStyle={{
                background: "#111116",
                border: "1px solid rgba(139,92,246,0.18)",
                borderRadius: 12,
                color: "#e4e4e7"
              }}
            />

          </PieChart>

        </ResponsiveContainer>


        {/* CENTER VALUE */}

        <div
          className="
          pointer-events-none
          absolute
          inset-0
          grid
          place-items-center
          "
        >

          <div className="text-center">

            <div
              className="
              text-2xl
              font-black
              text-white
              "
            >
              347
            </div>

            <div
              className="
              text-[10px]
              uppercase
              tracking-widest
              text-violet-400
              "
            >
              Threats
            </div>

          </div>

        </div>

      </div>


      {/* DISTRIBUTION LIST */}

      <div className="space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="
            flex
            items-center
            justify-between
            text-xs
            "
          >

            <span
              className="
              flex
              items-center
              gap-2
              text-slate-400
              "
            >

              <i
                className="
                h-2
                w-2
                rounded-full
                "
                style={{
                  background:
                    COLORS[
                      index % COLORS.length
                    ]
                }}
              />

              {item.name}

            </span>


            <span
              className="
              font-mono
              text-slate-300
              "
            >
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

