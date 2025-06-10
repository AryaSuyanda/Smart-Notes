import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotesPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Catatan Pertama",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets ",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 2,
      title: "Catatan Kedua",
      content: "Isi catatan kedua...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 3,
      title: "Catatan Ketiga",
      content: "Isi catatan ketiga...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 1,
      title: "Catatan Pertama",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets ",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 2,
      title: "Catatan Kedua",
      content: "Isi catatan kedua...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 3,
      title: "Catatan Ketiga",
      content: "Isi catatan ketiga...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 1,
      title: "Catatan Pertama",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets ",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 2,
      title: "Catatan Kedua",
      content: "Isi catatan kedua...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 3,
      title: "Catatan Ketiga",
      content: "Isi catatan ketiga...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 1,
      title: "Catatan Pertama",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets ",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 2,
      title: "Catatan Kedua",
      content: "Isi catatan kedua...",
      date: "12-Juni-2025, 17:00 WIB",
    },
    {
      id: 3,
      title: "Catatan Ketiga",
      content: "Isi catatan ketiga...",
      date: "12-Juni-2025, 17:00 WIB",
    },
  ]);

  const handleShare = (title) => {
    alert(`Bagikan catatan: ${title}`);
  };

  return (
    <div className="h-screen bg-[#1B1B1B] flex overflow-y-auto custom-scrollbar pr-2">
      {/* Sidebar */}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <Header title="Daftar Catatan" />

          {/* Tombol Tambah Catatan */}
          <Link
            to="/AddNotePage"
            className="flex items-center gap-2 bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-200"
          >
            <FaPlus />
            Tambah Catatan
          </Link>
        </div>

        {/* Daftar Catatan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              date={note.date}
              onShare={() => handleShare(note.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
