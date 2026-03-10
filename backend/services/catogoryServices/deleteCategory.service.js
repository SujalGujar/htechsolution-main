// services/catogoryServices/deleteCategory.service.js

import Category from "../../models/productsRegisterModel/catogory.js";

export const deleteCategory = async (id) => {          // ← only id, no req/res
  const category = await Category.findByIdAndUpdate(
    id,                                                // ← id comes directly as a string
    { isActive: false },                               // ← soft delete, keeps data in DB
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");             // ← throw, never touch res
  }

  return category;                                     // ← return data, never touch res
};