import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Kofirmasi Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (user.length === 0) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accesToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accesToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    console.log("🔐 request masuk: ", { userId, currentPassword, newPassword });

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Password tidak boleh kosong." });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      console.log("❌ User tidak ditemukan");
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      console.log("❌ Password saat ini salah");
      return res.status(400).json({ message: "Password saat ini salah." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    console.log("✅ Password berhasil diubah");
    res.json({ message: "Password berhasil diubah." });
  } catch (err) {
    console.error("❌ Gagal ubah password:", err);
    res.status(500).json({ message: "Gagal mengubah password.", error: err.message });
  }
};


export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
