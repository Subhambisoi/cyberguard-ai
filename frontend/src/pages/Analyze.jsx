import {
  AudioLines,
  Image,
  Link2,
  Mail
} from "lucide-react";

import AnalyzeCard from "../components/AnalyzeCard";

export default function Analyze() {
  return (
    <div className="cyber-grid min-h-full">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

            <span className="text-2xl">
              🛡️
            </span>

          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AI Threat Analyzer
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Analyze Digital Threats
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Select an input type below to analyze emails, URLs, images,
            audio and other suspicious digital content.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-5 md:grid-cols-2">

          <AnalyzeCard
            title="Email / Message"
            description="Analyze suspicious emails and messages for phishing, social engineering and credential theft indicators."
            icon={Mail}
            path="/analyze/email"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-400/10"
          />

          <AnalyzeCard
            title="URL / Link"
            description="Check URLs for malicious domains, phishing pages, suspicious redirects and other indicators."
            icon={Link2}
            path="/analyze/url"
            iconColor="text-blue-400"
            iconBg="bg-blue-400/10"
          />

          <AnalyzeCard
            title="Image / Deepfake"
            description="Upload an image to inspect possible manipulation and digital impersonation indicators."
            icon={Image}
            path="/analyze/image"
            iconColor="text-purple-400"
            iconBg="bg-purple-400/10"
          />

          <AnalyzeCard
            title="Audio / Voice"
            description="Analyze audio for possible synthetic speech, voice impersonation and manipulation indicators."
            icon={AudioLines}
            path="/analyze/audio"
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
          />

        </div>

        {/* Information */}

        <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">

          <div className="flex gap-3">

            <div className="text-xl">
              ℹ️
            </div>

            <div>

              <h3 className="text-sm font-semibold text-cyan-300">
                Analysis Environment
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                This frontend currently uses simulated analysis results.
                The architecture is prepared for connection to a future
                CyberGuard backend and machine-learning services.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}