import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  Zap
} from "lucide-react";


const iconMap = {

  cyan: Activity,

  blue: Zap,

  red: ShieldAlert,

  amber: AlertTriangle

};


export default function StatCard({
  stat
}) {

  const Icon =
    iconMap[
      stat.tone
    ] || Activity;


  const improvement =
    stat.label ===
      "Critical Threats" &&
    stat.delta.startsWith("-");


  return (

    <div className="glass rounded-2xl p-5">

      <div
        className="
        flex
        items-start
        justify-between
        "
      >

        <div>

          <p
            className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
            "
          >

            {stat.label}

          </p>


          <p
            className="
            mt-2
            text-3xl
            font-extrabold
            tracking-tight
            text-white
            "
          >

            {stat.value}

          </p>

        </div>


        <div
          className="
          grid
          h-10
          w-10
          place-items-center
          rounded-xl
          bg-cyan-400/10
          text-cyan-300
          "
        >

          <Icon size={19} />

        </div>

      </div>


      <div
        className={`
          mt-4
          text-xs
          font-semibold
          ${
            improvement
              ? "text-emerald-400"
              : "text-cyan-400"
          }
        `}
      >

        {stat.delta}

        <span
          className="
          ml-1
          font-normal
          text-slate-600
          "
        >
          vs previous period
        </span>

      </div>

    </div>

  );

}