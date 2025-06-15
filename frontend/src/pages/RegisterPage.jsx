import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [alertType, setAlertType] = useState("error");

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setAlertType("success");
      setMsg("Anda Berhasil Terdaftar!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/LoginPage");
      }, 2000); 
    } catch (error) {
      if (error.response) {
        setShowAlert(false); 
        setMsg(""); 

        setTimeout(() => {
          setMsg(error.response.data.msg);
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
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
          <form
            onSubmit={Register}
            className="w-full  max-w-sm space-y-4 -translate-y-12"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Daftarkan Akun Baru
            </h2>

            <div>
              <input
                type="name"
                placeholder="Username"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
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

            {/* Konfirmasi Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                className="w-full bg-neutral-700 text-white h-12 px-4 py-2 font-bold rounded-[12px] focus:outline-none placeholder-gray-400 pr-12"
                value={confPassword}
                onChange={(e) => setconfPassword(e.target.value)}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-[12px] h-12 text-white font-bold bg-[#3471FF] hover:bg-blue-700 transition-colors duration-200"
            >
              Daftar
            </button>
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

export default RegisterPage;
