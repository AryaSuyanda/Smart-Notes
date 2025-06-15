import { getProfileByUserId, upsertProfile } from "../models/ProfileModels.js";


export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const profile = await getProfileByUserId(userId);

    const fullProfile = {
      ...profile?.dataValues,
      avatar: profile?.avatar || null,
    };

    res.json(fullProfile);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil profil", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, phone, address, gender } = req.body;
    await upsertProfile(userId, firstName, lastName, phone, address, gender);
    res.json({ message: "Profil berhasil diperbarui" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui profil", error: err.message });
  }
};

import db from "../config/Database.js";

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diunggah" });
    }

    const avatarUrl = req.file.filename;

    await db.query(
      "UPDATE user_profiles SET avatar = ? WHERE user_id = ?",
      {
        replacements: [avatarUrl, userId]
      }
    );

    res.json({ message: "Avatar berhasil diunggah", avatar: avatarUrl });
  } catch (err) {
    console.error("Upload avatar error:", err);
    res.status(500).json({ message: "Upload gagal", error: err.message });
  }
};
