import {
  AlertCircle,
  FileSearch,
  RotateCcw,
  Send
} from "lucide-react";

import {
  useMemo,
  useState
} from "react";

import {
  cards
} from "../components/AnalyzeCard";

import AnalyzeCard
  from "../components/AnalyzeCard";

import ThreatResult
  from "../components/ThreatResult";

import RiskScore
  from "../components/RiskScore";

import Explanation
  from "../components/Explanation";

import Recommendation
  from "../components/Recommendation";

import {
  demoThreatResults
} from "../data/dummyThreatResult";


export default function Analyze() {

  const [
    selected,
    setSelected
  ] = useState(
    cards[0]
  );


  const [
    text,
    setText
  ] = useState("");


  const [
    result,
    setResult
  ] = useState(null);


  /*
    This calculates which demo
    result should be displayed.
  */

  const resultKey =
    useMemo(() => {

      if (!text.trim()) {

        return 0;

      }


      const value =
        text.toLowerCase();


      if (
        value.includes("password") ||
        value.includes("verify") ||
        value.includes("urgent") ||
        value.includes("click")
      ) {

        return 0;

      }


      if (
        value.includes("account") ||
        value.includes("login")
      ) {

        return 2;

      }


      return 1;

    }, [text]);


  /*
    Analyze button.
    IMPORTANT:
    setResult is called every time,
    so second analysis replaces
    the first result.
  */

  const analyze = () => {

    if (!text.trim()) {

      return;

    }


    setResult({

      ...demoThreatResults[
        resultKey
      ],

      id: Date.now()

    });

  };


  const clear = () => {

    setText("");

    setResult(null);

  };


  return (

    <div
      className="
      mx-auto
      max-w-[1500px]
      space-y-6
      "
    >

      {/* HEADER */}

      <div>

        <div className="eyebrow">

          Threat Analysis Center

        </div>


        <h1
          className="
          page-title
          mt-2
          "
        >

          Analyze suspicious content

        </h1>


        <p
          className="
          mt-2
          max-w-2xl
          text-sm
          text-slate-500
          "
        >

          The current UI uses clearly
          labeled demo data. Connect
          the FastAPI endpoint later
          without changing the page
          structure.

        </p>

      </div>


      {/* ANALYSIS TYPES */}

      <div
        className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
        "
      >

        {cards.map(
          card => (

            <AnalyzeCard

              key={card.title}

              card={card}

              onSelect={
                setSelected
              }

            />

          )
        )}

      </div>


      {/* TEXT ANALYSIS */}

      {selected.active && (

        <section
          className="
          glass
          rounded-2xl
          p-5
          md:p-6
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
              bg-cyan-400/10
              text-cyan-300
              "
            >

              <FileSearch
                size={19}
              />

            </div>


            <div>

              <p
                className="
                font-bold
                text-white
                "
              >

                {selected.title}
                Analysis

              </p>


              <p
                className="
                text-xs
                text-slate-500
                "
              >

                Demo analysis input

              </p>

            </div>

          </div>


          <textarea

            value={text}

            onChange={
              event =>
                setText(
                  event.target.value
                )
            }

            className="
            input
            mt-5
            min-h-40
            resize-y
            leading-6
            "

            placeholder="
            Paste a suspicious message here...
            "

          />


          <div
            className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              text-[11px]
              text-amber-400/80
              "
            >

              <AlertCircle
                size={14}
              />

              Demo only —
              not a real threat verdict

            </div>


            <div
              className="
              flex
              gap-2
              "
            >

              <button
                onClick={clear}
                className="btn-secondary"
              >

                <RotateCcw
                  size={15}
                />

                Clear

              </button>


              <button
                onClick={analyze}
                className="btn-primary"
              >

                <Send
                  size={15}
                />

                Analyze

              </button>

            </div>

          </div>

        </section>

      )}


      {/* RESULT */}

      {result && (

        <div className="space-y-5">

          <ThreatResult
            result={result}
          />


          <div
            className="
            grid
            gap-5
            lg:grid-cols-2
            "
          >

            <RiskScore
              score={
                result.riskScore
              }
              level={
                result.riskLevel
              }
            />


            <Explanation
              text={
                result.explanation
              }
            />

          </div>


          <Recommendation
            actions={
              result.actions
            }
          />


          <div
            className="
            rounded-xl
            border
            border-amber-400/10
            bg-amber-400/[.03]
            p-4
            text-xs
            text-amber-200/70
            "
          >

            This result is frontend
            mock data. Image and audio
            analysis remain unavailable
            until the corresponding
            backend detectors are
            implemented.

          </div>

        </div>

      )}

    </div>

  );

}