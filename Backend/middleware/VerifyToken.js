import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Ambil token dari cookie, bukan dari Authorization header
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden jika token invalid/expired
    req.email = decoded.email;
    req.userId = decoded.userId;
    next();
  });
};
