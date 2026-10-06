import {
  ShieldCheck,
  UserPlus
} from "lucide-react";

import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  signUp
} from "../services/auth";


export default function SignUp() {

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


    signUp(
      form
    );


    navigate(
      "/profile"
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
        w-full
        max-w-lg
        rounded-3xl
        border
        border-white/10
        bg-[#091525]/95
        p-7
        shadow-2xl
        md:p-10
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


          <div>

            <p
              className="
              font-black
              text-white
              "
            >

              CYBERGUARD

            </p>


            <p
              className="
              font-mono
              text-[9px]
              uppercase
              tracking-widest
              text-cyan-400
              "
            >

              Create identity

            </p>

          </div>

        </div>


        <h1
          className="
          mt-8
          text-2xl
          font-black
          text-white
          "
        >

          Create your profile

        </h1>


        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >

          Your demo identity will
          be stored locally in this
          browser.

        </p>


        <form
          onSubmit={submit}
          className="
          mt-7
          space-y-4
          "
        >

          <input
            required
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
            required
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
            required
            minLength={4}
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

            <UserPlus
              size={16}
            />

            Create Account

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

          Already registered?

          {" "}

          <Link
            to="/signin"
            className="
            font-bold
            text-cyan-400
            "
          >

            Sign in

          </Link>

        </p>

      </div>

    </div>

  );

}