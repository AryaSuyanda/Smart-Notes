import { FaBookOpen, FaCog, FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Sidebar({ onTabChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const activeTab = currentPath.startsWith("/SettingsPage")
    ? "SettingsPage"
    : currentPath.startsWith("/AddNotePage")
    ? "AddNotePage"
    : "NotesPage";

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  // tab dynamic state
  const [tabs, setTabs] = useState([]);
  const [activeNoteTab, setActiveNoteTab] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await refreshToken();
      await getProfile();
    };

    fetchData();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      const accessToken = response.data.accessToken;
      if (!accessToken) return;

      const decoded = jwtDecode(accessToken);
      setName(decoded.name);
      sessionStorage.setItem("name", decoded.name);
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Gagal refresh token:",
        error.response?.data || error.message
      );
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setAvatar(res.data.avatar);
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
    }
  };

  const handleAddNoteTab = () => {
    const newTabId = `catatan-${Date.now()}`;
    const newTab = { id: newTabId, title: `Catatan ${tabs.length + 1}` };

    // Tambah tab dan langsung aktif
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setActiveNoteTab(newTabId);

    // Pindah halaman setelah update state
    // karena setState async, kita pakai trick: delay sejenak
    setTimeout(() => {
      navigate("/AddNotePage");
      onTabChange?.("AddNotePage");
    }, 0);
  };

  const handleCloseTab = (id) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    if (activeNoteTab === id) {
      setActiveNoteTab(null);
    }
  };

  return (
    <div className="w-full h-screen max-w-[320px] bg-[#272727] text-white px-6 py-6 rounded-r-[2rem] flex flex-col gap-6">
      {/* User Info */}
      {!isLoading && name && (
        <div className="flex items-center gap-3 mb-2">
          {avatar ? (
            <img
              src={`http://localhost:5000/avatars/${avatar}`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#3471FF] flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-gray-400 text-xs">Selamat datang</p>
            <p className="text-white text-sm font-semibold">{name}</p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari Catatan"
          className="w-full bg-[#333333] text-white h-10 px-4 pr-10 rounded-[12px] placeholder-gray-400 focus:outline-none"
        />
        <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>

      {/* Kategori */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Kategori</p>
        <div className="flex flex-wrap gap-2 cursor-pointer">
          {["Tugas", "Acara", "belanja", "Pengingat", "Ide", "lainnya"].map(
            (tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#2B2B2B] rounded-full text-[#3471FF] font-medium"
              >
                #{tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Tab Menu */}
      <div className="flex flex-col gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
            activeTab === "NotesPage"
              ? "bg-[#3471FF] text-white"
              : "hover:bg-[#151515]"
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
              activeTab === "AddNotePage" && activeNoteTab
                ? "bg-[#3471FF] text-white"
                : "bg-[#171717] text-gray-300 hover:bg-[#1f1f1f]"
            }`}
            onClick={handleAddNoteTab}
          >
            <FaPlus />
            Tambah Catatan
          </button>

          {/* Tab mini di bawahnya */}
          {tabs.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex justify-between items-center px-5 py-3 mb-1 rounded-[12px] cursor-pointer font-bold ${
                    activeNoteTab === tab.id
                      ? "bg-[#3471FF] text-white"
                      : "bg-[#171717] text-gray-300 hover:bg-[#1f1f1f]"
                  }`}
                  onClick={() => {
                    setActiveNoteTab(tab.id);
                   navigate(`/AddNotePage/${tab.id}`);
                    onTabChange?.("AddNotePage");
                  }}
                >
                  <span className="truncate text-sm">{tab.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(tab.id);
                    }}
                    className="ml-2 text-xs text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
