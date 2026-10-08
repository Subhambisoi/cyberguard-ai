export default function RiskScore({
  score = 0,
  level = "Low"
}) {

  const radius = 58;

  const circumference =
    2 *
    Math.PI *
    radius;

  const offset =
    circumference -
    (score / 100) *
      circumference;


  return (

    <div className="glass rounded-2xl p-5">

      <p className="font-semibold text-white">

        Risk Score

      </p>


      <div
        className="
        mt-5
        flex
        items-center
        gap-5
        "
      >

        <div
          className="
          relative
          h-36
          w-36
          shrink-0
          "
        >

          <svg
            viewBox="0 0 140 140"
            className="-rotate-90"
          >

            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#ffffff0d"
              strokeWidth="10"
            />


            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />

          </svg>


          <div
            className="
            absolute
            inset-0
            grid
            place-items-center
            "
          >

            <div className="text-center">

              <div
                className="
                text-3xl
                font-black
                text-white
                "
              >
                {score}
              </div>

              <div
                className="
                text-[9px]
                uppercase
                tracking-widest
                text-slate-600
                "
              >
                / 100
              </div>

            </div>

          </div>

        </div>


        <div>

          <div className="eyebrow">

            Risk Level

          </div>

          <div
            className="
            mt-1
            text-xl
            font-extrabold
            text-white
            "
          >

            {level}

          </div>

          <p
            className="
            mt-2
            text-xs
            leading-5
            text-slate-500
            "
          >

            Demo score generated
            by frontend sample data.

          </p>

        </div>

      </div>

    </div>

  );

}
