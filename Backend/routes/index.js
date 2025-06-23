import express from "express";
import { getUsers, Register, login, Logout, changePassword } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getNotes, deleteNote, createNote, updateNote, classifyNote } from "../controllers/NoteController.js";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../controllers/Profile.js";
import { upload } from "../middleware/UploadAvatar.js";

const router = express.Router();

// Routes Autentikasi dan User
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/change-password", verifyToken, changePassword);

// Routes Profil
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/profile/avatar", verifyToken, upload.single("avatar"), uploadAvatar);
router.get("/profile", verifyToken, getProfile);

// Routes Notes
router.post("/notes", verifyToken, createNote);
router.get("/notes", verifyToken, getNotes);
router.delete("/notes/:id", verifyToken, deleteNote);
router.put("/notes/:id", verifyToken, updateNote);

// klasifikasi notes
router.post("/classify", verifyToken, classifyNote);



export default router;
