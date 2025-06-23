import Note from "../models/NoteModel.js";
import axios from "axios";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "DESC"]],
    });
    console.log(req.userId);
    console.log(notes);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil catatan" });
  }
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "Judul dan catatan wajib diisi." });
  }

  try {
    const result = await axios.post("http://localhost:5001/predict", {
      // Pastikan objek yang dikirim memiliki kunci "text"
      text: `${title} ${content}`,
    });

    const label = result.data.label || "lainnya";

    const newNote = await Note.create({ title, content, label, userId });

    res.status(201).json(newNote);
    console.log("✅ Catatan berhasil disimpan dengan label:", label);
  } catch (error) {
    console.error("❌ Gagal menyimpan catatan:", error);
    res.status(500).json({ message: "Gagal menyimpan catatan.", error: error.message });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userId;

    console.log("Menghapus note ID:", noteId);
    console.log("Untuk user ID:", userId);

    const note = await Note.findOne({
      where: {
        id: noteId,
        userId: userId,
      },
    });

    if (!note) {
      console.log("Catatan tidak ditemukan di database.");
      return res
        .status(404)
        .json({ message: "Catatan tidak ditemukan atau bukan milik Anda." });
    }

    console.log("Catatan ditemukan, akan dihapus:", note.id);
    await note.destroy({ force: true });

    res.status(200).json({ message: "Catatan berhasil dihapus." });
  } catch (err) {
    console.error("Gagal menghapus catatan:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus catatan." });
  }
};


export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    const note = await Note.findOne({
      where: { id: noteId, userId: req.userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan." });
    }

    let predictedLabel = 'lainnya';

    try {
        const mlResponse = await axios.post('http://localhost:5001/predict', {
            // Pastikan objek yang dikirim memiliki kunci "text"
            text: `${title} ${content}`
        });
        
        if (mlResponse.data && mlResponse.data.label) {
            predictedLabel = mlResponse.data.label;
        }
    } catch (mlError) {
        console.error("Gagal menghubungi API ML saat update:", mlError.message);
        predictedLabel = note.label;
    }

    note.title = title;
    note.content = content;
    note.label = predictedLabel;
    
    await note.save();

    console.log("✅ Catatan berhasil di-update dengan label:", predictedLabel);
    res.json(note);

  } catch (err) {
    console.error("❌ Gagal update catatan:", err);
    res.status(500).json({ message: "Gagal mengupdate catatan." });
  }
};
export const classifyNote = async (req, res) => {
  try {
    const { content } = req.body;

    // Periksa jika content kosong
    if (!content) {
        return res.status(400).json({ msg: "Content tidak boleh kosong." });
    }

    const response = await axios.post("http://localhost:5001/predict", {
      text: content, // <-- Diubah menjadi 'text'
    });

    const predictedLabel = response.data.label;
    res.json({ label: predictedLabel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Gagal mengklasifikasikan note" });
  }
};

