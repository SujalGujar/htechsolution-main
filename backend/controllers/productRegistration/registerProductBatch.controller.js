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
import { registerProductsBatch } from "../../services/productBatch/registerProductBatch.service.js";
export const registerProductBatch = async (req, res) => {
  try {
    console.log("🔍 Controller received:", req.body); // 👈 ADD
    const products = await registerProductsBatch(req.body);
    res.status(201).json({
      success: true,
      message: "Products Registered Successfully",
      totalCreated: products.length,
      data: products
    });
  } catch (error) {
    console.log("❌ Error name:", error.name);       // 👈 ADD
    console.log("❌ Error message:", error.message); // 👈 ADD
    console.log("❌ Error stack:", error.stack);     // 👈 ADD - THIS SHOWS EXACT LINE
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};