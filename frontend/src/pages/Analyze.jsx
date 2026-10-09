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

import AnalyzeCard from "../components/AnalyzeCard";

import ThreatResult from "../components/ThreatResult";

import RiskScore from "../components/RiskScore";

import Explanation from "../components/Explanation";

import Recommendation from "../components/Recommendation";

import {
demoThreatResults
} from "../data/dummyThreatResult";

/*

* CyberGuard AI Voice
*
* Uses the browser's built-in
* SpeechSynthesis API.
*
* Prefers Indian English (en-IN)
* when the browser provides it.
*
* No backend or external API
* is required.
  */

const getIndianEnglishVoice = () => {

if (
typeof window === "undefined" ||
!("speechSynthesis" in window)
) {


return null;


}

const voices =
window.speechSynthesis.getVoices();

if (
!voices.length
) {


return null;


}

/*

* First preference:
* Exact en-IN voice.
  */

const exactIndianVoice =
voices.find(
voice =>
voice.lang &&
voice.lang.toLowerCase() ===
"en-in"
);

if (
exactIndianVoice
) {


return exactIndianVoice;


}

/*

* Second preference:
* Any Indian English variant.
  */

const indianEnglishVoice =
voices.find(
voice =>
voice.lang &&
voice.lang
.toLowerCase()
.startsWith("en-in")
);

if (
indianEnglishVoice
) {


return indianEnglishVoice;


}

/*

* Third preference:
* Voice name containing India
* or Indian.
  */

const namedIndianVoice =
voices.find(
voice =>
voice.name &&
/india|indian/i.test(
voice.name
) &&
voice.lang &&
voice.lang
.toLowerCase()
.startsWith("en")
);

if (
namedIndianVoice
) {


return namedIndianVoice;


}

/*

* Safe fallback:
* Any English voice.
  */

return (
voices.find(
voice =>
voice.lang &&
voice.lang
.toLowerCase()
.startsWith("en")
) || null
);

};

/*

* Browser voices may load
* asynchronously.
  */

const loadSpeechVoices = () => {

if (
typeof window === "undefined" ||
!("speechSynthesis" in window)
) {


return;


}

window.speechSynthesis
.getVoices();

};

/*

* Load voices when available.
  */

if (
typeof window !== "undefined" &&
"speechSynthesis" in window
) {

loadSpeechVoices();

}

/*

* Main CyberGuard voice function.
  */

const speak = (
message
) => {

if (
typeof window === "undefined" ||
!("speechSynthesis" in window)
) {


return;


}

if (
!message
) {


return;


}

const enabled =
localStorage.getItem(
"cyberguard_voice_enabled"
);

/*

* If the user has explicitly
* turned voice OFF, do not speak.
  */

if (
enabled === "false"
) {


return;


}

/*

* Stop any previous speech.
  */

window.speechSynthesis.cancel();

const speech =
new window.SpeechSynthesisUtterance(
message
);

/*

* Indian English.
  */

speech.lang =
"en-IN";

/*

* Slightly slower speech for
* clearer presentation.
  */

speech.rate =
0.88;

speech.pitch =
0.92;

speech.volume =
1;

/*

* Prefer Indian English voice.
  */

const indianVoice =
getIndianEnglishVoice();

if (
indianVoice
) {


speech.voice =
  indianVoice;

speech.lang =
  indianVoice.lang ||
  "en-IN";


}

window.speechSynthesis.speak(
speech
);

};

/*

* Creates one complete voice message
* for the analysis result.
*
* This avoids multiple separate
* voice messages for the same result.
  */

