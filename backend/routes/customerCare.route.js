import express from "express"


// import { customerDetails, complains,productHistroy,complainStatus} from "../controllers/customercare.controller.js"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {registerCustomer} from "../controllers/customerRegister/customerRegistration.controller.js"
// import customerComplains from "../controllers/customerRegister/customerComplains.controller.js"
// import { complains } from "../controllers/customercare.controller.js";
import {lookupProduct} from "../controllers/customerRegister/productLookUp.controller.js"
import { getAllRegistrations, getRegistrationById } from "../controllers/customerRegister/customerHistory.controller.js"
// import { productHistroy } from "../controllers/customercare.controller.js"  
// import { registerCustomer } from "../controllers/customerRegister/customerRegistration.controller.js";
import {  productDeleteController } from "../controllers/customerRegister/productDelete.controller.js";
import {getByCustomerProductId} from "../controllers/customerRegister/search.controller.js"
const router = express.Router()

// ✅ correct routes
// router.get('/products',verifyToken,authorizeRoles("admin","manager"),productHistroy)
// router.post("/newcustomer",verifyToken,authorizeRoles("admin","manager"),registerCustomer);
// router.get("/customer", verifyToken,authorizeRoles("admin","manager"),customerDetails);
// // router.get("/complains",verifyToken,authorizeRoles("admin","manager"), complains);
// router.get("/cusComplains", verifyToken, authorizeRoles("admin", "manager","user"), complains);
// router.patch("/complainStatus/:id", verifyToken, authorizeRoles("admin", "manager"), complainStatus);

router.get("/product/lookup", verifyToken,authorizeRoles("admin","manager"),lookupProduct);

// Register a new customer — single or bulk
router.post("/register",verifyToken,authorizeRoles("admin","manager"), registerCustomer);
router.get("/search/:id",verifyToken,authorizeRoles("admin","manager"), getByCustomerProductId);
// View all registrations (with optional filters)
router.get("/registrations",verifyToken,authorizeRoles("admin","manager"), getAllRegistrations);

// View one registration by ID      
router.get("/registrations/:id",verifyToken,authorizeRoles("admin","manager"), getRegistrationById);
router.delete("/products/:id", verifyToken, authorizeRoles("admin", "manager"), productDeleteController);
export default router;