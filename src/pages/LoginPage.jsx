import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center px-4">
      <div className="w-full max-w-7xl h-[650px] bg-[#2B2B2B] rounded-[53px] flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full max-w-[524px] bg-[#1E2128] rounded-[53px] flex flex-col justify-center items-center px-6 py-12">
          <h1 className="text-3xl font-light text-white -translate-y-[180px]">
            Welcome to{" "}
            <span className="font-bold text-[#3471FF]">SmartNotes</span>
          </h1>
          <p className="text-white mt-8 font-bold text-2xl text-left w-full leading-snug -translate-y-[-130px] -translate-x-[-70px]">
            <span className="text-white">
              Catat <span className="font-extrabold">Lebih Cerdas</span>,
            </span>
            <span className="text-gray-400 font-medium ">
              {" "}
              Ingat <br /> Lebih Lama
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="relative w-full bg-[#2B2B2B] text-white flex flex-col justify-center items-center px-6 py-12">
          <form className="w-full  max-w-sm space-y-4 -translate-y-7">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="show-password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password">Tampilkan Password</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-[12px] h-12 text-white font-bold bg-[#3471FF] hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>

            <p className=" text-center text-sm text-gray-400 mt-4">
              Tidak Punya akun?{" "}
              <Link
                to="/RegisterPage"
                className="text-[#3471FF] font-medium hover:underline"
              >
                Daftar akun baru
              </Link>
            </p>
          </form>

          {/* Footer */}
          <div className="text-center absolute bottom-[60px]">
            <p className="text-sm text-white mb-3">
              developed by CC25-CR362 Team
            </p>
            <div className="flex justify-center gap-4 text-2xl text-white">
              <a
                href="https://www.instagram.com/dicoding?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/AryaSuyanda/Smart-Notes"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/company/dicoding/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
