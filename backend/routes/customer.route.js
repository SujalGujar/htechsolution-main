import express from "express";
const router = express.Router();

import {customerSearchProducts} from "../controllers/customer.controller.js"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

router.get("/search",verifyToken,authorizeRoles("admin","manager","user"),customerSearchProducts)

export default router;
