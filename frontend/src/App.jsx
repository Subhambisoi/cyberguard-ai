import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {

  return (

    <Routes>

      {/* Authentication */}

      <Route
        path="/signin"
        element={<SignIn />}
      />

      <Route
        path="/signup"
        element={<SignUp />}
      />


      {/* Main Application */}

      <Route
        element={<AppLayout />}
      >

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/analyze"
          element={<Analyze />}
        />

        <Route
          path="/incidents"
          element={<Incidents />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>


      {/* Unknown URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>

  );

}
