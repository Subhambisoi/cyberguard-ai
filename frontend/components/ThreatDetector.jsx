import React, { useState } from 'react';
import { MessageSquare, Link as LinkIcon, Image as ImageIcon, Mic, Search, Upload } from 'lucide-react';

export default function ThreatDetector({ onAnalyze }) {
  const [activeTab, setActiveTab] = useState('message');
  const [inputData, setInputData] = useState({
    message: "Your account has been suspended due to unauthorized login attempts. Click here immediately to verify your account: https://secure-login-update.com",
    url: "https://example.com/login-verify",
    image: null,
    audio: null
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    onAnalyze(activeTab, inputData[activeTab]);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-400" /> Threat Detection Interface
        </h2>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 mb-4">
        <button
          onClick={() => handleTabChange('message')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${activeTab === 'message' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Message
        </button>
        <button
          onClick={() => handleTabChange('url')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${activeTab === 'url' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <LinkIcon className="w-3.5 h-3.5" /> URL
        </button>
        <button
          onClick={() => handleTabChange('image')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${activeTab === 'image' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Image
        </button>
        <button
          onClick={() => handleTabChange('audio')}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-md transition ${activeTab === 'audio' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Mic className="w-3.5 h-3.5" /> Audio
        </button>
      </div>

      {/* Input Form Area */}
      <form onSubmit={handleRunAnalysis} className="flex flex-col flex-grow justify-between space-y-4">
        {activeTab === 'message' && (
          <div className="flex flex-col flex-grow">
            <label className="text-xs text-slate-400 mb-1.5 font-medium">Suspicious Text / Email Content:</label>
            <textarea
              rows={5}
              value={inputData.message}
              onChange={(e) => setInputData({...inputData, message: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition resize-none"
              placeholder="Paste email, SMS or chat log here..."
            />
          </div>
        )}

        {activeTab === 'url' && (
          <div className="flex flex-col flex-grow">
            <label className="text-xs text-slate-400 mb-1.5 font-medium">Suspicious Target URL:</label>
            <input
              type="text"
              value={inputData.url}
              onChange={(e) => setInputData({...inputData, url: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
              placeholder="https://example.com/login"
            />
          </div>
        )}

        {activeTab === 'image' && (
          <div className="flex flex-col flex-grow items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-6 bg-slate-950 hover:border-slate-700 transition cursor-pointer">
            <Upload className="w-8 h-8 text-slate-500 mb-2" />
            <p className="text-sm font-medium text-slate-300">Upload Image Sample</p>
            <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG (Screenshots / QR Phishing)</p>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="flex flex-col flex-grow items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-6 bg-slate-950 hover:border-slate-700 transition cursor-pointer">
            <Mic className="w-8 h-8 text-slate-500 mb-2" />
            <p className="text-sm font-medium text-slate-300">Upload Audio Sample</p>
            <p className="text-xs text-slate-500 mt-1">Supports MP3, WAV (Deepfake Voice Scans)</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
        >
          <Search className="w-4 h-4" /> Analyze Threat
        </button>
      </form>
    </div>
  );
}