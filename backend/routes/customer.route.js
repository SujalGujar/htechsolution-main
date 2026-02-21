import express from "express";
const router = express.Router();

// import {customerSearchProducts} from "../controllers/customer.controller.js"
import customerSerachProduct from "../controllers/customerRegister/customerSearchProduct.controller.js"
import verifyToken from "../middlewares/authMiddleware.js";
import customerComplains from "../controllers/customerRegister/customerComplains.controller.js"
import authorizeRoles from "../middlewares/roleMiddleware.js";

// router.post("/search",verifyToken,authorizeRoles("admin","manager","user"),customerSerachProduct)
// router.post("/complains",verifyToken,authorizeRoles("admin","manager","user"),customerComplains);

export default router;
