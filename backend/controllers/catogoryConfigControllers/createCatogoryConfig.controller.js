import { createCategoryConfig } from "../../services/catogoryConfigServices/createCategoryConfig.service.js";
export const createCategoryConfigProduct = async (req, res) => {
  try {
    const config = await createCategoryConfig(req.body);
    res.status(201).json({ success: true, data: config });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};