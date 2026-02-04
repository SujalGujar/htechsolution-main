import express from "express";
import upload from "../config/multer.js";
import {
  getDeliverables,
  saveDeliverable,
  deleteDeliverable
} from "../controllers/deliverable.controller.js";

const router = express.Router();

router.get("/", getDeliverables);
router.post("/", upload.single("image"), saveDeliverable);
router.delete("/:id", deleteDeliverable);

export default router;
