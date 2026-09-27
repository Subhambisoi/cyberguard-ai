import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import { threatActivity } from "../data/mockThreats";

export default function ThreatChart() {
  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-[#07111f] p-5">

      <div className="mb-5">

        <h3 className="text-base font-semibold text-white">
          Threat Activity
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Threat detections over the last 24 hours
        </p>

      </div>

      <div className="h-[280px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={threatActivity}>

            <defs>
              <linearGradient
                id="threatGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#07111f",
                border: "1px solid #1e293b",
                borderRadius: "10px",
                color: "#fff"
              }}
            />

            <Area
              type="monotone"
              dataKey="threats"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#threatGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}