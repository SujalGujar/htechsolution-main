// routes/categoryConfig.routes.js
import express from "express";
// import * as configController from "../controllers/categoryConfig.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import createCategoryConfigProduct from "../controllers/catogoryConfigControllers/createCatogoryConfig.controller.js";
import getConfigByCategoryProduct from "../controllers/catogoryConfigControllers/getConfigByCategory.controller.js";
import addField from "../controllers/catogoryConfigControllers/addField.controller.js";
import removeField from "../controllers/catogoryConfigControllers/removeField.controller.js";
const router = express.Router();

router.post("/configuration", verifyToken,authorizeRoles("admin","manager"), createCategoryConfigProduct);                            // Create config for a category
router.get("/getconfigrations/:categoryId", verifyToken,authorizeRoles("admin","manager"), getConfigByCategoryProduct);                  // Get config by category ID
router.post("/addconfigration/:categoryId/add-field", verifyToken,authorizeRoles("admin","manager"), addField);                  // Add new field to existing config
router.delete("/removeconfigration/:categoryId/remove-field/:fieldKey", verifyToken,authorizeRoles("admin","manager"), removeField);// Remove a field from config

export default router;