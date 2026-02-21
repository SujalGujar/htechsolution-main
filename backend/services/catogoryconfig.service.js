// services/categoryConfig.service.js
import CategoryConfig from "../models/CategoryConfig.js";
import Category from "../models/Category.js";

// CREATE CONFIG FOR A CATEGORY
export const createCategoryConfig = async (data) => {
  // First check if category exists
  const category = await Category.findById(data.category);
  if (!category) {
    throw new Error("Category not found");
  }

  // Check config already exists for this category
  const existing = await CategoryConfig.findOne({ category: data.category });
  if (existing) {
    throw new Error("Config already exists for this category. Use update instead.");
  }

  const config = new CategoryConfig(data);
  await config.save();
  return config;
};

// GET CONFIG BY CATEGORY ID
// Frontend calls this to know what fields to show in the form
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

// ADD A NEW FIELD TO EXISTING CONFIG
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

  config.fields.push(newField);  // Add new field to array
  await config.save();
  return config;
};

// REMOVE A FIELD FROM CONFIG
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