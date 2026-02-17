import dotenv from "dotenv";
import Customer from "../models/customerDetails.model.js";
import Product from "../models/productDetails.model.js";
import complainData from "../models/complainsData.model.js";

dotenv.config();

// ✅ named export
// import dotenv from "dotenv";
// import Customer from "../models/customerDetails.model.js";

// dotenv.config();

// export const customerDetails = async(req, res) => {
//     try {
        
//         const allCustomers = await Customer.find();

        
//         if(!allCustomers || allCustomers.length === 0){
//             return res.status(404).json({ message: "No customers found" });
//         }

//         res.status(200).json({ 
//             message: "Customer Details", 
//             customers: allCustomers 
//         });

//     } catch(error) {
//         console.error("Error fetching customer details:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
export const customerDetails = async(req, res) => {
    try {
        const allCustomers = await Customer.find();
         if(!allCustomers || allCustomers.length === 0){
            return res.status(404).json({ message: "No customers found" });
        }
        res.status(200).json({ 
            message: "Customer Details", 
            customers: allCustomers || [] 
        });

    } catch(error) {
        console.error("Error fetching customer details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export const complains = async(req, res) => {
    try {

        const allComplains = await complainData.find();

        if(!allComplains || allComplains.length === 0){
            return res.status(404).json({ message: "No complains found" });
        }
        
        res.status(200).json({ 
            message: "Complains found", 
            complains: allComplains
        });
    } catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const productHistroy = async(req,res) =>{
    try{
        const allProducts = await Product.find();
        if(!allProducts || allProducts.length === 0){
            return res.status(404).json({ message: "No customers found" });
        }
          res.status(200).json({ 
            message: "Customer Details", 
            products: allProducts
        });


    }catch(error){
        res.stauts(500).json({message:"Internal Server Error"});
    }
}
