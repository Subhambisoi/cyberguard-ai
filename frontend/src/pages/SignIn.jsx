import {
  ShieldCheck,
  ArrowRight
} from "lucide-react";

import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  signIn
} from "../services/auth";


export default function SignIn() {

  const navigate =
    useNavigate();


  const [
    form,
    setForm
  ] = useState({

    username: "",

    email: "",

    password: ""

  });


  const submit = (
    event
  ) => {

    event.preventDefault();


    signIn({

      username:
        form.username ||
        "Shreyas",

      email:
        form.email ||
        "security@cyberguard.local"

    });


    navigate(
      "/dashboard"
    );

  };


  return (

    <div
      className="
      grid
      min-h-screen
      place-items-center
      p-5
      "
    >

      <div
        className="
        grid
        w-full
        max-w-5xl
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#091525]/90
        shadow-2xl
        lg:grid-cols-2
        "
      >

        {/* LEFT */}

        <div
          className="
          hidden
          min-h-[650px]
          flex-col
          justify-between
          bg-gradient-to-br
          from-cyan-400/10
          via-blue-500/5
          to-transparent
          p-10
          lg:flex
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
              h-11
              w-11
              place-items-center
              rounded-xl
              bg-cyan-400
              text-slate-950
              "
            >

              <ShieldCheck />

            </div>


            <span
              className="
              font-black
              text-white
              "
            >

              CYBERGUARD

            </span>

          </div>


          <div>

            <div className="eyebrow">

              Secure Access

            </div>


            <h1
              className="
              mt-3
              text-4xl
              font-black
              text-white
              "
            >

              Your security
              command center.

            </h1>


            <p
              className="
              mt-4
              max-w-md
              text-sm
              leading-6
              text-slate-500
              "
            >

              Sign in to monitor
              threats, investigate
              incidents and manage
              your defense workspace.

            </p>

          </div>


          <p
            className="
            font-mono
            text-[10px]
            uppercase
            tracking-widest
            text-slate-700
            "
          >

            BPUT TECH CARNIVAL
            · DEMO PLATFORM

          </p>

        </div>


        {/* RIGHT */}

        <div
          className="
          p-7
          md:p-10
          "
        >

          <div
            className="
            lg:hidden
            "
          >

            <div className="eyebrow">

              CYBERGUARD

            </div>

          </div>


          <h2
            className="
            mt-4
            text-2xl
            font-black
            text-white
            "
          >

            Welcome back

          </h2>


          <p
            className="
            mt-2
            text-sm
            text-slate-500
            "
          >

            Enter your demo
            account details.

          </p>


          <form
            onSubmit={submit}
            className="
            mt-8
            space-y-4
            "
          >

            <input
              className="input"
              placeholder="Username"
              value={
                form.username
              }
              onChange={
                event =>
                  setForm({
                    ...form,
                    username:
                      event.target.value
                  })
              }
            />


            <input
              className="input"
              type="email"
              placeholder="Email"
              value={
                form.email
              }
              onChange={
                event =>
                  setForm({
                    ...form,
                    email:
                      event.target.value
                  })
              }
            />


            <input
              className="input"
              type="password"
              placeholder="Password"
              value={
                form.password
              }
              onChange={
                event =>
                  setForm({
                    ...form,
                    password:
                      event.target.value
                  })
              }
            />


            <button
              className="
              btn-primary
              w-full
              "
            >

              Sign In

              <ArrowRight
                size={16}
              />

            </button>

          </form>


          <p
            className="
            mt-6
            text-center
            text-xs
            text-slate-500
            "
          >

            Don't have an account?

            {" "}

            <Link
              to="/signup"
              className="
              font-bold
              text-cyan-400
              "
            >

              Create account

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}