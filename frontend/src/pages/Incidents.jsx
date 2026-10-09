import {
  Filter,
  Search
} from "lucide-react";

import {
  useState
} from "react";

import {
  incidents
} from "../data/dummyData";

import IncidentTable
  from "../components/IncidentTable";


export default function Incidents() {

  const [
    query,
    setQuery
  ] = useState("");


  const filtered =
    incidents.filter(
      item =>

        Object
          .values(item)
          .join(" ")
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )

    );


  return (

    <div
      className="
      mx-auto
      max-w-[1500px]
      space-y-6
      "
    >

      <div>

        <div className="eyebrow">

          Incident Response

        </div>


        <h1
          className="
          page-title
          mt-2
          "
        >

          Security incidents

        </h1>


        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >

          Track active,
          investigating and resolved
          demo incidents.

        </p>

      </div>


      <div
        className="
        flex
        flex-col
        gap-3
        sm:flex-row
        "
      >

        <div
          className="
          relative
          flex-1
          "
        >

          <Search
            size={17}
            className="
            absolute
            left-3
            top-3.5
            text-slate-600
            "
          />


          <input

            value={query}

            onChange={
              event =>
                setQuery(
                  event.target.value
                )
            }

            className="
            input
            pl-10
            "

            placeholder="
            Search incidents...
            "

          />

        </div>


        <button
          className="btn-secondary"
        >

          <Filter size={16} />

          Filters

        </button>

      </div>


      <IncidentTable
        incidents={filtered}
      />

    </div>

  );

}
