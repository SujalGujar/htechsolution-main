import express from "express";
import upload from "../../config/multer.js";
import { getSolutions, saveSolution, deleteSolutionById } from "../../controllers/uploadedcontent/hardwareSolution.controller.js";

const router = express.Router();

router.get("/", getSolutions);
router.post("/", upload.single("image"), saveSolution);
router.put("/:id", upload.single("image"), saveSolution);
router.delete("/:id", deleteSolutionById);

export default router;