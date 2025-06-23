import { FaBookOpen, FaCog, FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNoteTabs } from "../Context/NoteTabsContext";

export default function Sidebar({
  selectedLabel = "Semua",
  onSelectLabel = () => {},
  onClose, // Prop baru untuk menutup sidebar dari parent
}) {
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

  const { tabs, activeNoteTab, setActiveNoteTab, addNewTab, closeTab } = useNoteTabs();

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
      console.error("Gagal refresh token:", error.response?.data || error.message);
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
    addNewTab({ id: newTabId });
    navigate(`/AddNotePage/${newTabId}`);
    onClose?.(); // Tutup sidebar setelah aksi
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "DELETE",
        credentials: "include",
      });
      localStorage.clear();
      window.location.href = "/LoginPage";
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  // Wrapper function untuk navigasi agar sidebar tertutup
  const navigateAndClose = (path) => {
    navigate(path);
    onClose?.(); // Tutup sidebar setelah navigasi
  };

  // Wrapper function untuk memilih label agar sidebar tertutup
  const selectLabelAndClose = (label) => {
    onSelectLabel(label);
    onClose?.(); // Tutup sidebar setelah memilih filter
  };

  return (
    <div className="w-80 h-screen bg-[#272727] text-white p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-2 w-full">
        {!isLoading && name ? (
          <div className="flex items-center gap-3">
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
        ) : (
          <div className="w-10 h-10"></div> // Placeholder agar layout stabil
        )}

        <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
          <FaTimes size={20} />
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Cari Catatan"
          className="w-full bg-[#333333] text-white h-10 px-4 pr-10 rounded-[12px] placeholder-gray-400 focus:outline-none"
        />
        <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-2">Kategori</p>
        <div className="flex flex-wrap gap-2">
          {["Semua", "Tugas", "Acara", "Belanja", "Pengingat", "Ide", "lainnya"].map(
            (tag) => (
              <span
                key={tag}
                onClick={() => selectLabelAndClose(tag)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                  selectedLabel === tag
                    ? "bg-[#3471FF] text-white"
                    : "bg-[#2B2B2B] text-[#3471FF] hover:bg-[#3471FF33]"
                }`}
              >
                #{tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
            activeTab === "NotesPage" ? "bg-[#3471FF] text-white" : "hover:bg-[#151515]"
          }`}
          onClick={() => navigateAndClose("/NotesPage")}
        >
          <FaBookOpen />
          Notes
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 ${
            activeTab === "SettingsPage" ? "bg-[#3471FF] text-white" : "hover:bg-[#151515]"
          }`}
          onClick={() => navigateAndClose("/SettingsPage")}
        >
          <FaCog />
          Pengaturan akun
        </button>
      </div>

      <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow flex flex-col">
        <p className="text-gray-400 text-sm font-bold mb-2">Catatan kamu</p>
        <div className="flex flex-col gap-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-left font-medium transition duration-150 text-gray-300 hover:bg-[#151515]`}
            onClick={handleAddNoteTab}
          >
            <FaPlus />
            Tambah Catatan
          </button>
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
                navigateAndClose(`/AddNotePage/${tab.id}`);
              }}
            >
              <span className="truncate text-sm">{tab.title || "Judul Catatan"}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="ml-2 text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="text-[#ff5c5c] w-full text-center text-sm font-semibold hover:underline transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}