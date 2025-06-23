import { Sequelize } from "sequelize";

const db = new Sequelize('smartnotes','root','',{
  host: "localhost",
  dialect: "mysql"
})

export default db;