import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
export const removeFieldFromConfig = async (categoryId, fieldKey) => {
  const config = await CategoryConfig.findOne({ category: categoryId });
  if (!config) {
    throw new Error("Config not found");
  }

  // filter() keeps elements that do NOT match the fieldKey
  config.fields = config.fields.filter(f => f.fieldKey !== fieldKey);
  await config.save();
  return config;
};
