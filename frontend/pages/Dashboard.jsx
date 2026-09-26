import React, { useState } from 'react';
import Header from '../components/Header';
import OverviewCards from '../components/OverviewCards';
import ThreatDetector from '../components/ThreatDetector';
import ThreatResult from '../components/ThreatResult';
import RiskScore from '../components/RiskScore';
import Explanation from '../components/Explanation';
import Recommendation from '../components/Recommendation';
import RecentIncidents from '../components/RecentIncidents';
import ThreatTimeline from '../components/ThreatTimeline';
import RiskDistribution from '../components/RiskDistribution';
import { dummyThreatResult } from '../data/dummyData';

export default function Dashboard() {
  const [threatResult, setThreatResult] = useState(dummyThreatResult);

  const handleAnalyze = (type, content) => {
    // Simulating dynamic analysis update based on input
    setThreatResult({
      ...dummyThreatResult,
      threatType: type === 'url' ? 'MALICIOUS URL' : 'PHISHING',
      riskScore: Math.floor(Math.random() * (98 - 75 + 1)) + 75,
      confidence: Math.floor(Math.random() * (99 - 90 + 1)) + 90
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Security Summary Cards */}
        <OverviewCards />

        {/* Threat Detector & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThreatDetector onAnalyze={handleAnalyze} />
          <ThreatResult result={threatResult} />
        </div>

        {/* Explainable AI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RiskScore score={threatResult.riskScore} />
          <Explanation evidence={threatResult.evidence} explanation={threatResult.explanation} />
          <Recommendation recommendations={threatResult.recommendations} />
        </div>

        {/* Recent Incidents Log */}
        <RecentIncidents />

        {/* Analytics Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThreatTimeline />
          <RiskDistribution />
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        CYBERGUARD-AI DEFENSE CENTER &copy; 2026 &bull; Member 5 Frontend Dashboard Module
      </footer>
    </div>
  );
}