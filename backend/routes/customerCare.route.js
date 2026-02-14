import express from "express"


import { customerDetails, complains } from "../controllers/customercare.controller.js"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {registerCustomer} from "../controllers/customerRegister/customerRegistration.controller.js"
const router = express.Router()

// ✅ correct routes
router.post("/newcustomer",verifyToken,authorizeRoles("admin","manager"),registerCustomer);
router.get("/customer", verifyToken,authorizeRoles("admin","manager"),customerDetails);
router.get("/complains",verifyToken,authorizeRoles("admin","manager"), complains);

export default router;