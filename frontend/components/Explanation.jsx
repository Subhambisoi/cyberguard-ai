import React from 'react';
import { Brain, CheckCircle2 } from 'lucide-react';

export default function Explanation({ evidence = [], explanation = "" }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" /> Explainable AI Analysis
          </h2>
        </div>

        <div className="space-y-2 mb-4">
          {evidence.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">AI Logic Summary</span>
        <p className="text-xs text-slate-300 leading-relaxed">
          {explanation}
        </p>
      </div>
    </div>
  );
}