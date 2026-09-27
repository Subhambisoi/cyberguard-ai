import {
  Bell,
  Menu,
  Search
} from "lucide-react";

export default function Topbar({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-[#050d19]/95 px-4 backdrop-blur-md sm:px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-xs text-slate-500">
            Security Operations Center
          </p>

          <h2 className="text-lg font-semibold text-white">
            Overview
          </h2>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 md:flex">

          <Search size={16} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />

        </div>

        <button className="relative rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:text-white">

          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />

        </button>

        <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-bold text-cyan-300 sm:flex">
          CG
        </div>

      </div>

    </header>
  );
}