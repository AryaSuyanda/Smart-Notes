function PasswordSettings() {
  return (
    <form className="flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold self-center mb-10 mt-12">Ubah Password Kamu</h2>
      <div className="">
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">Password Saat Ini</label>
        <input
          type="password"
          className="w-[322px] p-3 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">Password Baru</label>
        <input
          type="password"
          className="w-[322px]  p-3 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">Konfirmasi Password Baru</label>
        <input
          type="password"
          className="w-[322px]  p-3 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
      </div>

      <div className="md:col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          className="w-[322px] bg-[#3471FF] hover:bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-xl transition duration-150"
        >
          Simpan Password
        </button>
      </div>
    </form>
  );
}

export default PasswordSettings;
