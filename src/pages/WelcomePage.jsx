import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin, FaPen } from "react-icons/fa";

function WelcomePage() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-neutral-900 text-white">
      <main className="flex flex-col items-center justify-center text-center flex-grow">
        <h1 className="text-2xl md:text-3xl font-light">
          Welcome to{" "}
          <span className="font-semibold text-white">SmartNotes</span>
        </h1>
        <Link
          to="/LoginPage"
          className="mt-6 text-white px-12 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-md flex items-center gap-4"
        >
          <FaPen />
          New Note
        </Link>
      </main>

      <footer className="pb-6 text-center text-sm text-white">
        <p className="mb-5">developed by CC25-CR362 Team</p>
        <div className="justify-center gap-4 flex flex-row text-2xl">
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
      </footer>
    </div>
  );
}

export default WelcomePage;
