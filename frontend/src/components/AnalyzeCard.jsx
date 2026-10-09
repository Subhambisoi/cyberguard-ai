import {
  ArrowRight,
  FileText,
  Image,
  Link2,
  Mic
} from "lucide-react";


const cards = [

  {
    icon: FileText,
    title: "Email / Message",
    desc: "Analyze suspicious messages and phishing language.",
    active: true
  },

  {
    icon: Link2,
    title: "URL / Link",
    desc: "Check suspicious or potentially malicious links.",
    active: true
  },

  {
  icon: Image,
  title: "Image / Deepfake",
  desc: "Visual impersonation detection will be available after backend integration.",
  active: true
},
  {
    icon: Mic,
    title: "Audio / Voice",
    desc: "Voice impersonation detection will be available later.",
    active: false
  }

];


export default function AnalyzeCard({
  card,
  onSelect
}) {

  const item =
    card || cards[0];

  const Icon =
    item.icon || FileText;


  return (

    <button
      onClick={() =>
        item.active &&
        onSelect?.(item)
      }

      className={`
        group
        w-full
        rounded-2xl
        border
        p-5
        text-left
        transition
        duration-200

        ${
          item.active

            ? `
              border-white/10
              bg-[#111116]/80
              hover:-translate-y-1
              hover:border-violet-400/25
              hover:bg-[#18181f]
              hover:shadow-[0_0_25px_rgba(139,92,246,0.06)]
            `

            : `
              cursor-not-allowed
              border-white/5
              bg-white/[.02]
              opacity-65
            `
        }

      `}
    >

      <div
        className="
        flex
        items-start
        justify-between
        "
      >

        {/* ICON */}

        <div
          className={`
          grid
          h-11
          w-11
          place-items-center
          rounded-xl
          border

          ${
            item.active

              ? `
                border-violet-400/10
                bg-violet-400/10
                text-violet-300
              `

              : `
                border-white/5
                bg-white/[.04]
                text-slate-500
              `
          }
          `}
        >

          <Icon size={21} />

        </div>


        {/* ACTION / STATUS */}

        {item.active ? (

          <ArrowRight
            size={17}
            className="
            text-slate-700
            transition
            duration-200
            group-hover:translate-x-1
            group-hover:text-teal-400
            "
          />

        ) : (

          <span
            className="
            rounded-full
            border
            border-white/10
            bg-white/[.02]
            px-2
            py-1
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-slate-600
            "
          >
            Coming Soon
          </span>

        )}

      </div>


      {/* TITLE */}

      <h3
        className="
        mt-5
        font-bold
        text-white
        "
      >
        {item.title}
      </h3>


      {/* DESCRIPTION */}

      <p
        className="
        mt-2
        text-xs
        leading-5
        text-slate-500
        "
      >
        {item.desc}
      </p>


      {/* AVAILABILITY */}

      <div
        className={`
        mt-5
        text-[10px]
        font-bold
        uppercase
        tracking-widest

        ${
          item.active
            ? "text-teal-500"
            : "text-slate-600"
        }
        `}
      >

        {item.active
          ? "Available in demo"
          : "Not Available"}

      </div>

    </button>

  );

}


export {
  cards
};

