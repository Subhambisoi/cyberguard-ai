import {
  Activity,
  AlertTriangle,
  BarChart3,
  ShieldCheck
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import StatCard from "../components/StatCard";

import { analyticsData } from "../data/mockThreats";

export default function Analytics() {
  return (
    <div className="cyber-grid min-h-full">

      <div className="mx-auto max-w-[1600px] space-y-6">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Security Intelligence
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Analyze threat trends and detection performance.
          </p>

        </div>

        {/* Stats */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Scans"
            value="12,847"
            subtitle="All analysis events"
            icon={Activity}
          />

          <StatCard
            title="Threats Detected"
            value="342"
            subtitle="Detected threats"
            icon={AlertTriangle}
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
          />

          <StatCard
            title="Avg. Confidence"
            value="91%"
            subtitle="Detection confidence"
            icon={BarChart3}
            iconColor="text-purple-400"
            iconBg="bg-purple-400/10"
          />

          <StatCard
            title="Blocked"
            value="296"
            subtitle="Threats prevented"
            icon={ShieldCheck}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-400/10"
          />

        </div>

        {/* Chart */}

        <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-5">

          <div className="mb-6">

            <h3 className="font-semibold text-white">
              Threat Trends
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Monthly detection distribution
            </p>

          </div>

          <div className="h-[380px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={analyticsData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
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
                    backgroundColor: "#07111f",
                    border: "1px solid #1e293b",
                    borderRadius: "10px"
                  }}
                />

                <Legend />

                <Bar
                  dataKey="phishing"
                  name="Phishing"
                  fill="#22d3ee"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="maliciousUrl"
                  name="Malicious URL"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="deepfake"
                  name="Deepfake"
                  fill="#a855f7"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}