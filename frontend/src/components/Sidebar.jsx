import {
  NavLink
} from "react-router-dom";

import {
  Activity,
  BarChart3,
  FileSearch,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";


const navigation = [

  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },

  {
    to: "/analyze",
    label: "Analyze",
    icon: FileSearch
  },

  {
    to: "/incidents",
    label: "Incidents",
    icon: Activity
  },

  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3
  },

  {
    to: "/team",
    label: "Team",
    icon: Users
  }

];


export default function Sidebar() {

  return (

    <aside
      className="
      fixed
      inset-y-0
      left-0
      z-40
      hidden
      w-[260px]
      border-r
      border-white/10
      bg-[#06101c]/95
      lg:block
      "
    >

      <div className="flex h-full flex-col">


        {/* BRAND */}

        <div
          className="
          flex
          h-[72px]
          items-center
          gap-3
          border-b
          border-white/10
          px-6
          "
        >

          <div
            className="
            grid
            h-10
            w-10
            place-items-center
            rounded-xl
            bg-cyan-400
            text-slate-950
            shadow-lg
            shadow-cyan-400/20
            "
          >

            <ShieldCheck size={24} />

          </div>


          <div>

            <div
              className="
              text-lg
              font-black
              tracking-tight
              text-white
              "
            >
              CYBERGUARD
            </div>

            <div
              className="
              font-mono
              text-[9px]
              uppercase
              tracking-[.2em]
              text-cyan-400
              "
            >
              Defense Command
            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <div className="px-4 pt-7">

          <div
            className="
            mb-3
            px-3
            text-[10px]
            font-bold
            uppercase
            tracking-[.2em]
            text-slate-600
            "
          >
            Operations
          </div>


          <nav className="space-y-1">

            {navigation.map(
              ({
                to,
                label,
                icon: Icon
              }) => (

                <NavLink
                  key={to}
                  to={to}

                  className={({
                    isActive
                  }) =>

                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/10"
                        : "text-slate-400 hover:bg-white/[.04] hover:text-white"
                    }`

                  }
                >

                  <Icon size={18} />

                  {label}

                </NavLink>

              )
            )}

          </nav>

        </div>


        {/* BOTTOM */}

        <div className="mt-auto p-4">

          <NavLink
            to="/settings"
            className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-white/10
            bg-white/[.03]
            px-3
            py-3
            text-sm
            font-semibold
            text-slate-400
            hover:text-white
            "
          >

            <Settings size={18} />

            Settings

          </NavLink>


          <div
            className="
            mt-4
            rounded-xl
            border
            border-cyan-400/10
            bg-cyan-400/[.03]
            p-3
            "
          >

            <div className="flex items-center gap-2">

              <span
                className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                "
              />

              <span
                className="
                text-xs
                font-semibold
                text-slate-300
                "
              >
                Demo monitoring online
              </span>

            </div>


            <p className="mt-1 text-[10px] text-slate-600">

              Frontend demonstration mode

            </p>

          </div>

        </div>

      </div>

    </aside>

  );

}