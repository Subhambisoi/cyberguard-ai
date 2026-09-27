import {
  Activity,
  BarChart3,
  FileWarning,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  ScanSearch,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  },
  {
    name: "Analyze",
    path: "/analyze",
    icon: ScanSearch
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: FileWarning
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3
  },
  {
    name: "Team",
    path: "/team",
    icon: Users
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          border-r border-slate-800
          bg-[#050d19]
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex h-20 items-center justify-between border-b border-slate-800 px-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-wide text-white">
                  CYBER<span className="text-cyan-400">GUARD</span>
                </h1>

                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Security Center
                </p>
              </div>

            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
            >
              <X size={20} />
            </button>

          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-3 py-6">

            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Main Menu
            </p>

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-xl px-4 py-3
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}

          </nav>

          {/* Bottom status */}
          <div className="border-t border-slate-800 p-4">

            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">

              <div className="mb-2 flex items-center gap-2">

                <span className="status-dot animate-cyber bg-emerald-400" />

                <span className="text-xs font-medium text-emerald-400">
                  SYSTEM ONLINE
                </span>

              </div>

              <p className="text-[11px] leading-5 text-slate-500">
                All monitoring services are operating normally.
              </p>

            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
              <Activity size={14} />
              CYBERGUARD v1.0
            </div>

          </div>

        </div>
      </aside>
    </>
  );
}