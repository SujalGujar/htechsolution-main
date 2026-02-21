import configService from "../../services/categoryconfig.service.js";
export const createCategoryConfig = async (req, res) => {
  try {
    const config = await configService.createCategoryConfig(req.body);
    res.status(201).json({ success: true, data: config });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};