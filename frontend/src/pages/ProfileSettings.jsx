import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

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
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const BASE_URL = "http://localhost:5000";

  // Ambil profil saat komponen dimount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        if (res.data.avatar) {
          setPreview(`${BASE_URL}/avatars/${res.data.avatar}`);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil profil:", err);
        setAlert({ type: "error", message: "Gagal mengambil data profil" });
        setTimeout(() => setAlert({ message: "" }), 3000);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Submit profil
      await axios.put(`${BASE_URL}/profile`, profile, {
        withCredentials: true,
      });

      // 2. Upload avatar jika ada
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const res = await axios.post(`${BASE_URL}/profile/avatar`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        // Update preview avatar
        if (res.data.avatar) {
          setPreview(`${BASE_URL}/avatars/${res.data.avatar}`);
        }
      }

      setAlert({ type: "success", message: "Profil berhasil diperbarui" });

      // Reset semua field kecuali preview
      setProfile({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
      });

      // Avatar tetap disimpan di preview meskipun input kosong
      setAvatar(null);
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setAlert({ type: "error", message: "Gagal menyimpan perubahan" });
    } finally {
      setTimeout(() => setAlert({ message: "" }), 3000);
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
    <>
      <Alert type={alert.type} message={alert.message} />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Avatar dan tombol */}
        <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 mb-4">
          <div className="w-32 h-32 bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-4xl text-white">👤</span>
            )}
          </div>

          {/* Tombol avatar */}
          <div className="space-x-4 flex flex-wrap">
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <label
              htmlFor="avatarInput"
              className="bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl cursor-pointer"
            >
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

        {/* Input fields */}
        <div>
          <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
            Nama Depan
          </label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
            Nama Belakang
          </label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
            Nomor Handphone
          </label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
            Alamat
          </label>
          <textarea
            rows="3"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="p-3 w-full h-full rounded-[12px] bg-[#424242] text-white outline-none resize-none"
          ></textarea>
        </div>
        <div className="flex flex-col m-0">
          <label className="block mb-2 font-bold text-lg text-[#FFFFFF94]">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex w-full items-center gap-2 bg-[#424242] px-4 p-2 rounded-xl font-bold text-lg text-[#FFFFFF94] cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Laki-laki"
                checked={profile.gender === "Laki-laki"}
                onChange={handleChange}
                className="accent-blue-500"
              />
              Laki - laki
            </label>
            <label className="flex w-full items-center gap-2 bg-[#424242] px-4 p-2 rounded-xl font-bold text-lg text-[#FFFFFF94] cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Perempuan"
                checked={profile.gender === "Perempuan"}
                onChange={handleChange}
                className="accent-blue-500"
              />
              Perempuan
            </label>
          </div>

          <div className="w-full mt-6">
            <button
              type="submit"
              className="w-full bg-[#3471FF] hover:bg-blue-600 text-white text-lg font-bold py-3 px-6 rounded-xl transition duration-150"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfileSettings;
