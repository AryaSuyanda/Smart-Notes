import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import { jwtDecode } from "jwt-decode";

import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: emailOrUsername,
          password,
        },
        {
          withCredentials: true, // ⬅️ Tambahkan ini
        }
      );
      console.log("Respon dari server:", res);

      setAlertType("success");
      setMsg("Login berhasil!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/NotesPage"); // atau halaman tujuan lain
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.log("Terjadi error:", error);

        setShowAlert(false);
        setMsg("");
        setTimeout(() => {
          setMsg(error.response.data.msg || "Login gagal");
          setAlertType("error");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 4000);
        }, 50);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center px-4">
      {showAlert && <Alert type={alertType} message={msg} />}
      <div className="w-full max-w-7xl h-[650px] bg-[#2B2B2B] rounded-[53px] flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full max-w-[524px] bg-[#1E2128] rounded-[53px] flex flex-col justify-center items-center px-6 py-12">
          <h1 className="text-3xl font-light text-white -translate-y-[180px]">
            Welcome to{" "}
            <span className="font-bold text-[#3471FF]">SmartNotes</span>
          </h1>
          <p className="text-white mt-8 font-bold text-2xl text-left w-full leading-snug -translate-y-[-130px] -translate-x-[-70px]">
            Catat <span className="font-extrabold">Lebih Cerdas</span>,
            <br />
            <span className="text-gray-400 font-medium">Ingat Lebih Lama</span>
          </p>
        </div>
        {/* Right Section */}
        <div className="relative w-full bg-[#2B2B2B] text-white flex flex-col justify-center items-center px-6 py-12">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm space-y-4 -translate-y-7"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <div>
              <input
                type="text"
                placeholder="Username atau Email"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-300"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-[12px] h-12 text-white font-bold bg-[#3471FF] hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Tidak punya akun?{" "}
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
                href="https://www.instagram.com/dicoding"
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
