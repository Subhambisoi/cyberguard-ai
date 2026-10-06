const USER_KEY =
  "cyberguard_user";

const PROFILE_KEY =
  "cyberguard_profile";


export function getUser() {

  try {

    return (
      JSON.parse(
        localStorage.getItem(
          USER_KEY
        )
      ) ||

      {
        username: "Shreyas",
        email: "security@cyberguard.local"
      }
    );

  } catch {

    return {

      username: "Shreyas",

      email:
        "security@cyberguard.local"

    };

  }

}


export function signUp(
  user
) {

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );


  localStorage.setItem(

    PROFILE_KEY,

    JSON.stringify({

      ...user,

      status: "Active",

      joined:
        new Date()
          .toLocaleDateString()

    })

  );

}


export function signIn(
  user
) {

  localStorage.setItem(

    USER_KEY,

    JSON.stringify(user)

  );

}


export function getProfile() {

  try {

    return (

      JSON.parse(
        localStorage.getItem(
          PROFILE_KEY
        )
      ) ||

      getUser()

    );

  } catch {

    return getUser();

  }

}


export function saveProfile(
  profile
) {

  localStorage.setItem(

    PROFILE_KEY,

    JSON.stringify(profile)

  );


  localStorage.setItem(

    USER_KEY,

    JSON.stringify({

      username:
        profile.username,

      email:
        profile.email

    })

  );

}


export function logout() {

  localStorage.removeItem(
    USER_KEY
  );

}