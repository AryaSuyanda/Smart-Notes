import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import noteRoutes from "./routes/index.js";
import initRelations from "./models/InitRelaton.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

//ubah dengan url deploy frontend nanti
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/avatars", express.static("public/avatars"));
app.use(noteRoutes);

initRelations();

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");

    await db.sync();
    console.log("All models were synchronized successfully.");

    app.listen(5000, () => {
      console.log("Server running at port 5000");
    });
    
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();