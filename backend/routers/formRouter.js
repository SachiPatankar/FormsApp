
import express from "express";
import { handlePostInfo, handleGetInfo } from "../controllers/formController.js"

const router = express.Router();

router.post("/post" , handlePostInfo);
router.post("/get" , handleGetInfo);

export default router;