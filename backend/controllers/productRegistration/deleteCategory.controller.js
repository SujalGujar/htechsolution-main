import {deleteCategory}  from "../../services/catogory.service.js";
export const deleteCategoryProduct = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Category deactivated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};