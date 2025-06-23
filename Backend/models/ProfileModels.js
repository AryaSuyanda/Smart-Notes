import db from "../config/Database.js";
import { Sequelize } from "sequelize";


export const getProfileByUserId = async (userId) => {
  const [results] = await db.query("SELECT * FROM user_profiles WHERE user_id = ?", {
    replacements: [userId],
  });
  return results[0];
};

export const upsertProfile = async (userId, firstName, lastName, phone, address, gender) => {
  await db.query(`
    INSERT INTO user_profiles (user_id, first_name, last_name, phone, address, gender)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      phone = VALUES(phone),
      address = VALUES(address),
      gender = VALUES(gender)
  `, {
    replacements: [userId, firstName, lastName, phone, address, gender]
  });
};
