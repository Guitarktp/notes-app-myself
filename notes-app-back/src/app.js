import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
// กำหนดตัวแปร app 
const app = express();


// Middleware
app.use(
    cors({
      origin: "*",
    })
  ); // เปิดใช้งาน CORS
app.use(express.json());



export default app;