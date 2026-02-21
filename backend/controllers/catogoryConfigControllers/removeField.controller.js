import {removeFieldFromConfig} from "../../services/categoryconfig.service.js";
export const removeField = async (req, res) => {
  try {
    const config = await removeFieldFromConfig(
      req.params.categoryId,
      req.params.fieldKey  // /api/category-config/:categoryId/field/:fieldKey
    );
    res.status(200).json({ success: true, message: "Field removed", data: config });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};