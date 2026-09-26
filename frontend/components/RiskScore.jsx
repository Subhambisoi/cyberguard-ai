import React from 'react';
import { Gauge } from 'lucide-react';

export default function RiskScore({ score = 87 }) {
  const getLevel = (s) => {
    if (s <= 20) return { label: "SAFE", color: "text-emerald-400", bg: "bg-emerald-500" };
    if (s <= 40) return { label: "LOW RISK", color: "text-blue-400", bg: "bg-blue-500" };
    if (s <= 60) return { label: "MEDIUM RISK", color: "text-amber-400", bg: "bg-amber-500" };
    if (s <= 80) return { label: "HIGH RISK", color: "text-orange-400", bg: "bg-orange-500" };
    return { label: "CRITICAL RISK", color: "text-red-500", bg: "bg-red-500" };
  };

  const currentLevel = getLevel(score);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-blue-400" /> Risk Evaluation
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <div className="text-4xl font-black text-white tracking-tight mb-1">
          {score} <span className="text-sm font-medium text-slate-500">/100</span>
        </div>
        <div className={`text-xs font-bold px-3 py-1 rounded-full ${currentLevel.bg}/10 ${currentLevel.color} border border-current/20 uppercase tracking-widest mt-1`}>
          {currentLevel.label}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-slate-500 font-semibold mb-1">
          <span>0 (Safe)</span>
          <span>50</span>
          <span>100 (Critical)</span>
        </div>
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className={`h-full rounded-full ${currentLevel.bg} transition-all duration-500`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}