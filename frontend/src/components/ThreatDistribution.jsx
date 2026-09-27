import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

import { threatDistribution } from "../data/mockThreats";

const COLORS = [
  "#22d3ee",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#64748b"
];

export default function ThreatDistribution() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-5">

      <div className="mb-2">

        <h3 className="text-base font-semibold text-white">
          Threat Distribution
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Detected threat categories
        </p>

      </div>

      <div className="h-[230px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={threatDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >

              {threatDistribution.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#07111f",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                color: "#fff"
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="space-y-3">

        {threatDistribution.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-2">

              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: COLORS[index]
                }}
              />

              <span className="text-xs text-slate-400">
                {item.name}
              </span>

            </div>

            <span className="text-xs font-semibold text-white">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}