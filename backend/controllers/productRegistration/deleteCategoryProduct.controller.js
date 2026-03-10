// import {deleteCategory} from "../../services/catogoryServices/deleteCategory.service.js";
// export const deleteCategoryProduct = async (req, res) => {
//   try {
//     await deleteCategory(req.params.id);
    
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



// controllers/category/deleteCategoryController.js
import { deleteCategory } from "../../services/catogoryServices/deleteCategory.service.js";

export const deleteCategoryProduct = async (req, res) => {
  try {
    const { id } = req.params;  // gets the id from /category/:id

    if (!id) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const category = await deleteCategory(id);

    return res.status(200).json({
      success: true,
      message: "Category deactivated successfully",
      data: category,
    });

  } catch (error) {
    const is404 = error.message.toLowerCase().includes("not found");
    return res.status(is404 ? 404 : 500).json({
      success: false,
      message: error.message,
    });
  }
};