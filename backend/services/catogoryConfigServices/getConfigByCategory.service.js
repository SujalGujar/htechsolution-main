import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
export const getConfigByCategory = async (categoryId) => {
  const config = await CategoryConfig.findOne({ category: categoryId })
    .populate("category", "name");
    // populate → fetch category name instead of just the ObjectId
    // second argument "name" → only fetch name field, not everything

  if (!config) {
    throw new Error("No config found for this category");
  }
  return config;
};
