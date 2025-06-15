import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";

function AddNotePage() {
  const { tabId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Coding");
  const textareaRef = useRef(null);

  const categories = ["Coding", "Tasks", "School"];

  // Ambil catatan dari localStorage jika ada
  useEffect(() => {
    const saved = localStorage.getItem(`note-${tabId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTitle(parsed.title || "");
      setContent(parsed.content || "");
      setSelectedCategory(parsed.category || "Coding");
    }
  }, [tabId]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSave = () => {
    const noteData = {
      title,
      content,
      category: selectedCategory,
    };
    localStorage.setItem(`note-${tabId}`, JSON.stringify(noteData));
    console.log(`Catatan ${tabId} disimpan:`, noteData);
  };

  return (
    <div className="h-screen bg-[#1B1B1B] flex overflow-y-auto custom-scrollbar pr-2">
      <div className="flex-1 p-8 text-white">
        <Header title={`Catatan ${tabId}`} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input */}
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Judul Catatan"
              className="w-full p-4 rounded-xl bg-[#2B2B2B] text-white font-bold mb-4 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              ref={textareaRef}
              placeholder="Isi catatan..."
              className="w-full max-h-[65vh] min-h-64 p-4 rounded-xl bg-[#2B2B2B] text-white resize-none outline-none overflow-y-auto custom-scrollbar pr-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-200"
              >
                <FaSave />
                Simpan Catatan
              </button>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Kategori</h2>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2 rounded-lg ${
                    selectedCategory === cat
                      ? "bg-[#3471FF] text-white"
                      : "bg-[#2B2B2B] text-gray-300 hover:bg-[#3c3c3c]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNotePage;
