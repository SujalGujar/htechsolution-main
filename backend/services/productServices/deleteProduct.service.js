// import { RotateCwSquare } from "lucide-react"
// import Customer from "../../models/customerRegisterModel/customerDetails.model.js"
import Product from "../../models/productsRegisterModel/productRegister.model.js"
export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(
        req.params.id
    );

    if(!product){
        return res.status(404).json({success:false,message:"Product not found"})
    }
    return res.status(200).json({success:true,message:"Product deleted successfully",data:product})

}