import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { timelineData } from '../data/dummyData';

export default function ThreatTimeline() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <LineChartIcon className="w-4 h-4 text-blue-400" /> Threat Timeline (Hourly)
        </h2>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="threats" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}