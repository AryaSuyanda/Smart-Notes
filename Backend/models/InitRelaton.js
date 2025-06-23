import Users from "./UserModels.js";
import Note from "./NoteModel.js";

export default function initRelations() {
  Users.hasMany(Note, { foreignKey: "userId" });
  Note.belongsTo(Users, { foreignKey: "userId" });
}
