import { deleteProduct } from "../../services/productServices/deleteProduct.service.js";

export const customerDeleteController = async (req, res) => {

    try{
        const product = await deleteProduct(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });

    }catch(error){
        const is404 = error.message.toLowerCase().includes("not found");
        res.status(is404 ? 404 : 500).json({
            success: false,
            message: error.message
        });
    }
}