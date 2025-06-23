import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // ⬅️ Penting agar cookie refreshToken ikut terkirim
});

export default api;
