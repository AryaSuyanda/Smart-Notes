import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Semua");

  return (
    <div className="h-screen bg-[#1B1B1B] text-white flex overflow-hidden">
      
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar
          selectedLabel={selectedLabel}
          onSelectLabel={setSelectedLabel}
        />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="relative z-50">
            <Sidebar
              selectedLabel={selectedLabel}
              onSelectLabel={(label) => {
                setSelectedLabel(label);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex-1 custom-scrollbar">
          <Outlet context={{ selectedLabel }} />
        </div>
      </main>
    </div>
  );
}