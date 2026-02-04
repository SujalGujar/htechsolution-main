import express from "express";
import upload from "../config/multer.js";
import { getSections, saveSection, deleteSection } from "../controllers/section.controller.js";

const router = express.Router();

router.get("/", getSections);
router.post("/", upload.single("image"), saveSection);
router.delete("/:id", deleteSection);

export default router;
