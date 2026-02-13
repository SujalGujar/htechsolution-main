import dotenv from "dotenv";
import Customer from "../models/productDetails.model.js";

dotenv.config();

// ✅ named export
// import dotenv from "dotenv";
// import Customer from "../models/customerDetails.model.js";

// dotenv.config();

export const customerDetails = async(req, res) => {
    try {
        
        const allCustomers = await Customer.find();

        
        if(!allCustomers || allCustomers.length === 0){
            return res.status(404).json({ message: "No customers found" });
        }

        res.status(200).json({ 
            message: "Customer Details", 
            customers: allCustomers 
        });

    } catch(error) {
        console.error("Error fetching customer details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const complains = async(req, res) => {
    try {
        res.json({ message: "Complains route working" });
    } catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}