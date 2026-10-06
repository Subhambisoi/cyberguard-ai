import {
  LogOut,
  Settings,
  UserRound
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  logout
} from "../services/auth";


export default function ProfileDropdown({
  user,
  onClose
}) {

  const navigate = useNavigate();


  const navigateTo = (
    path
  ) => {

    onClose?.();

    navigate(path);

  };


  const handleLogout = () => {

    logout();

    navigate("/signin");

  };


  return (

    <div
      className="
      absolute
      right-0
      top-12
      z-50
      w-64
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-[#091525]
      shadow-2xl
      shadow-black/50
      "
    >

      <div
        className="
        border-b
        border-white/10
        p-4
        "
      >

        <p className="font-semibold text-white">

          {user.username}

        </p>

        <p
          className="
          mt-1
          truncate
          text-xs
          text-slate-500
          "
        >

          {user.email}

        </p>

      </div>


      <div className="p-2">

        <button
          onClick={() =>
            navigateTo("/profile")
          }

          className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-sm
          text-slate-300
          hover:bg-white/[.05]
          "
        >

          <UserRound size={17} />

          Profile

        </button>


        <button
          onClick={() =>
            navigateTo("/settings")
          }

          className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-sm
          text-slate-300
          hover:bg-white/[.05]
          "
        >

          <Settings size={17} />

          Settings

        </button>


        <button
          onClick={handleLogout}

          className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-sm
          text-red-300
          hover:bg-red-400/10
          "
        >

          <LogOut size={17} />

          Logout

        </button>

      </div>

    </div>

  );

}