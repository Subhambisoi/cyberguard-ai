import {
  Bell,
  Lock,
  Palette,
  ShieldCheck
} from "lucide-react";

import {
  useState
} from "react";


export default function Settings() {

  const [
    alerts,
    setAlerts
  ] = useState(true);


  const [
    compact,
    setCompact
  ] = useState(false);


  const SettingRow = ({
    icon: Icon,
    title,
    description,
    checked,
    setChecked
  }) => (

    <div
      className="
      flex
      items-center
      justify-between
      gap-4
      rounded-2xl
      border
      border-white/5
      bg-white/[.02]
      p-4
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        <div
          className="
          grid
          h-10
          w-10
          place-items-center
          rounded-xl
          bg-white/[.04]
          text-cyan-300
          "
        >

          <Icon size={18} />

        </div>


        <div>

          <p
            className="
            text-sm
            font-semibold
            text-white
            "
          >

            {title}

          </p>


          <p
            className="
            mt-1
            text-xs
            text-slate-500
            "
          >

            {description}

          </p>

        </div>

      </div>


      <button
        onClick={() =>
          setChecked(
            !checked
          )
        }

        className={`
          h-6
          w-11
          rounded-full
          p-1
          transition

          ${
            checked
              ? "bg-cyan-400"
              : "bg-slate-700"
          }
        `}
      >

        <span
          className={`
          block
          h-4
          w-4
          rounded-full
          bg-white
          transition

          ${
            checked
              ? "translate-x-5"
              : ""
          }
          `}
        />

      </button>

    </div>

  );


  return (

    <div
      className="
      mx-auto
      max-w-4xl
      space-y-6
      "
    >

      <div>

        <div className="eyebrow">

          System Preferences

        </div>


        <h1
          className="
          page-title
          mt-2
          "
        >

          Settings

        </h1>


        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >

          Customize your local
          CyberGuard dashboard
          experience.

        </p>

      </div>


      <div
        className="
        glass
        space-y-3
        rounded-2xl
        p-5
        "
      >

        <SettingRow

          icon={Bell}

          title="Security alerts"

          description="
          Show visual alerts for important
          dashboard events.
          "

          checked={alerts}

          setChecked={
            setAlerts
          }

        />


        <SettingRow

          icon={Palette}

          title="Compact dashboard"

          description="
          Use a tighter layout for monitoring
          large datasets.
          "

          checked={compact}

          setChecked={
            setCompact
          }

        />


        <SettingRow

          icon={ShieldCheck}

          title="Demo mode"

          description="
          Clearly label frontend-generated
          security results as mock data.
          "

          checked={true}

          setChecked={() => {}}

        />

      </div>


      <div
        className="
        glass
        rounded-2xl
        p-5
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <Lock
            size={18}
            className="text-cyan-300"
          />


          <p
            className="
            font-semibold
            text-white
            "
          >

            Security & Authentication

          </p>

        </div>


        <p
          className="
          mt-3
          text-xs
          leading-6
          text-slate-500
          "
        >

          Authentication in this
          frontend build is a local
          demonstration. Connect your
          backend authentication service
          before using it with real
          accounts.

        </p>

      </div>

    </div>

  );

}
