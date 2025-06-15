import express from "express";
import { getUsers, Register, login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
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

// Routes Profil
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/profile/avatar", verifyToken, upload.single("avatar"), uploadAvatar);

router.get("/profile", verifyToken, getProfile);

export default router;
