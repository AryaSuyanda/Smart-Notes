import { useState } from "react";
import AccountSidebar from "../components/AccountSidebar";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";

function SettingPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-white">
      <div className="bg-[#2B2B2B] rounded-2xl w-full max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden min-h-[70vh]">
        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar">
          {activeTab === "profile" ? <ProfileSettings /> : <PasswordSettings />}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;