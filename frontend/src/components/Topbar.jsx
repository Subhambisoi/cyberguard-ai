import {
Bell,
Menu,
Search,
ShieldCheck
} from "lucide-react";

import {
useEffect,
useState
} from "react";

import {
useLocation
} from "react-router-dom";

import {
getUser
} from "../services/auth";

import ProfileDropdown from "./ProfileDropdown";

const pageInformation = {

"/dashboard": [
"Security Overview",
"Real-time cyber defense command center"
],

"/analyze": [
"Threat Analysis",
"Inspect suspicious content with demo-ready analysis"
],

"/incidents": [
"Incident Center",
"Review, prioritize and monitor security incidents"
],

"/analytics": [
"Security Analytics",
"Understand threat patterns and operational trends"
],

"/team": [
"CyberGuard Team",
"Meet the people building the defense platform"
],

"/profile": [
"My Profile",
"Manage your CyberGuard identity"
],

"/settings": [
"Settings",
"Control dashboard preferences"
]

};

const pageVoiceMessages = {

"/dashboard":
"Welcome to CyberGuard. This is your security overview, where you can monitor security events, detected threats, critical threats, and active incidents.",

"/analyze":
"You are now in Threat Analysis. Here you can inspect suspicious content and view the security analysis result.",

"/incidents":
"This is the Incident Center. Here you can review, prioritize, and monitor security incidents.",

"/analytics":
"This section provides security analytics and helps you understand threat patterns and operational trends.",

"/team":
"This is the CyberGuard team section. Here you can view the members working on the cybersecurity platform.",

"/profile":
"This is your CyberGuard profile. You can manage your account information here.",

"/settings":
"This is the settings section, where you can manage your dashboard preferences."

};

export default function Topbar() {

const location = useLocation();

const [
open,
setOpen
] = useState(false);

const [
voiceEnabled,
setVoiceEnabled
] = useState(() => {


try {

  return (
    localStorage.getItem(
      "cyberguard_voice_enabled"
    ) !== "false"
  );

} catch {

  return true;

}


});

const [
isSpeaking,
setIsSpeaking
] = useState(false);

const user = getUser();

const [
title,
subtitle
] =
pageInformation[
location.pathname
] ||
pageInformation[
"/dashboard"
];

/*

* Find the best available
* Indian English browser voice.
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

if (!voices.length) {

  return null;

}

/*
 * First preference:
 * Exact Indian English.
 */

const exactIndianVoice =
  voices.find(
    (voice) =>
      voice.lang &&
      voice.lang.toLowerCase() ===
        "en-in"
  );

if (exactIndianVoice) {

  return exactIndianVoice;

}

/*
 * Second preference:
 * Any en-IN variant.
 */

const indianEnglishVoice =
  voices.find(
    (voice) =>
      voice.lang &&
      voice.lang
        .toLowerCase()
        .startsWith("en-in")
  );

if (indianEnglishVoice) {

  return indianEnglishVoice;

}

/*
 * Third preference:
 * Voice name containing India /
 * Indian.
 */

const namedIndianVoice =
  voices.find(
    (voice) =>
      voice.name &&
      /india|indian/i.test(
        voice.name
      ) &&
      voice.lang &&
      voice.lang
        .toLowerCase()
        .startsWith("en")
  );

if (namedIndianVoice) {

  return namedIndianVoice;

}

/*
 * Fallback:
 * English voice if Indian voice
 * is not available.
 */

return (
  voices.find(
    (voice) =>
      voice.lang &&
      voice.lang
        .toLowerCase()
        .startsWith("en")
  ) || null
);


};

/*

* Load browser voices.
*
* Browsers can load SpeechSynthesis
* voices asynchronously.
  */

useEffect(() => {


if (
  typeof window === "undefined" ||
  !("speechSynthesis" in window)
) {

  return;

}

const loadVoices = () => {

  window.speechSynthesis
    .getVoices();

};

loadVoices();

window.speechSynthesis
  .addEventListener(
    "voiceschanged",
    loadVoices
  );

return () => {

  window.speechSynthesis
    .removeEventListener(
      "voiceschanged",
      loadVoices
    );

};


}, []);

