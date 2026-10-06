export default function Explanation({
  text
}) {

  return (

    <div className="glass rounded-2xl p-5">

      <p className="font-semibold text-white">

        Explanation

      </p>


      <p
        className="
        mt-3
        text-sm
        leading-7
        text-slate-400
        "
      >

        {text}

      </p>

    </div>

  );

}