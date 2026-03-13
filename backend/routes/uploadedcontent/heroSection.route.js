// import express from "express";
// import upload from "../config/multer.js";
// import {
//   getDeliverables,
//   saveDeliverable,
//   deleteDeliverable
// } from "../controllers/heroSection.controller.js";

// const router = express.Router();

// router.get("/", getDeliverables);
// router.post("/", upload.single("image"), saveDeliverable);
// router.delete("/:id", deleteDeliverable);

// export default router;

import express from "express";
import upload from "../../config/multer.js";
import {
  getHeroSections,
  saveHeroSection,
  deleteHeroSection,
} from "../../controllers/uploadedcontent/heroSection.controller.js";

const router = express.Router();

router.get("/", getHeroSections);
router.post("/", upload.single("image"), saveHeroSection);
router.delete("/:id", deleteHeroSection);

export default router;