import { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "../Context/AlertContext";

function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const { showAlert } = useAlert();
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
        if (res.data.avatar) {
          setPreview(`${BASE_URL}/avatars/${res.data.avatar}`);
        }
      } catch (err) {
        console.error("Gagal mengambil profil:", err);
        showAlert("error", "Gagal mengambil data profil");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/profile`, profile, {
        withCredentials: true,
      });
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const res = await axios.post(`${BASE_URL}/profile/avatar`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        if (res.data.avatar) {
          setPreview(`${BASE_URL}/avatars/${res.data.avatar}`);
        }
      }
      showAlert("success", "Profil berhasil diperbarui");
      setAvatar(null);
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      showAlert("error", "Gagal menyimpan perubahan");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-600 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-white">👤</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <input id="avatarInput" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          <label htmlFor="avatarInput" className="bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl cursor-pointer text-center">
            Upload Baru
          </label>
          <button
            type="button"
            onClick={() => {
              setAvatar(null);
              setPreview(null);
              const input = document.getElementById("avatarInput");
              if (input) input.value = null;
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl"
          >
            Hapus Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">Nama Depan</label>
          <input type="text" name="firstName" value={profile.firstName || ''} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm text-gray-300">Nama Belakang</label>
          <input type="text" name="lastName" value={profile.lastName || ''} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Email</label>
          <input type="email" name="email" value={profile.email || ''} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Nomor Handphone</label>
          <input type="tel" name="phone" value={profile.phone || ''} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#3B3B3B] text-white outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold text-sm text-gray-300">Alamat</label>
          <textarea rows="3" name="address" value={profile.address || ''} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#3B3B3B] text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-sm text-gray-300">Gender</label>
          <div className="flex gap-4">
            <label className="flex flex-1 items-center gap-2 bg-[#3B3B3B] px-4 py-2.5 rounded-lg font-medium text-gray-300 cursor-pointer">
              <input type="radio" name="gender" value="Laki-laki" checked={profile.gender === "Laki-laki"} onChange={handleChange} className="w-4 h-4 accent-blue-500" />
              Laki-laki
            </label>
            <label className="flex flex-1 items-center gap-2 bg-[#3B3B3B] px-4 py-2.5 rounded-lg font-medium text-gray-300 cursor-pointer">
              <input type="radio" name="gender" value="Perempuan" checked={profile.gender === "Perempuan"} onChange={handleChange} className="w-4 h-4 accent-blue-500" />
              Perempuan
            </label>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <button type="submit" className="w-full sm:w-auto bg-[#3471FF] hover:bg-blue-600 text-white text-base font-bold py-3 px-6 rounded-xl transition duration-150">
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}

export default ProfileSettings;