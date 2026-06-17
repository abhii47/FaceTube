import "dotenv/config";

import express, { Application,Request,Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app:Application = express();

app.use(express.json());
app.use(cors());

//health check api
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World");
});

const port = process.env.PORT || 8000;

const startServer = async() => {
    try {
        await connectDB()
        app.listen(port, ()=>{
            console.log(`server is running on port ${port}`);
        });
    } catch (err) {
        console.log("Error starting server: ", err);
        process.exit(1);
    }   
}
startServer();