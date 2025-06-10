function ProfileSettings() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Foto Profil */}
      <div className="col-span-2 flex flex-col md:flex-row items-center gap-6 mb-4">
        <div className="w-32 h-32 bg-gray-600 rounded-xl flex items-center justify-center text-4xl">
          👤
        </div>
        <div className="space-x-4">
          <button
            type="button"
            className="bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
          >
            Upload baru
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl"
          >
            Hapus Avatar
          </button>
        </div>
      </div>

      {/* Form Isian */}
      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Nama Depan
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Nama Belakang
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Email
        </label>
        <input
          type="email"
          className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Nomor Handphone
        </label>
        <input
          type="tel"
          className="w-full p-3 rounded-[12px] bg-[#424242] text-white outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Alamat
        </label>
        <textarea
          rows="3"
          className="p-3 w-full h-full rounded-[12px] bg-[#424242] text-white outline-none resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col m-0">
        <div>
          <label className="block mb-2 font-bold text-lg text-[#FFFFFF94]">
            Gender
          </label>

          <div className="flex gap-4">
            <label className="flex w-full items-center gap-2  bg-[#424242] px-4 p-2 rounded-xl font-bold text-lg text-[#FFFFFF94]">
              <input type="radio" name="gender" className="accent-blue-500" />
              Laki - laki
            </label>
            <label className="flex w-full items-center gap-2 bg-[#424242] px-4 p-2 rounded-xl font-bold text-lg text-[#FFFFFF94]">
              <input type="radio" name="gender" className="accent-blue-500" />
              Perempuan
            </label>
          </div>
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
  );
}

export default ProfileSettings;
