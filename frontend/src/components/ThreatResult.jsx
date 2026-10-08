import {
  ShieldAlert,
  ShieldCheck
} from "lucide-react";


export default function ThreatResult({
  result
}) {

  if (!result) {
    return null;
  }


  const safe =
    result.riskScore < 35;


  return (

    <div className="glass rounded-2xl p-5">

      <div
        className="
        flex
        items-start
        justify-between
        gap-4
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
            className={`
            grid
            h-11
            w-11
            place-items-center
            rounded-xl

            ${
              safe
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-red-400/10 text-red-400"
            }

            `}
          >

            {safe
              ? <ShieldCheck size={22} />
              : <ShieldAlert size={22} />
            }

          </div>


          <div>

            <p className="eyebrow">

              Analysis Result

            </p>

            <h2
              className="
              mt-1
              text-xl
              font-extrabold
              text-white
              "
            >

              {result.verdict}

            </h2>

          </div>

        </div>


        <span
          className="
          rounded-lg
          border
          border-white/10
          px-2
          py-1
          font-mono
          text-[9px]
          text-slate-500
          "
        >

          DEMO

        </span>

      </div>


      <div
        className="
        mt-6
        grid
        gap-3
        sm:grid-cols-3
        "
      >

        <div
          className="
          rounded-xl
          border
          border-white/5
          bg-white/[.02]
          p-4
          "
        >

          <p
            className="
            text-[10px]
            uppercase
            tracking-wider
            text-slate-600
            "
          >
            Threat Type
          </p>

          <p className="mt-1 font-semibold text-white">

            {result.threatType}

          </p>

        </div>


        <div
          className="
          rounded-xl
          border
          border-white/5
          bg-white/[.02]
          p-4
          "
        >

          <p
            className="
            text-[10px]
            uppercase
            tracking-wider
            text-slate-600
            "
          >
            Confidence
          </p>

          <p className="mt-1 font-semibold text-white">

            {result.confidence}%

          </p>

        </div>


        <div
          className="
          rounded-xl
          border
          border-white/5
          bg-white/[.02]
          p-4
          "
        >

          <p
            className="
            text-[10px]
            uppercase
            tracking-wider
            text-slate-600
            "
          >
            Risk Level
          </p>

          <p className="mt-1 font-semibold text-white">

            {result.riskLevel}

          </p>

        </div>

      </div>

    </div>

  );

}
