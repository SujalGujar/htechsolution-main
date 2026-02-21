import {getAllCategories}  from "../../services/catogory.service.js";
export const getAllCategoriesProduct = async (req, res) => {
  try {
    const categories = await getAllCategories();
    
    res.status(200).json({
      success: true,
      count: categories.length,  // Handy for frontend
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};