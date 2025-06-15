// src/layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-screen bg-[#1B1B1B] flex overflow-hidden">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
