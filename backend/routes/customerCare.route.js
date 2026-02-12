import express from "express"


import { customerDetails, complains } from "../controllers/customercare.controller.js"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router()

// ✅ correct routes
router.get("/customer", verifyToken,authorizeRoles("admin","manager","user"),customerDetails);
router.get("/complains",verifyToken,authorizeRoles("admin","manager","user"), complains);

export default router;