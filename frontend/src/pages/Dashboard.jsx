import {
  Activity,
  AlertTriangle,
  Ban,
  ShieldCheck
} from "lucide-react";

import StatCard from "../components/StatCard";
import ThreatChart from "../components/ThreatChart";
import ThreatDistribution from "../components/ThreatDistribution";
import IncidentTable from "../components/IncidentTable";

import { mockIncidents } from "../data/mockIncidents";

export default function Dashboard() {
  return (
    <div className="cyber-grid min-h-full">

      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* Page heading */}

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Security Overview
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Command Center
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor cyber threats and security incidents in real time.
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">

            <span className="status-dot bg-emerald-400" />

            Monitoring Active

          </div>

        </div>

        {/* Stats */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Events"
            value="12,847"
            subtitle="Events processed"
            trend="+12.4%"
            icon={Activity}
          />

          <StatCard
            title="Threats Detected"
            value="342"
            subtitle="Potential threats"
            trend="+8.7%"
            icon={AlertTriangle}
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
          />

          <StatCard
            title="Critical Threats"
            value="27"
            subtitle="Require attention"
            icon={ShieldCheck}
            iconColor="text-red-400"
            iconBg="bg-red-400/10"
          />

          <StatCard
            title="Threats Blocked"
            value="296"
            subtitle="Automatically blocked"
            trend="86.5%"
            icon={Ban}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-400/10"
          />

        </div>

        {/* Charts */}

        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">

          <ThreatChart />

          <ThreatDistribution />

        </div>

        {/* Incidents */}

        <IncidentTable incidents={mockIncidents.slice(0, 5)} />

      </div>

    </div>
  );
}