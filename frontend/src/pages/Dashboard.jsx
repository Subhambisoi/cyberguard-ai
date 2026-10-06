import {
  ArrowUpRight,
  Radar,
  ShieldCheck
} from "lucide-react";

import {
  overviewStats,
  threatActivity,
  threatDistribution,
  incidents
} from "../data/dummyData";

import StatCard from "../components/StatCard";
import ThreatChart from "../components/ThreatChart";
import ThreatDistribution from "../components/ThreatDistribution";
import IncidentTable from "../components/IncidentTable";


export default function Dashboard() {

  return (

    <div
      className="
      mx-auto
      max-w-[1500px]
      space-y-6
      "
    >

      {/* HERO */}

      <section
        className="
        glass
        relative
        overflow-hidden
        rounded-2xl
        p-6
        md:p-8
        "
      >

        <div
          className="
          absolute
          right-[-80px]
          top-[-100px]
          h-72
          w-72
          rounded-full
          bg-cyan-400/10
          blur-3xl
          "
        />


        <div
          className="
          relative
          flex
          flex-col
          justify-between
          gap-5
          md:flex-row
          md:items-end
          "
        >

          <div>

            <div className="eyebrow">

              Security Operations Center

            </div>


            <h1
              className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-white
              md:text-4xl
              "
            >

              Cyber defense,
              under control.

            </h1>


            <p
              className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
              "
            >

              Monitor threat activity,
              inspect suspicious content
              and keep your incident
              response workflow in one
              command center.

            </p>

          </div>


          <a
            href="/analyze"
            className="btn-primary shrink-0"
          >

            <Radar size={17} />

            Analyze Threat

          </a>

        </div>


        <div
          className="
          relative
          mt-6
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
          "
        >

          <ShieldCheck
            size={15}
            className="text-emerald-400"
          />

          Frontend demonstration mode
          · backend-ready architecture

        </div>

      </section>


      {/* STATS */}

      <div
        className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
        "
      >

        {overviewStats.map(
          stat => (

            <StatCard
              key={stat.label}
              stat={stat}
            />

          )
        )}

      </div>


      {/* CHARTS */}

      <div
        className="
        grid
        gap-6
        xl:grid-cols-[1.65fr_1fr]
        "
      >

        <ThreatChart
          data={threatActivity}
        />

        <ThreatDistribution
          data={threatDistribution}
        />

      </div>


      {/* INCIDENTS */}

      <IncidentTable
        incidents={incidents}
        compact
      />


      {/* QUICK ACTIONS */}

      <div
        className="
        grid
        gap-4
        md:grid-cols-3
        "
      >

        {[
          [
            "Threat intelligence",
            "Review suspicious activity before escalation."
          ],

          [
            "Response workflow",
            "Move incidents from detection to resolution."
          ],

          [
            "Team operations",
            "See who owns each part of the defense stack."
          ]

        ].map(
          ([title, description]) => (

            <div
              key={title}
              className="
              rounded-2xl
              border
              border-white/10
              bg-white/[.02]
              p-5
              "
            >

              <p
                className="
                font-semibold
                text-white
                "
              >

                {title}

              </p>


              <p
                className="
                mt-2
                text-xs
                leading-5
                text-slate-500
                "
              >

                {description}

              </p>


              <a
                href="/analytics"
                className="
                mt-4
                inline-flex
                items-center
                gap-1
                text-xs
                font-bold
                text-cyan-400
                "
              >

                Explore

                <ArrowUpRight
                  size={13}
                />

              </a>

            </div>

          )
        )}

      </div>

    </div>

  );

}