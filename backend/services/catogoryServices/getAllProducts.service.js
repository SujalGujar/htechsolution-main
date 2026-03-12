// import productRegister from "../../models/productsRegisterModel/productRegister.model.js";

// export const getAllProducts = async () => {
//   return await productRegister.find({isActive:true})
//     .populate("category")
//     .sort({ createdAt: -1 });
// };

import productRegister from "../../models/productsRegisterModel/productRegister.model.js";

export const getAllProducts = async () => {
  return await productRegister.find({ isActive: true })  // ← add this filter
    // .populate("category")
    .sort({ createdAt: -1 });
};