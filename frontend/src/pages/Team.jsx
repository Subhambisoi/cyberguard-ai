import {
Github,
Linkedin,
Shield,
UserRound
} from "lucide-react";

import { teamMembers } from "../data/dummyData";

export default function Team() {
return ( <div className="mx-auto max-w-[1200px] space-y-7">

```
  {/* PAGE HEADER */}

  <div className="text-center">

    <div className="eyebrow">
      Cyber Defense Unit
    </div>

    <h1 className="page-title mt-2">
      Meet the CyberGuard Team
    </h1>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
      A six-member team building an AI-ready cyber threat,
      phishing and digital impersonation defense platform.
    </p>

  </div>


  {/* TEAM MEMBERS */}

  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

    {teamMembers.map((member) => (

      <div
        key={member.name}
        className="
          glass
          group
          rounded-2xl
          p-6
          text-center
          transition
          duration-200
          hover:-translate-y-1
          hover:border-cyan-400/20
        "
      >

        {/* PROFILE PHOTO */}

        <div
          className="
            mx-auto
            h-24
            w-24
            overflow-hidden
            rounded-3xl
            border
            border-cyan-400/20
            bg-gradient-to-br
            from-cyan-400/15
            to-blue-500/10
          "
        >

          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";

                if (event.currentTarget.nextElementSibling) {
                  event.currentTarget.nextElementSibling.style.display = "grid";
                }
              }}
            />
          ) : null}

          <div
            className="
              hidden
              h-full
              w-full
              place-items-center
              text-2xl
              font-black
              text-cyan-300
            "
          >
            {member.initials}
          </div>

        </div>


        {/* NAME */}

        <div className="mt-5 flex items-center justify-center gap-2">

          <h2 className="font-bold text-white">
            {member.name}
          </h2>

          {member.lead && (
            <Shield
              size={15}
              className="text-cyan-400"
              title="Team Leader"
            />
          )}

        </div>


        {/* ROLE */}

        <p className="mt-2 text-xs font-medium text-cyan-400">
          {member.role}
        </p>


        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-4
            max-w-xs
            text-xs
            leading-5
            text-slate-500
          "
        >
          Responsible for the assigned CyberGuard module
          and collaborative security workflow.
        </p>


        {/* ACTION BUTTONS */}

        <div className="mt-5 flex justify-center gap-2">

          {/* PROFILE BUTTON */}

          <button
            type="button"
            title={`View ${member.name} profile`}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              border
              border-white/10
              text-slate-500
              transition
              hover:border-cyan-400/30
              hover:text-cyan-400
            "
          >
            <UserRound size={15} />
          </button>


          {/* GITHUB BUTTON */}

          <button
            type="button"
            title={`${member.name} GitHub`}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              border
              border-white/10
              text-slate-500
              transition
              hover:border-cyan-400/30
              hover:text-white
            "
          >
            <Github size={15} />
          </button>


          {/* LINKEDIN BUTTON */}

          <button
            type="button"
            title={`${member.name} LinkedIn`}
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-lg
              border
              border-white/10
              text-slate-500
              transition
              hover:border-cyan-400/30
              hover:text-cyan-400
            "
          >
            <Linkedin size={15} />
          </button>

        </div>

      </div>

    ))}

  </div>

</div>


);
}
