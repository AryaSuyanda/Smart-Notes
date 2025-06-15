import { FaUserCog, FaKey } from "react-icons/fa";

function AccountSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="h-full text-white px-6 py-8">

      <div className="space-y-3">
        {/* Tab: Pengaturan Profil */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition ${
            activeTab === "profile"
              ? "bg-[#3471FF] text-white"
              : "bg-[#2B2B2B] hover:bg-[#1F1F1F]"
          }`}
        >
          <FaUserCog />
          <span>Pengaturan Profile</span>
        </button>

        {/* Tab: Pengaturan Password */}
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition ${
            activeTab === "password"
              ? "bg-[#3471FF] text-white"
              : "bg-[#2B2B2B] hover:bg-[#1F1F1F]"
          }`}
        >
          <FaKey />
          <span>Pengaturan Password</span>
        </button>
      </div>
    </div>
  );
}

export default AccountSidebar;
