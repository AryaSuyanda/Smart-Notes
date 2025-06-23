import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Note = db.define("notes", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "lainnya",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Note; 
