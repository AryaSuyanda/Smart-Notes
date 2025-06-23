import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useAlert } from "../Context/AlertContext";
import { FaInstagram, FaGithub, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confPassword,
      });
      showAlert("success", "Anda Berhasil Terdaftar! Silakan login.");
      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000);
    } catch (error) {
      if (error.response) {
        showAlert("error", error.response.data.msg || "Pendaftaran gagal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-auto md:h-[650px] bg-[#2B2B2B] rounded-3xl md:rounded-[53px] flex flex-col md:flex-row overflow-hidden shadow-lg">
        
        <div className="w-full md:max-w-[524px] bg-[#1E2128] flex flex-col justify-center items-center text-center md:text-left p-12 md:rounded-[53px]">
          <h1 className="text-3xl font-light text-white md:-translate-y-[180px]">
            Welcome to <span className="font-bold text-[#3471FF]">SmartNotes</span>
          </h1>
          <p className="text-white mt-4 md:mt-8 font-bold text-2xl leading-snug md:-translate-y-[-130px] md:-translate-x-[-70px]">
            Catat <span className="font-extrabold">Lebih Cerdas</span>,
            <br />
            <span className="text-gray-400 font-medium">Ingat Lebih Lama</span>
          </p>
        </div>

        <div className="relative w-full text-white flex flex-col justify-center items-center p-8 md:p-12">
          <form
            onSubmit={Register}
            className="w-full max-w-sm space-y-4 md:-translate-y-12"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Daftarkan Akun Baru
            </h2>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3471FF] placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3471FF] placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3471FF] placeholder-gray-400 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-300"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3471FF] placeholder-gray-400 pr-12"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold bg-[#3471FF] hover:bg-blue-700 transition-colors duration-200"
            >
              Daftar
            </button>
             <p className="text-center text-sm text-gray-400 pt-4">
              Sudah punya akun?{" "}
              <Link to="/LoginPage" className="text-[#3471FF] font-medium hover:underline">
                Login di sini
              </Link>
            </p>
          </form>

          <div className="w-full text-center mt-10 pt-6 border-t border-gray-700 md:absolute md:bottom-[60px] md:border-none md:pt-0 md:mt-0">
            <p className="text-xs text-gray-500 mb-3">
              developed by CC25-CR362 Team
            </p>
            <div className="flex justify-center gap-6 text-xl text-gray-400">
                <a href="https://www.instagram.com/dicoding" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
                <a href="https://github.com/AryaSuyanda/Smart-Notes" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
                <a href="https://www.linkedin.com/company/dicoding/" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;