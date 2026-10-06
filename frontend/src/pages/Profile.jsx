import {
  Camera,
  Mail,
  Save,
  Trash2,
  UserRound
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  getProfile,
  saveProfile
} from "../services/auth";


export default function Profile() {

  const [
    profile,
    setProfile
  ] = useState(
    getProfile()
  );


  const [
    saved,
    setSaved
  ] = useState(false);


  useEffect(() => {

    setProfile(
      getProfile()
    );

  }, []);


  const update = (
    key,
    value
  ) => {

    setProfile(
      previous => ({
        ...previous,
        [key]: value
      })
    );

  };


  const save = () => {

    saveProfile(
      profile
    );

    setSaved(true);


    setTimeout(
      () => setSaved(false),
      1800
    );

  };


  const upload = (
    event
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const reader =
      new FileReader();


    reader.onload = () => {

      update(
        "avatar",
        reader.result
      );

    };


    reader.readAsDataURL(
      file
    );

  };


  const remove = () => {

    update(
      "avatar",
      ""
    );

  };


  return (

    <div
      className="
      mx-auto
      max-w-4xl
      space-y-6
      "
    >

      <div>

        <div className="eyebrow">

          Identity Center

        </div>


        <h1
          className="
          page-title
          mt-2
          "
        >

          My Profile

        </h1>


        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >

          Manage your CyberGuard
          profile and account
          information.

        </p>

      </div>


      <section
        className="
        glass
        rounded-2xl
        p-6
        md:p-8
        "
      >

        {/* PROFILE HEADER */}

        <div
          className="
          flex
          flex-col
          items-center
          gap-6
          border-b
          border-white/10
          pb-7
          sm:flex-row
          "
        >

          <div className="relative">

            {profile.avatar ? (

              <img
                src={profile.avatar}
                alt="Profile"
                className="
                h-28
                w-28
                rounded-3xl
                object-cover
                ring-2
                ring-cyan-400/20
                "
              />

            ) : (

              <div
                className="
                grid
                h-28
                w-28
                place-items-center
                rounded-3xl
                bg-gradient-to-br
                from-cyan-400
                to-blue-500
                text-3xl
                font-black
                text-slate-950
                "
              >

                {
                  (
                    profile.username ||
                    "SH"
                  )
                    .slice(0, 2)
                    .toUpperCase()
                }

              </div>

            )}


            <label
              className="
              absolute
              -bottom-2
              -right-2
              grid
              h-10
              w-10
              cursor-pointer
              place-items-center
              rounded-xl
              border
              border-slate-800
              bg-cyan-400
              text-slate-950
              shadow-xl
              "
            >

              <Camera
                size={17}
              />

              <input
                type="file"
                accept="image/*"
                onChange={upload}
                className="hidden"
              />

            </label>

          </div>


          <div>

            <h2
              className="
              text-xl
              font-bold
              text-white
              "
            >

              {
                profile.username ||
                "CyberGuard User"
              }

            </h2>


            <p
              className="
              mt-1
              text-sm
              text-slate-500
              "
            >

              {
                profile.email ||
                "No email set"
              }

            </p>


            <div
              className="
              mt-4
              flex
              flex-wrap
              gap-2
              "
            >

              <label
                className="
                btn-secondary
                cursor-pointer
                "
              >

                <Camera size={15} />

                Upload Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={upload}
                  className="hidden"
                />

              </label>


              <button
                onClick={remove}
                className="
                btn-secondary
                text-red-300
                "
              >

                <Trash2
                  size={15}
                />

                Delete Image

              </button>

            </div>

          </div>

        </div>


        {/* FORM */}

        <div
          className="
          mt-7
          grid
          gap-5
          md:grid-cols-2
          "
        >

          <label>

            <span
              className="
              mb-2
              block
              text-xs
              font-semibold
              text-slate-400
              "
            >

              Username

            </span>


            <div className="relative">

              <UserRound
                size={16}
                className="
                absolute
                left-3
                top-3.5
                text-slate-600
                "
              />


              <input

                value={
                  profile.username ||
                  ""
                }

                onChange={
                  event =>
                    update(
                      "username",
                      event.target.value
                    )
                }

                className="
                input
                pl-10
                "

              />

            </div>

          </label>


          <label>

            <span
              className="
              mb-2
              block
              text-xs
              font-semibold
              text-slate-400
              "
            >

              Email

            </span>


            <div className="relative">

              <Mail
                size={16}
                className="
                absolute
                left-3
                top-3.5
                text-slate-600
                "
              />


              <input

                value={
                  profile.email ||
                  ""
                }

                onChange={
                  event =>
                    update(
                      "email",
                      event.target.value
                    )
                }

                className="
                input
                pl-10
                "

              />

            </div>

          </label>

        </div>


        {/* SAVE */}

        <div
          className="
          mt-7
          flex
          items-center
          justify-between
          border-t
          border-white/10
          pt-6
          "
        >

          <span
            className={`
            text-xs
            font-semibold

            ${
              saved
                ? "text-emerald-400"
                : "text-slate-600"
            }

            `}
          >

            {saved
              ? "Profile saved successfully."
              : "Changes are stored locally in this demo."
            }

          </span>


          <button
            onClick={save}
            className="btn-primary"
          >

            <Save size={16} />

            Save Profile

          </button>

        </div>

      </section>

    </div>

  );

}