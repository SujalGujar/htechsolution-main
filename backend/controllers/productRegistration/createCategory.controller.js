// controllers/category.controller.js
import {createCategory} from "../../services/catogory.service.js";



export const createCategoryProduct = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    // If service threw "Category already exists" → send 400
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// export const getAllCategories = async (req, res) => {
//   try {
//     const categories = await categoryService.getAllCategories();
    
//     res.status(200).json({
//       success: true,
//       count: categories.length,  // Handy for frontend
//       data: categories
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getCategoryById = async (req, res) => {
//   try {
//     // req.params.id → comes from URL → /api/category/:id
//     const category = await categoryService.getCategoryById(req.params.id);
    
//     res.status(200).json({
//       success: true,
//       data: category
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const updateCategory = async (req, res) => {
//   try {
//     const category = await categoryService.updateCategory(
//       req.params.id, 
//       req.body
//     );
    
//     res.status(200).json({
//       success: true,
//       message: "Category updated",
//       data: category
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const deleteCategory = async (req, res) => {
//   try {
//     await categoryService.deleteCategory(req.params.id);
    
//     res.status(200).json({
//       success: true,
//       message: "Category deactivated successfully"
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };