import {
  Bell,
  Menu,
  Search
} from "lucide-react";

import {
  useState
} from "react";

import {
  useLocation
} from "react-router-dom";

import {
  getUser
} from "../services/auth";

import ProfileDropdown from "./ProfileDropdown";


const pageInformation = {

  "/dashboard": [
    "Security Overview",
    "Real-time cyber defense command center"
  ],

  "/analyze": [
    "Threat Analysis",
    "Inspect suspicious content with demo-ready analysis"
  ],

  "/incidents": [
    "Incident Center",
    "Review, prioritize and monitor security incidents"
  ],

  "/analytics": [
    "Security Analytics",
    "Understand threat patterns and operational trends"
  ],

  "/team": [
    "CyberGuard Team",
    "Meet the people building the defense platform"
  ],

  "/profile": [
    "My Profile",
    "Manage your CyberGuard identity"
  ],

  "/settings": [
    "Settings",
    "Control dashboard preferences"
  ]

};


export default function Topbar() {

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const user = getUser();

  const [
    title,
    subtitle
  ] =
    pageInformation[
      location.pathname
    ] ||
    pageInformation["/dashboard"];


  return (

    <header
      className="
      sticky
      top-0
      z-30
      border-b
      border-white/10
      bg-[#050b14]/85
      backdrop-blur-xl
      "
    >

      <div
        className="
        flex
        min-h-[72px]
        items-center
        justify-between
        gap-4
        px-4
        md:px-6
        lg:px-8
        "
      >

        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-3">

          <button
            className="
            grid
            h-10
            w-10
            place-items-center
            rounded-xl
            border
            border-white/10
            bg-white/[.03]
            text-slate-300
            lg:hidden
            "
          >

            <Menu size={19} />

          </button>


          <div className="min-w-0">

            <div
              className="
              truncate
              text-base
              font-bold
              text-white
              md:text-lg
              "
            >
              {title}
            </div>

            <div
              className="
              hidden
              truncate
              text-xs
              text-slate-500
              sm:block
              "
            >
              {subtitle}
            </div>

          </div>

        </div>


        {/* SEARCH */}

        <div className="hidden max-w-sm flex-1 md:block">

          <div className="relative">

            <Search
              size={16}
              className="
              absolute
              left-3
              top-3
              text-slate-600
              "
            />

            <input
              className="input py-2.5 pl-9"
              placeholder="
              Search incidents, IDs, threats...
              "
            />

          </div>

        </div>


        {/* RIGHT */}

        <div className="flex items-center gap-2">

          <button
            className="
            relative
            grid
            h-10
            w-10
            place-items-center
            rounded-xl
            border
            border-white/10
            bg-white/[.03]
            text-slate-400
            hover:text-white
            "
          >

            <Bell size={18} />

            <span
              className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-400
              "
            />

          </button>


          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={() =>
                setOpen(
                  value => !value
                )
              }

              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[.03]
              p-1.5
              pr-3
              hover:bg-white/[.06]
              "
            >

              <div
                className="
                grid
                h-8
                w-8
                place-items-center
                rounded-lg
                bg-gradient-to-br
                from-cyan-300
                to-blue-500
                text-xs
                font-black
                text-slate-950
                "
              >

                {
                  user.username
                    ?.slice(0, 2)
                    .toUpperCase()
                  || "SH"
                }

              </div>


              <span
                className="
                hidden
                text-sm
                font-semibold
                text-slate-200
                sm:block
                "
              >

                {user.username}

              </span>

            </button>


            {open && (

              <ProfileDropdown
                user={user}
                onClose={() =>
                  setOpen(false)
                }
              />

            )}

          </div>

        </div>

      </div>

    </header>

  );

}