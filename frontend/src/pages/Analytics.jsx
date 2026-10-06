import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import {
  analytics,
  threatActivity
} from "../data/dummyData";


export default function Analytics() {

  const total =
    threatActivity.reduce(
      (
        total,
        item
      ) =>

        total +
        item.phishing +
        item.impersonation +
        item.takeover,

      0
    );


  return (

    <div
      className="
      mx-auto
      max-w-[1500px]
      space-y-6
      "
    >

      <div>

        <div className="eyebrow">

          Security Intelligence

        </div>


        <h1
          className="
          page-title
          mt-2
          "
        >

          Analytics

        </h1>


        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >

          Visualize demo threat trends
          and prepare the UI for future
          live telemetry.

        </p>

      </div>


      <div
        className="
        grid
        gap-4
        md:grid-cols-3
        "
      >

        <div className="glass rounded-2xl p-5">

          <p
            className="
            text-xs
            uppercase
            tracking-wider
            text-slate-600
            "
          >

            7-day activity

          </p>


          <p
            className="
            mt-2
            text-3xl
            font-black
            text-white
            "
          >

            {total}

          </p>

        </div>


        <div className="glass rounded-2xl p-5">

          <p
            className="
            text-xs
            uppercase
            tracking-wider
            text-slate-600
            "
          >

            Peak category

          </p>


          <p
            className="
            mt-2
            text-3xl
            font-black
            text-white
            "
          >

            Phishing

          </p>

        </div>


        <div className="glass rounded-2xl p-5">

          <p
            className="
            text-xs
            uppercase
            tracking-wider
            text-slate-600
            "
          >

            Data source

          </p>


          <p
            className="
            mt-2
            text-3xl
            font-black
            text-white
            "
          >

            Mock

          </p>

        </div>

      </div>


      <div className="glass rounded-2xl p-5">

        <p className="font-semibold text-white">

          Monthly Threat Growth

        </p>


        <p
          className="
          mt-1
          text-xs
          text-slate-500
          "
        >

          Illustrative frontend dataset

        </p>


        <div
          className="
          mt-6
          h-[330px]
          "
        >

          <ResponsiveContainer>

            <BarChart
              data={
                analytics.monthly
              }
            >

              <CartesianGrid
                stroke="#ffffff10"
                vertical={false}
              />


              <XAxis
                dataKey="month"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />


              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />


              <Tooltip
                contentStyle={{
                  background: "#091525",
                  border:
                    "1px solid #ffffff15",
                  borderRadius: 12
                }}
              />


              <Bar
                dataKey="threats"
                fill="#22d3ee"
                radius={[
                  6,
                  6,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}