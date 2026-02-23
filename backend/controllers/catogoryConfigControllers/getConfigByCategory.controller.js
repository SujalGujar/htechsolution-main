import { getConfigByCategory } from "../../services/catogoryConfigServices/getConfigByCategory.service.js";
export const getConfigByCategoryProduct = async (req, res) => {
  try {
    // /api/category-config/:categoryId
    const config = await getConfigByCategory(req.params.categoryId);
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};