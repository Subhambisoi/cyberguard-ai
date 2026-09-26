import React from 'react';
import { Activity, ShieldAlert, AlertTriangle, Flame } from 'lucide-react';
import { overview } from '../data/dummyData';

export default function OverviewCards() {
  const cards = [
    { title: "Total Events", value: overview.events, icon: Activity, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5" },
    { title: "Detected Threats", value: overview.threats, icon: ShieldAlert, color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" },
    { title: "High Risk", value: overview.highRisk, icon: AlertTriangle, color: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/5" },
    { title: "Critical Incidents", value: overview.critical, icon: Flame, color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5" }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">Security Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border ${card.border} ${card.bg} backdrop-blur-sm shadow-sm transition-all hover:border-slate-700`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {card.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}