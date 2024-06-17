
import express from "express";
import { handlePostInfo, handleGetInfo } from "../controllers/formController.js"

const router = express.Router();

router.post("/post" , handlePostInfo);
router.get("/get" , handleGetInfo);

export default router;