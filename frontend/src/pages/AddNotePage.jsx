import { useState, useRef, useEffect } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteTabs } from "../Context/NoteTabsContext";
import { useAlert } from "../Context/AlertContext";
import Alert from "../components/Alert";

function AddNotePage() {
  const { tabId } = useParams();
  const { tabs, updateTabTitle, updateTabNoteId, removeTab } = useNoteTabs();
  const { showAlert, alert } = useAlert();
  const navigate = useNavigate();

  const note = tabs.find((tab) => tab.id === tabId);

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [noteId, setNoteId] = useState(note?.noteId || null);

  const textareaRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`note-${tabId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTitle(parsed.title || note?.title || "");
      setContent(parsed.content || "");
      if (parsed.noteId) setNoteId(parsed.noteId);
    } else {
      setTitle(note?.title || "");
    }
    setIsTyping(false);
  }, [tabId, note]);

  useEffect(() => {
    if (!isTyping) {
      const tab = tabs.find((tab) => tab.id === tabId);
      if (tab && tab.title !== title) {
        setTitle(tab.title);
      }
    }
  }, [tabs, tabId, isTyping, title]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSave = async () => {
    if ((title?.trim?.() || "") === "" || (content?.trim?.() || "") === "") {
      showAlert("error", "Judul dan isi catatan tidak boleh kosong!");
      return;
    }
    try {
      let response;
      const body = JSON.stringify({ title, content });
      const headers = { "Content-Type": "application/json" };
      const credentials = "include";

      if (noteId) {
        response = await fetch(`http://localhost:5000/notes/${noteId}`, {
          method: "PUT",
          credentials,
          headers,
          body,
        });
      } else {
        response = await fetch("http://localhost:5000/notes", {
          method: "POST",
          credentials,
          headers,
          body,
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menyimpan catatan.");

      if (!noteId) {
        updateTabNoteId(tabId, data.id);
        setNoteId(data.id);
      }
      updateTabTitle(tabId, title);
      localStorage.setItem(`note-${tabId}`, JSON.stringify({ title, content, noteId: data.id || noteId }));
      showAlert("success", "Catatan berhasil disimpan!");
    } catch (err) {
      console.error("Gagal menyimpan catatan:", err);
      showAlert("error", err.message || "Gagal menyimpan catatan.");
    }
  };

  const handleDelete = async () => {
    if (!noteId) {
      localStorage.removeItem(`note-${tabId}`);
      showAlert("success", "Catatan berhasil dihapus.");
      removeTab(tabId);
      navigate("/NotesPage");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      localStorage.removeItem(`note-${tabId}`);
      setNoteId(null);
      showAlert("success", "Catatan berhasil dihapus!");
      removeTab(tabId);
      navigate("/NotesPage");
    } catch (err) {
      console.error("Gagal menghapus catatan:", err);
      showAlert("error", err.message || "Gagal menghapus catatan.");
    }
  };

  return (
    <>
      <Alert
        type={alert.type}
        message={alert.message}
        className="left-1/2 transform -translate-x-1/2"
      />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-white">
        <div>
          <input
            type="text"
            placeholder="Judul Catatan"
            className="w-full p-4 rounded-xl bg-[#2B2B2B] text-white font-bold text-2xl mb-4 outline-none placeholder:text-gray-500"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setTitle(newTitle);
              setIsTyping(true);
              updateTabTitle(tabId, newTitle);
            }}
          />
          <textarea
            ref={textareaRef}
            placeholder="Tuliskan catatan Anda di sini..."
            className="w-full max-h-[65vh] min-h-64 p-4 rounded-xl bg-[#2B2B2B] text-white resize-none outline-none overflow-y-auto custom-scrollbar pr-2 placeholder:text-gray-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-200"
            >
              <FaSave />
              Simpan Catatan
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-200"
            >
              <FaTrash />
              Hapus Catatan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNotePage;