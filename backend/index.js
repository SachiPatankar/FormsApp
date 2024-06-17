import express, { query } from "express";
import connectDB from "./database/connect.js";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';    
import {google} from "googleapis"
              
const app = express();


app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173","http://localhost:5174"]
  }));
  
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();


import infoRouter from "./routers/formRouter.js";
app.use("/info" , infoRouter);

import sheetRouter from "./routers/sheetRouter.js";
app.use("/sheet" , sheetRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("Server started" )
} )
