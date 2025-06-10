import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"
import AccountSidebar from "../components/AccountSidebar";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";

function SettingPage() {
  const [activeTab, setActiveTab] = useState("profile"); // default tab

  return (
    <div className="h-screen bg-[#1B1B1B] flex">
      {/* Sidebar */}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Konten Utama */}
      <div className="flex flex-col flex-1 overflow-y-auto p-8">
        <Header title="Pengaturan Akun" />

        <div className="flex bg-[#2B2B2B] rounded-[53px] w-full max-w-[1000px] mx-auto flex-1 overflow-hidden text-white font-semibold">
          {/* Sidebar Pengaturan Akun */}
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Konten Tab */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeTab === "profile" ? (
              <ProfileSettings />
            ) : (
              <PasswordSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
