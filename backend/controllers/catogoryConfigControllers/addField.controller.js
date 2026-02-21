import configService from "../../services/categoryconfig.service.js";
export const addField = async (req, res) => {
  try {
    const config = await configService.addFieldToConfig(
      req.params.categoryId,
      req.body  // { fieldName, fieldKey, fieldType, unit, isRequired, options }
    );
    res.status(200).json({ success: true, message: "Field added", data: config });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};