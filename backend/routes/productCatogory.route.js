// routes/category.routes.js
import express from "express";
import {createCategoryProduct} from "../controllers/productRegistration/createCategoryProduct.controller.js";
// import { deleteCategory } from "backend/services/catogory.service";
// import createCatogoryProducct from "../controllers/productRegistration/createCategory.controller.js";
import {deleteCategoryProduct} from "../controllers/productRegistration/deleteCategoryProduct.controller.js"
import  {getAllCategoriesProduct} from "../controllers/productRegistration/getAllCategoriesProduct.controller.js";
import {getCategoryByIdProduct} from "../controllers/productRegistration/getCategoryByIdProduct.controller.js";
import {updateCategoryProduct} from "../controllers/productRegistration/updateCategoryProduct.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {registerProductBatch} from "../controllers/productRegistration/registerProductBatch.controller.js";
import {getAllProductsController} from "../controllers/productRegistration/getAllProductsController.Controller.js"
const router = express.Router();

// Route → Controller → Service → DB
router.post("/createCategory",verifyToken,authorizeRoles("admin","manager"), createCategoryProduct);
router.get("/allproducts", verifyToken,authorizeRoles("admin","manager"),getAllCategoriesProduct);
router.get("/product/:id", verifyToken,authorizeRoles("admin","manager"),getCategoryByIdProduct);
router.put("/updateProduct/:id", verifyToken,authorizeRoles("admin","manager"),updateCategoryProduct);
router.delete("/:id", verifyToken,authorizeRoles("admin","manager"),deleteCategoryProduct);
router.post(
  "/register",
  verifyToken,
  authorizeRoles("admin", "manager"),
  registerProductBatch
);

// 🔥 Product History
router.get(
  "/history",
  verifyToken,
  authorizeRoles("admin", "manager"),
  getAllProductsController
);

// export default router;

export default router;