import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAlert } from "../Context/AlertContext";

function PasswordSettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert("error", "Semua field wajib diisi.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert("error", "Password baru dan konfirmasi tidak cocok.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showAlert("success", "Password berhasil diubah!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal mengubah password: " + err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">
          Ubah Password
        </h2>
        
        <div className="relative w-full">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Password Saat Ini</label>
          <input
            type={showCurrent ? "text" : "password"}
            className="w-full p-3 pr-10 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-9 cursor-pointer text-gray-400">
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="relative w-full">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Password Baru</label>
          <input
            type={showNew ? "text" : "password"}
            className="w-full p-3 pr-10 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div onClick={() => setShowNew(!showNew)} className="absolute right-3 top-9 cursor-pointer text-gray-400">
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="relative w-full">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Konfirmasi Password Baru</label>
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full p-3 pr-10 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-9 cursor-pointer text-gray-400">
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-[#3471FF] hover:bg-blue-600 text-white text-base font-bold py-3 px-6 rounded-xl transition duration-150">
            Simpan Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordSettings;