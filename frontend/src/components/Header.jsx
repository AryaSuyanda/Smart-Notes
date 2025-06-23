import { FaBars } from 'react-icons/fa';

function Header({ title, toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sticky top-0 bg-[#1B1B1B] z-10 border-b border-gray-700/50">
      <h1 className="text-xl md:text-2xl font-bold text-white truncate">
        {title || "SmartNotes"}
      </h1>

      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-white lg:hidden hover:bg-[#272727] focus:outline-none"
        aria-label="Buka menu"
      >
        <FaBars size={20} />
      </button>
    </header>
  );
}

export default Header;