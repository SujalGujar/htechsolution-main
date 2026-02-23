// routes/category.routes.js
import express from "express";
import {createCatogoryProduct} from "../controllers/productRegistration/createCategory.controller.js";
// import { deleteCategory } from "backend/services/catogory.service";
// import createCatogoryProducct from "../controllers/productRegistration/createCategory.controller.js";
import {deleteCategoryProduct} from "../controllers/productRegistration/deleteCategory.controller.js"
import  {getAllCategoriesProduct} from "../controllers/productRegistration/getAllCategories.controller.js";
import {getCategoryByIdProduct} from "../controllers/productRegistration/getCategoryById.controller.js";
import {updateCategoryProduct} from "../controllers/productRegistration/updateCategory.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
const router = express.Router();

// Route → Controller → Service → DB
router.post("/",verifyToken,authorizeRoles("admin","manager"), createCatogoryProduct);
router.get("/allproducts", verifyToken,authorizeRoles("admin","manager"),getAllCategoriesProduct);
router.get("/product/:id", verifyToken,authorizeRoles("admin","manager"),getCategoryByIdProduct);
router.put("/updateProduct/:id", verifyToken,authorizeRoles("admin","manager"),updateCategoryProduct);
router.delete("/:id", verifyToken,authorizeRoles("admin","manager"),deleteCategoryProduct);

export default router;