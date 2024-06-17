import express, { query } from "express";
import connectDB from "./database/connect.js";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';    
import {google} from "googleapis"
              
const app = express();

const auth = await google.auth.getClient({scopes:['https://www.googleapis.com/auth/spreadsheets.readonly']});
const sheets = google.sheets({version: "v4", auth});

const {id} = query
const range = 

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
  }));
  
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();


import infoRouter from "./routers/formRouter.js";
app.use("/info" , infoRouter);





app.listen(process.env.APP_PORT,()=>{
    console.log("Server started" )
} )
