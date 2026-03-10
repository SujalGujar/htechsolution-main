// import { deleteProduct } from "../../services/productServices/deleteProduct.service.js";

// export const productDeleteController = async (req, res) => {

//     try{
//         const product = await deleteProduct(req.params.id);

//         res.status(200).json({
//             success: true,
//             message: "Product deleted successfully",
//             data: product
//         });

//     }catch(error){
//         const is404 = error.message.toLowerCase().includes("not found");
//         res.status(is404 ? 404 : 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// controllers/product/productDeleteController.js
import { deleteProduct } from "../../services/productServices/deleteProduct.service.js";

export const productDeleteController = async (req, res) => {
  try {
    const { id } = req.params;                       // controller reads from req
    if (!id) return res.status(400).json({ success: false, message: "Product ID is required" });

    const product = await deleteProduct(id);         // passes just the id string to service

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
      data: product
    });

  } catch (error) {
    const is404 = error.message.toLowerCase().includes("not found");
    res.status(is404 ? 404 : 500).json({
      success: false,
      message: error.message
    });
  }
};