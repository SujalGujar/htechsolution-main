import CategoryConfig from "../../models/productsRegisterModel/catogoryConfig.js";
export const addFieldToConfig = async (categoryId, newField) => {
  const config = await CategoryConfig.findOne({ category: categoryId });
  if (!config) {
    throw new Error("Config not found");
  }

  // Check if field with same key already exists
  const fieldExists = config.fields.some(f => f.fieldKey === newField.fieldKey);
  // .some() → returns true if ANY element matches the condition
  
  if (fieldExists) {
    throw new Error(`Field with key '${newField.fieldKey}' already exists`);
  }

  config.fields.push(newField); 
  await config.save();
  return config;
};
