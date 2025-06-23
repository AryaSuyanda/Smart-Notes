import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useNoteTabs } from "../Context/NoteTabsContext";
import { useAlert } from "../Context/AlertContext"; // Pastikan ini di-import

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const BASE_URL = "http://localhost:5000";

  const { addNewTab, setActiveNoteTab, tabs } = useNoteTabs();
  const { showAlert } = useAlert(); // Ambil fungsi showAlert dari context
  const navigate = useNavigate();

  const { selectedLabel } = useOutletContext();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/notes`, {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (error) {
        console.error("Gagal mengambil catatan:", error);
      }
    };

    fetchNotes();
    window.addEventListener("focus", fetchNotes);

    return () => {
      window.removeEventListener("focus", fetchNotes);
    };
  }, []);

  const filteredNotes =
    selectedLabel === "Semua"
      ? notes
      : notes.filter(
          (note) =>
            (note.label || "").toLowerCase() === selectedLabel.toLowerCase()
        );

  const handleShare = async (note) => {
    const textToCopy = `Judul: ${note.title}\n\n${note.content}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      showAlert("success", "Catatan berhasil disalin ke clipboard!");
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
      showAlert("error", "Gagal menyalin catatan.");
    }
  };

  const handleNoteClick = (note) => {
    const existingTab = tabs.find((tab) => tab.noteId === note.id);
    if (existingTab) {
      setActiveNoteTab(existingTab.id);
      navigate(`/AddNotePage/${existingTab.id}`);
    } else {
      const newTabId = `catatan-${Date.now()}`;
      const newTab = {
        id: newTabId,
        title: note.title,
        content: note.content,
        noteId: note.id,
      };
      addNewTab(newTab);
      setActiveNoteTab(newTabId);
      localStorage.setItem(`note-${newTabId}`, JSON.stringify(newTab));
      navigate(`/AddNotePage/${newTabId}`);
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(isoDate).toLocaleString("id-ID", options).replace(/\./g, ':').replace(' ', ', ');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            date={formatDate(note.createdAt)}
            onShare={() => handleShare(note)}
            onClick={() => handleNoteClick(note)}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;