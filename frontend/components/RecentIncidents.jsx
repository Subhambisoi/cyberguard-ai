import React from 'react';
import { Clock } from 'lucide-react';
import { incidents } from '../data/dummyData';

export default function RecentIncidents() {
  const getRiskBadge = (risk) => {
    switch (risk.toLowerCase()) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusBadge = (status) => {
    return status.toLowerCase() === 'blocked' 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
      : 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" /> Recent Incidents Log
        </h2>
        <span className="text-xs text-slate-400">Live Feed</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">Threat Type</th>
              <th className="py-3 px-4 font-semibold">Source</th>
              <th className="py-3 px-4 font-semibold">Risk Level</th>
              <th className="py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {incidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono text-slate-400">{inc.id}</td>
                <td className="py-3 px-4 font-semibold text-white">{inc.threat}</td>
                <td className="py-3 px-4 text-slate-300">{inc.source}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded border font-semibold uppercase ${getRiskBadge(inc.risk)}`}>
                    {inc.risk}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded border font-semibold uppercase ${getStatusBadge(inc.status)}`}>
                    {inc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}