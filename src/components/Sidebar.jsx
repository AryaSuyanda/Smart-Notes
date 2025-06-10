import { FaBookOpen, FaCog, FaSearch, FaRegFileAlt, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onTabChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Tentukan tab aktif berdasarkan path
  // Tentukan tab aktif berdasarkan path
  const currentPath = location.pathname;
  const activeTab = currentPath.startsWith("/SettingsPage")
    ? "SettingsPage"
    : currentPath.startsWith("/AddNotePage")
    ? "AddNotePage"
    : "NotesPage";

  return (
    <div className="w-full h-screen max-w-[320px] bg-[#272727] text-white px-6 py-6 rounded-r-[2rem] flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari Catatan"
          className="w-full bg-[#333333] text-white h-10 px-4 pr-10 rounded-[12px] placeholder-gray-400 focus:outline-none"
        />
        <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>

      {/* Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Kategori</p>
        <div className="flex flex-wrap gap-2">
          {["Coding", "Tasks", "School"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-[#2B2B2B] rounded-full text-[#3471FF] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Menu */}
      <div className="flex flex-col gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
            activeTab === "NotesPage"
              ? "bg-[#3471FF] text-white"
              : "hover:bg-[#1F1F1F]"
          }`}
          onClick={() => {
            navigate("/NotesPage");
            onTabChange?.("NotesPage");
          }}
        >
          <FaBookOpen />
          Notes
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
            activeTab === "SettingsPage"
              ? "bg-[#3471FF] text-white"
              : "hover:bg-[#151515]"
          }`}
          onClick={() => {
            navigate("/SettingsPage");
            onTabChange?.("SettingsPage");
          }}
        >
          <FaCog />
          Pengaturan akun
        </button>
      </div>

      {/* Daftar Catatan */}
      <div className="overflow-y-auto custom-scrollbar pr-2">
        <p className="text-gray-400 text-sm font-bold mb-2">Catatan kamu</p>
        <div className="flex flex-col gap-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
              activeTab === "AddNotePage"
                ? "bg-[#3471FF] text-white"
                : "hover:bg-[#151515]"
            }`}
            onClick={() => {
              navigate("/AddNotePage");
              onTabChange?.("AddNotePage");
            }}
          >
            <FaPlus />
            Tambah Catatan
          </button>
        </div>
      </div>
    </div>
  );
}
