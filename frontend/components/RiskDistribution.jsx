import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { riskDistributionData } from '../data/dummyData';

export default function RiskDistribution() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <PieChartIcon className="w-4 h-4 text-amber-400" /> Risk Distribution
        </h2>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {riskDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              formatter={(value) => <span className="text-xs text-slate-300">{value}</span>} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}