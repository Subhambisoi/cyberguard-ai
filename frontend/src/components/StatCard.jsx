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

const toneStyles = {

cyan: {
box:
"bg-violet-400/10 text-violet-300 border-violet-400/10",
glow:
"hover:border-violet-400/20 hover:shadow-[0_0_25px_rgba(139,92,246,0.06)]",
delta:
"text-violet-400"
},

blue: {
box:
"bg-teal-400/10 text-teal-300 border-teal-400/10",
glow:
"hover:border-teal-400/20 hover:shadow-[0_0_25px_rgba(20,184,166,0.05)]",
delta:
"text-teal-400"
},

red: {
box:
"bg-red-400/10 text-red-300 border-red-400/10",
glow:
"hover:border-red-400/20 hover:shadow-[0_0_25px_rgba(220,38,38,0.05)]",
delta:
"text-red-400"
},

amber: {
box:
"bg-amber-400/10 text-amber-300 border-amber-400/10",
glow:
"hover:border-amber-400/20 hover:shadow-[0_0_25px_rgba(245,158,11,0.05)]",
delta:
"text-amber-400"
}

};

export default function StatCard({
stat
}) {

const Icon =
iconMap[
stat.tone
] || Activity;

const tone =
toneStyles[
stat.tone
] || toneStyles.cyan;

const improvement =
stat.label ===
"Critical Threats" &&
stat.delta.startsWith("-");

return (


<div
  className={`
    glass
    rounded-2xl
    border
    p-5
    transition
    duration-200
    ${tone.glow}
  `}
>

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
      className={`
      grid
      h-10
      w-10
      place-items-center
      rounded-xl
      border
      ${tone.box}
      `}
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
          : tone.delta
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
