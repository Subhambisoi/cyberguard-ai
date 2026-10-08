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
    desc: "Visual impersonation detection will be available later.",
    active: false
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

        ${
          item.active

            ? `
              border-white/10
              bg-[#091525]/80
              hover:-translate-y-1
              hover:border-cyan-400/30
              hover:bg-[#0b1a2d]
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

        <div
          className={`
          grid
          h-11
          w-11
          place-items-center
          rounded-xl

          ${
            item.active

              ? `
                bg-cyan-400/10
                text-cyan-300
              `

              : `
                bg-white/[.04]
                text-slate-500
              `
          }
          `}
        >

          <Icon size={21} />

        </div>


        {item.active ? (

          <ArrowRight
            size={17}
            className="
            text-slate-700
            transition
            group-hover:translate-x-1
            group-hover:text-cyan-400
            "
          />

        ) : (

          <span
            className="
            rounded-full
            border
            border-white/10
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


      <h3
        className="
        mt-5
        font-bold
        text-white
        "
      >

        {item.title}

      </h3>


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


      <div
        className="
        mt-5
        text-[10px]
        font-bold
        uppercase
        tracking-widest
        text-slate-600
        "
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