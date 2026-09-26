import React from 'react';
import { AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function ThreatResult({ result }) {
  if (!result) return null;

  return (
    <div className="bg-slate-900/80 border border-red-500/30 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" /> Threat Detected
          </h2>
          <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded text-xs font-bold text-red-400 uppercase tracking-widest">
            {result.riskLevel}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-xs text-slate-400 uppercase tracking-wide">Threat Classification</span>
          <div className="text-2xl font-black text-white tracking-wide mt-0.5">
            {result.threatType}
          </div>
        </div>

        {/* Risk Score Meter */}
        <div className="mb-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300 uppercase">Risk Score</span>
            <span className="text-sm font-bold text-red-400">{result.riskScore}/100</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${result.riskScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <span>AI Engine Confidence</span>
        <span className="font-semibold text-emerald-400">{result.confidence}% Match Accuracy</span>
      </div>
    </div>
  );
}