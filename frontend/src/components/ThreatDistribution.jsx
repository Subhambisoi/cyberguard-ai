import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";


const COLORS = [
  "#22d3ee",
  "#818cf8",
  "#f59e0b"
];


export default function ThreatDistribution({
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


      <div className="relative mt-4 h-[235px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
            >

              {data.map(
                (_, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>


            <Tooltip
              contentStyle={{
                background: "#091525",
                border: "1px solid #ffffff15",
                borderRadius: 12
              }}
            />

          </PieChart>

        </ResponsiveContainer>


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
              text-slate-600
              "
            >
              Threats
            </div>

          </div>

        </div>

      </div>


      <div className="space-y-3">

        {data.map(
          (item, index) => (

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
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      COLORS[
                        index %
                        COLORS.length
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

          )
        )}

      </div>

    </div>

  );

}