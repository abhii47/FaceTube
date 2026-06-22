import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}   

const sequelize = new Sequelize(DB_URL,{
    dialect: "postgres",
    logging: false,
});

export default sequelize;