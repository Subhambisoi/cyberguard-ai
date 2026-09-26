import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Recommendation({ recommendations = [] }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Recommended Response
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-amber-300">Action Required: Mitigate Threat Immediately</span>
        </div>

        <ul className="space-y-2 mb-4">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg transition text-xs uppercase tracking-wider">
        Execute Security Action
      </button>
    </div>
  );
}