const speakAnalysisResult = (
analysisResult
) => {

if (
!analysisResult
) {


return;


}

const risk =
String(
analysisResult.riskLevel ||
"unknown"
).toLowerCase();

const threatType =
String(
analysisResult.threatType ||
analysisResult.threat_type ||
"security threat"
);

const confidenceValue =
Number(
analysisResult.confidence ||
0
);

const confidenceText =
confidenceValue > 0
? `with ${Math.round(
          confidenceValue
        )} percent confidence`
: "";

const actions =
Array.isArray(
analysisResult.actions
)
? analysisResult.actions
: [];

/*

* Safe result
  */

const isSafe =
risk === "safe" ||
(
risk === "low" &&
Number(
analysisResult.riskScore ||
0
) === 0
);

if (
isSafe
) {


speak(
  "Analysis complete. No significant threat detected. The submitted content appears to be safe based on the current demo analysis."
);

return;


}

/*

* Risk message
  */

let riskMessage =
"The content requires attention.";

if (
risk === "critical"
) {


riskMessage =
  "Critical threat detected. Immediate attention is recommended.";


} else if (
risk === "high"
) {


riskMessage =
  "High risk threat detected. Please review the recommended security actions.";


} else if (
risk === "medium"
) {


riskMessage =
  "Medium risk threat detected. Further investigation is recommended.";


} else if (
risk === "low"
) {


riskMessage =
  "Low risk activity detected. Continue monitoring the situation.";


}

/*

* Threat-type specific message
  */

let typeMessage =
"";

const normalizedType =
threatType.toLowerCase();

if (
normalizedType.includes(
"phishing"
)
) {


typeMessage =
  "Phishing threat detected. Avoid opening suspicious links or sharing sensitive information.";


} else if (
normalizedType.includes(
"impersonation"
)
) {


typeMessage =
  "Digital impersonation threat detected. The content may be attempting to imitate a trusted identity.";


} else if (
normalizedType.includes(
"account"
) &&
normalizedType.includes(
"takeover"
)
) {


typeMessage =
  "Account takeover risk detected. Review the activity and secure the affected account.";


} else {


typeMessage =
  "Security threat detected. Please review the analysis carefully.";


}

/*

* Recommended actions.
*
* Only include a short summary so
* the browser does not speak a huge
* block of text.
  */

let recommendationMessage =
"";

if (
actions.length > 0
) {


const firstActions =
  actions
    .slice(0, 3)
    .map(
      action =>
        String(
          action
        ).replace(
          /\.$/,
          ""
        )
    )
    .join(
      ", "
    );

recommendationMessage =
  `Recommended actions: ${firstActions}.`;


}

/*

* Final combined voice message.
*
* One analysis = one voice message.
  */

const parts = [
"Analysis complete.",
typeMessage,
riskMessage,
confidenceText,
recommendationMessage
].filter(
Boolean
);

speak(
parts.join(
" "
)
);

};

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

* This calculates which demo
* result should be displayed.
  */

const resultKey =
useMemo(() => {


  if (
    !text.trim()
  ) {

    return 0;

  }

  const value =
    text.toLowerCase();

  if (
    value.includes(
      "password"
    ) ||
    value.includes(
      "verify"
    ) ||
    value.includes(
      "urgent"
    ) ||
    value.includes(
      "click"
    )
  ) {

    return 0;

  }

  if (
    value.includes(
      "account"
    ) ||
    value.includes(
      "login"
    )
  ) {

    return 2;

  }

  return 1;

}, [text]);


/*

* Analyze button.
*
* Every analysis replaces the
* previous result and sends one
* complete message to CyberGuard AI Voice.
  */

const analyze = () => {


if (
  !text.trim()
) {

  return;

}

const analysisResult = {

  ...demoThreatResults[
    resultKey
  ],

  id: Date.now()

};

setResult(
  analysisResult
);

/*
 * Give React time to update the
 * result before speaking.
 */

window.setTimeout(() => {

  speakAnalysisResult(
    analysisResult
  );

}, 100);


};

const clear = () => {


setText("");

setResult(null);

/*
 * Stop any current AI voice.
 */

if (
  typeof window !== "undefined" &&
  "speechSynthesis" in window
) {

  window.speechSynthesis.cancel();

}


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

          key={
            card.title
          }

          card={
            card
          }

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

        value={
          text
        }

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
            onClick={
              clear
            }
            className="
            btn-secondary
            "
          >

            <RotateCcw
              size={15}
            />

            Clear

          </button>

          <button
            onClick={
              analyze
            }
            className="
            btn-primary
            "
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

    <div
      className="
      space-y-5
      "
    >

      <ThreatResult
        result={
          result
        }
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
