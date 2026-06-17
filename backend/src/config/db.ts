import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}   

const sequelize = new Sequelize(DB_URL,{
    dialect: "postgres",
    logging: false,
});

const connectDB = async() => {
    try {
        await sequelize.authenticate()
        console.log("Database connection successful");
        await sequelize.sync();
        console.log("Database tables created");
    } catch (err:any) {
        console.log(err.message);
        throw err;
    }
}
export default connectDB;
export {sequelize};