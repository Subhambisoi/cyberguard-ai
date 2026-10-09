import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />

      <div className="relative lg:pl-[260px]">
        <Topbar />

        <main className="relative min-h-[calc(100vh-72px)] p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}