/*

* CyberGuard AI Voice
*
* Uses the browser's built-in
* SpeechSynthesis API.
  */

const speak = (
message
) => {


if (
  !voiceEnabled
) {

  return;

}

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

window.speechSynthesis.cancel();

const utterance =
  new window.SpeechSynthesisUtterance(
    message
  );

/*
 * Indian English.
 */

utterance.lang =
  "en-IN";

/*
 * Slightly slower for
 * clear presentation speech.
 */

utterance.rate =
  0.88;

utterance.pitch =
  0.92;

utterance.volume =
  1;

/*
 * Prefer an Indian English
 * voice when the browser
 * provides one.
 */

const indianVoice =
  getIndianEnglishVoice();

if (
  indianVoice
) {

  utterance.voice =
    indianVoice;

  utterance.lang =
    indianVoice.lang ||
    "en-IN";

}

utterance.onstart = () => {

  setIsSpeaking(
    true
  );

};

utterance.onend = () => {

  setIsSpeaking(
    false
  );

};

utterance.onerror = () => {

  setIsSpeaking(
    false
  );

};

window.speechSynthesis.speak(
  utterance
);


};

/*

* Speak automatically when the
* user changes dashboard page.
  */

useEffect(() => {


if (
  !voiceEnabled
) {

  return;

}

const message =
  pageVoiceMessages[
    location.pathname
  ];

if (
  !message
) {

  return;

}

const timer =
  window.setTimeout(() => {

    speak(
      message
    );

  }, 350);

return () => {

  window.clearTimeout(
    timer
  );

  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {

    window.speechSynthesis.cancel();

    setIsSpeaking(
      false
    );

  }

};


}, [
location.pathname,
voiceEnabled
]);

/*

* Voice ON / OFF
  */

const toggleVoice = () => {


const nextValue =
  !voiceEnabled;

setVoiceEnabled(
  nextValue
);

try {

  localStorage.setItem(
    "cyberguard_voice_enabled",
    String(nextValue)
  );

} catch {

  // Ignore localStorage errors.

}

/*
 * Voice OFF
 */

if (
  !nextValue
) {

  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {

    window.speechSynthesis.cancel();

  }

  setIsSpeaking(
    false
  );

  return;

}

/*
 * Voice ON confirmation.
 */

window.setTimeout(() => {

  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {

    return;

  }

  window.speechSynthesis.cancel();

  const utterance =
    new window.SpeechSynthesisUtterance(
      "CyberGuard AI voice assistant is now active."
    );

  utterance.lang =
    "en-IN";

  utterance.rate =
    0.88;

  utterance.pitch =
    0.92;

  utterance.volume =
    1;

  const indianVoice =
    getIndianEnglishVoice();

  if (
    indianVoice
  ) {

    utterance.voice =
      indianVoice;

    utterance.lang =
      indianVoice.lang ||
      "en-IN";

  }

  utterance.onstart = () => {

    setIsSpeaking(
      true
    );

  };

  utterance.onend = () => {

    setIsSpeaking(
      false
    );

  };

  utterance.onerror = () => {

    setIsSpeaking(
      false
    );

  };

  window.speechSynthesis.speak(
    utterance
  );

}, 100);


};

