// import { registerProductBatchService } from "../../services/productBatch/registerProductBatch.service.js";

// export const registerProductBatchController = async (req, res) => {
//   try {
//     const result = await registerProductBatchService(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Batch Registered Successfully",
//       data: result
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

import { registerProductsService } from "../../services/productServices/registerProducts.service.js";

export const registerProductsController = async (req, res) => {
  try {
    const products = await registerProductsService(req.body);

    res.status(201).json({
      success: true,
      message: "Products Registered Successfully",
      totalCreated: products.length,
      data: products
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};