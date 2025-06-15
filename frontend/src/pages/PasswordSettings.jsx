import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordSettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="flex flex-col gap-5 items-center">
      <h2 className="text-2xl font-bold self-center mb-10 mt-12">Ubah Password Kamu</h2>

      {/* Password Saat Ini */}
      <div className="relative w-[322px]">
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Password Saat Ini
        </label>
        <input
          type={showCurrent ? 'text' : 'password'}
          className="w-full p-3 pr-10 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
        <div
          onClick={() => setShowCurrent(!showCurrent)}
          className="absolute right-3 top-[47px] cursor-pointer text-white"
        >
          {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      {/* Password Baru */}
      <div className="relative w-[322px]">
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Password Baru
        </label>
        <input
          type={showNew ? 'text' : 'password'}
          className="w-full p-3 pr-10 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
        <div
          onClick={() => setShowNew(!showNew)}
          className="absolute right-3 top-[47px] cursor-pointer text-white"
        >
          {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      {/* Konfirmasi Password Baru */}
      <div className="relative w-[322px]">
        <label className="block mb-1 font-bold text-lg text-[#FFFFFF94]">
          Konfirmasi Password Baru
        </label>
        <input
          type={showConfirm ? 'text' : 'password'}
          className="w-full p-3 pr-10 rounded-[12px] bg-[#3B3B3B] text-white outline-none"
        />
        <div
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-[47px] cursor-pointer text-white"
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
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
