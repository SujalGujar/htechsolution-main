import {updateCategory}  from "../../services/catogory.service.js";
export const updateCategoryProduct = async (req, res) => {
  try {
    const category = await updateCategory(
      req.params.id, 
      req.body
    );
    
    res.status(200).json({
      success: true,
      message: "Category updated",
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};