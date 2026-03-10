// services/productServices/deleteProduct.service.js

import Product from "../../models/productsRegisterModel/productRegister.model.js";

// SERVICE RULE: never receives req/res — only receives plain data, returns plain data
// The controller is responsible for reading req and writing res
// The service is responsible for ONLY talking to the database

export const deleteProduct = async (id) => {        // ← just id, no req/res
  const product = await Product.findByIdAndUpdate(
    id,                                              // ← id comes directly, not req.params.id
    { isActive: false },                             // ← soft delete, keeps data intact
    { new: true }                                    // ← return the updated document
  );

  if (!product) {
    throw new Error("Product not found");            // ← throw error, don't touch res
  }

  return product;                                    // ← return data, don't touch res
};