return (


<header
  className="
  sticky
  top-0
  z-30
  border-b
  border-violet-400/10
  bg-[#09090b]/85
  backdrop-blur-xl
  "
>

  <div
    className="
    flex
    min-h-[72px]
    items-center
    justify-between
    gap-4
    px-4
    md:px-6
    lg:px-8
    "
  >

    {/* LEFT */}

    <div
      className="
      flex
      min-w-0
      items-center
      gap-3
      "
    >

      <button
        type="button"
        className="
        grid
        h-10
        w-10
        place-items-center
        rounded-xl
        border
        border-white/10
        bg-white/[.03]
        text-slate-300
        transition
        hover:border-violet-400/20
        hover:bg-violet-400/[.05]
        hover:text-violet-200
        lg:hidden
        "
      >

        <Menu
          size={19}
        />

      </button>

      <div
        className="
        min-w-0
        "
      >

        <div
          className="
          truncate
          text-base
          font-bold
          text-white
          md:text-lg
          "
        >

          {title}

        </div>

        <div
          className="
          hidden
          truncate
          text-xs
          text-slate-500
          sm:block
          "
        >

          {subtitle}

        </div>

      </div>

    </div>

    {/* SEARCH */}

    <div
      className="
      hidden
      max-w-sm
      flex-1
      md:block
      "
    >

      <div
        className="
        relative
        "
      >

        <Search
          size={16}
          className="
          absolute
          left-3
          top-3
          text-violet-400/50
          "
        />

        <input
          type="text"
          className="
          input
          py-2.5
          pl-9
          "
          placeholder="Search incidents, IDs, threats..."
        />

      </div>

    </div>

    {/* RIGHT */}

    <div
      className="
      flex
      items-center
      gap-2
      "
    >

      {/* CYBERGUARD AI DEFENSE CORE */}

      <button
        type="button"
        onClick={
          toggleVoice
        }
        title={
          voiceEnabled
            ? "CyberGuard AI Voice: ON"
            : "CyberGuard AI Voice: OFF"
        }
        aria-label={
          voiceEnabled
            ? "Turn CyberGuard AI Voice off"
            : "Turn CyberGuard AI Voice on"
        }
        className={`
          cyberguard-defense-shield
          ${
            !voiceEnabled
              ? "is-muted"
              : isSpeaking
                ? "is-speaking"
                : "is-idle"
          }
        `}
      >

        <ShieldCheck
          size={22}
          strokeWidth={1.8}
        />

        {voiceEnabled && (

          <span
            className="
            cyberguard-ai-status
            "
          />

        )}

        {isSpeaking && (

          <span
            className="
            cyberguard-voice-bars
            "
            aria-hidden="true"
          >

            <span />
            <span />
            <span />
            <span />

          </span>

        )}

      </button>

      {/* NOTIFICATIONS */}

      <button
        type="button"
        className="
        relative
        grid
        h-10
        w-10
        place-items-center
        rounded-xl
        border
        border-white/10
        bg-white/[.03]
        text-slate-400
        transition
        hover:border-violet-400/20
        hover:bg-violet-400/[.05]
        hover:text-violet-200
        "
      >

        <Bell
          size={18}
        />

        <span
          className="
          absolute
          right-2
          top-2
          h-1.5
          w-1.5
          rounded-full
          bg-violet-400
          shadow-[0_0_8px_rgba(139,92,246,0.65)]
          "
        />

      </button>

      {/* PROFILE */}

      <div
        className="
        relative
        "
      >

        <button
          type="button"
          onClick={() =>
            setOpen(
              value =>
                !value
            )
          }
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[.03]
          p-1.5
          pr-3
          transition
          hover:border-violet-400/20
          hover:bg-violet-400/[.05]
          "
        >

          {/* AVATAR */}

          <div
            className="
            grid
            h-8
            w-8
            place-items-center
            rounded-lg
            bg-gradient-to-br
            from-violet-500
            to-teal-400
            text-xs
            font-black
            text-white
            shadow-sm
            shadow-violet-500/20
            "
          >

            {user?.username
              ?.slice(0, 2)
              .toUpperCase() ||
              "SH"}

          </div>

          {/* USERNAME */}

          <span
            className="
            hidden
            text-sm
            font-semibold
            text-slate-200
            sm:block
            "
          >

            {user?.username ||
              "Shreyas"}

          </span>

        </button>

        {/* PROFILE DROPDOWN */}

        {open && (

          <ProfileDropdown
            user={user}
            onClose={() =>
              setOpen(false)
            }
          />

        )}

      </div>

    </div>

  </div>

</header>


);

}
