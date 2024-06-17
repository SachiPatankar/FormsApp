
import express from "express";
import { postToSheet } from "../controllers/sheetController.js"

const router = express.Router();

router.post("/post" , postToSheet);

export default router;