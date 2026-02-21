import {getCategoryById}  from "../../services/catogory.service.js";
 export const getCategoryByIdProduct = async (req, res) => {
  try {
    // req.params.id → comes from URL → /api/category/:id
    const category = await getCategoryById(req.params.id);
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};