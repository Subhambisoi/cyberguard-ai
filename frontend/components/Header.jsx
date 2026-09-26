import React from 'react';
import { Shield, Bell, Settings, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
          <Shield className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white flex items-center gap-2">
            CYBERGUARD-AI <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-normal">SOC v2.4</span>
          </h1>
          <p className="text-xs text-slate-400">AI CYBER DEFENSE CENTER</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">● System Safe</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}