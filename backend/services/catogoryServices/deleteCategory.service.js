// import Product from "../../models/productsRegisterModel/productRegister.model.js"
import Category from "../../models/productsRegisterModel/catogory.js";
export const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(
        req.params.id
    );

    if(!category){
        return res.status(404).json({success:false,message:"Category not found"})
    }
    return res.status(200).json({success:true,message:"Category deleted successfully",data:category})

}