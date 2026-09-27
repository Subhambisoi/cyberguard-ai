import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Upload,
  Link2,
  Mail,
  Image,
  AudioLines
} from "lucide-react";

import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";

import { analyzeThreat } from "./services/api";
import { mockIncidents } from "./data/mockIncidents";

/* -------------------------------------------------------
   Analyze Input Page
------------------------------------------------------- */

function AnalyzeInput({ type }) {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const config = {
    email: {
      title: "Email / Message Analysis",
      description:
        "Paste suspicious email or message content for analysis.",
      icon: Mail,
      placeholder:
        "Paste email or message content here..."
    },

    url: {
      title: "URL / Link Analysis",
      description:
        "Enter a suspicious URL to analyze its security characteristics.",
      icon: Link2,
      placeholder:
        "https://example.com/suspicious-link"
    },

    image: {
      title: "Image / Deepfake Analysis",
      description:
        "Upload an image to check possible digital manipulation.",
      icon: Image,
      placeholder: ""
    },

    audio: {
      title: "Audio / Voice Analysis",
      description:
        "Upload an audio file to check possible voice manipulation.",
      icon: AudioLines,
      placeholder: ""
    }
  };

  const current = config[type] || config.email;

  const Icon = current.icon;

  async function handleAnalyze() {
    if (!input.trim() && !file) {
      return;
    }

    setLoading(true);

    const data = await analyzeThreat(
      type,
      input || file?.name
    );

    setResult(data);

    setLoading(false);
  }

  return (
    <div className="min-h-full">

      <button
        onClick={() => navigate("/analyze")}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-400"
      >
        <ArrowLeft size={17} />
        Back to Analyzer
      </button>

      <div className="mx-auto max-w-4xl">

        {/* Heading */}

        <div className="mb-8">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">

            <Icon className="h-7 w-7 text-cyan-400" />

          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {current.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {current.description}
          </p>

        </div>

        {/* Input */}

        <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-5">

          {type === "image" || type === "audio" ? (

            <label className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 transition hover:border-cyan-400/50">

              <Upload
                size={35}
                className="text-slate-500"
              />

              <p className="mt-4 text-sm font-medium text-slate-300">
                {file
                  ? file.name
                  : "Click to upload file"}
              </p>

              <p className="mt-2 text-xs text-slate-600">
                {type === "image"
                  ? "PNG, JPG, JPEG"
                  : "MP3, WAV, M4A"}
              </p>

              <input
                type="file"
                accept={
                  type === "image"
                    ? "image/*"
                    : "audio/*"
                }
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

            </label>

          ) : (

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={current.placeholder}
              rows={10}
              className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40"
            />

          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Icon size={17} />
                Analyze Threat
              </>
            )}
          </button>

        </div>

        {/* Result */}

        {result && (

          <div className="mt-6 rounded-2xl border border-slate-800 bg-[#07111f] p-6">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-400/10">

                <CheckCircle2
                  className="text-red-400"
                  size={22}
                />

              </div>

              <div className="flex-1">

                <div className="flex flex-col justify-between gap-3 sm:flex-row">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Analysis Result
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white">
                      {result.type}
                    </h2>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs text-slate-500">
                      Confidence
                    </p>

                    <p className="text-2xl font-bold text-cyan-400">
                      {result.confidence}%
                    </p>

                  </div>

                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">

                    <p className="text-xs text-slate-600">
                      Threat Status
                    </p>

                    <p className="mt-2 font-semibold text-red-400">
                      Threat Detected
                    </p>

                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">

                    <p className="text-xs text-slate-600">
                      Severity
                    </p>

                    <p className="mt-2 font-semibold text-orange-400">
                      {result.severity}
                    </p>

                  </div>

                </div>

                <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">

                  <p className="text-xs font-semibold text-cyan-300">
                    Explanation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {result.explanation}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

/* -------------------------------------------------------
   Incident Details
------------------------------------------------------- */

function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident = mockIncidents.find(
    (item) => item.id === id
  );

  if (!incident) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-10 text-center">

        <h1 className="text-xl font-bold text-white">
          Incident Not Found
        </h1>

        <button
          onClick={() => navigate("/incidents")}
          className="mt-4 text-sm text-cyan-400"
        >
          Back to Incidents
        </button>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">

      <button
        onClick={() => navigate("/incidents")}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400"
      >
        <ArrowLeft size={17} />
        Back to Incidents
      </button>

      <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-600">
              Incident
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white">
              {incident.id}
            </h1>

          </div>

          <span className="h-fit rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-medium text-red-400">
            {incident.severity}
          </span>

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <InfoBox
            label="Threat Type"
            value={incident.type}
          />

          <InfoBox
            label="Source"
            value={incident.source}
          />

          <InfoBox
            label="Target"
            value={incident.target}
          />

          <InfoBox
            label="Confidence"
            value={`${incident.confidence}%`}
          />

          <InfoBox
            label="Status"
            value={incident.status}
          />

          <InfoBox
            label="Detected"
            value={incident.time}
          />

        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-5">

          <h3 className="text-sm font-semibold text-white">
            Incident Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {incident.description}
          </p>

        </div>

      </div>

    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-white">
        {value}
      </p>

    </div>
  );
}

/* -------------------------------------------------------
   Team Page
------------------------------------------------------- */

function Team() {
  const members = [
    {
      name: "Team Member 1",
      role: "Project Lead"
    },
    {
      name: "Team Member 2",
      role: "Frontend Developer"
    },
    {
      name: "Team Member 3",
      role: "Backend Developer"
    },
    {
      name: "Team Member 4",
      role: "AI/ML Developer"
    },
    {
      name: "Team Member 5",
      role: "Security Researcher"
    },
    {
      name: "Team Member 6",
      role: "UI/UX Designer"
    }
  ];

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-10 text-center">

        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          CYBERGUARD
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Meet the CyberGuard Team
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          A multidisciplinary team working together to build a
          cybersecurity threat detection platform.
        </p>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {members.map((member, index) => (

          <div
            key={member.name}
            className="rounded-2xl border border-slate-800 bg-[#07111f] p-6 text-center transition hover:border-cyan-400/30 hover:shadow-cyber"
          >

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-2xl font-bold text-cyan-400">
              M{index + 1}
            </div>

            <h3 className="mt-5 font-semibold text-white">
              {member.name}
            </h3>

            <p className="mt-1 text-sm text-cyan-400">
              {member.role}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

/* -------------------------------------------------------
   Settings Page
------------------------------------------------------- */

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [monitoring, setMonitoring] = useState(true);

  return (
    <div className="mx-auto max-w-4xl">

      <div className="mb-8">

        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Configuration
        </p>

        <h1 className="mt-2 text-2xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage CyberGuard monitoring preferences.
        </p>

      </div>

      <div className="space-y-4">

        <Setting
          title="Threat Monitoring"
          description="Enable continuous security event monitoring."
          enabled={monitoring}
          setEnabled={setMonitoring}
        />

        <Setting
          title="Security Notifications"
          description="Receive notifications for important security events."
          enabled={notifications}
          setEnabled={setNotifications}
        />

      </div>

    </div>
  );
}

function Setting({
  title,
  description,
  enabled,
  setEnabled
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-slate-800 bg-[#07111f] p-5">

      <div>

        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`
          relative h-6 w-11 rounded-full transition
          ${enabled ? "bg-cyan-400" : "bg-slate-700"}
        `}
      >

        <span
          className={`
            absolute top-1 h-4 w-4 rounded-full bg-white transition
            ${enabled ? "left-6" : "left-1"}
          `}
        />

      </button>

    </div>
  );
}

/* -------------------------------------------------------
   Layout
------------------------------------------------------- */

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617]">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="min-h-screen lg:pl-64">

        <Topbar setMobileOpen={setMobileOpen} />

        <main className="p-4 sm:p-6 lg:p-8">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/analyze"
              element={<Analyze />}
            />

            <Route
              path="/analyze/email"
              element={
                <AnalyzeInput type="email" />
              }
            />

            <Route
              path="/analyze/url"
              element={
                <AnalyzeInput type="url" />
              }
            />

            <Route
              path="/analyze/image"
              element={
                <AnalyzeInput type="image" />
              }
            />

            <Route
              path="/analyze/audio"
              element={
                <AnalyzeInput type="audio" />
              }
            />

            <Route
              path="/incidents"
              element={<Incidents />}
            />

            <Route
              path="/incidents/:id"
              element={<IncidentDetails />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/team"
              element={<Team />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </main>

      </div>

    </div>
  );
}

/* -------------------------------------------------------
   App
------------------------------------------------------- */

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}