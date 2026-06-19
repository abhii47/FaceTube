import "dotenv/config";

import express, { Application,Request,Response } from "express";
import cors from "cors";
import path from "path";
import sequelize from "./config/db.js";
import "./models/index.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app:Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads',express.static(path.join(process.cwd(),"../uploads")));

import userRoutes from "./routes/userRoute.js";
import videoRoutes from "./routes/videoRoute.js";

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

//health check api
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
});

app.use(errorHandler);

const port = process.env.PORT || 8000;

const startServer = async() => {
    try {
        await sequelize.authenticate()
        console.log("Database connection successful");
        await sequelize.sync();
        console.log("Database tables created");
        app.listen(port, ()=>{
            console.log(`server is running on port ${port}`);
        });
    } catch (err) {
        console.log("Error starting server: ", err);
        process.exit(1);
    }   
}
startServer();