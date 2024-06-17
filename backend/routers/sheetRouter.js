
import express from "express";
import { postToSheet } from "../controllers/sheetController.js"

const router = express.Router();

router.post("/post" , postToSheet);
router.post("/get" , handleGetInfo);

export default router;