import {
  CheckCircle2
} from "lucide-react";


export default function Recommendation({
  actions = []
}) {

  return (

    <div className="glass rounded-2xl p-5">

      <p className="font-semibold text-white">

        Recommended Actions

      </p>


      <div className="mt-4 space-y-3">

        {actions.map(
          action => (

            <div
              key={action}
              className="
              flex
              items-start
              gap-3
              text-sm
              text-slate-400
              "
            >

              <CheckCircle2
                size={17}
                className="
                mt-0.5
                shrink-0
                text-cyan-400
                "
              />

              <span>

                {action}

              </span>

            </div>

          )
        )}

      </div>

    </div>

  );

}
