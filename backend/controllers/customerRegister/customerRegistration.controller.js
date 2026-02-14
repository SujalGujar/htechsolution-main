import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
// import Admin from "../models/admin.model.js"
// import Customer from "../models/customerDetails.model.js";
// import Product from "../models/productDetails.model.js";
import Customer from "../../models/customerDetails.model.js";

dotenv.config();



const generateSecurePassword = (length = 12) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString("hex").slice(0, length);
};
// export const registerCustomer = async(req,res) => {
  
//   try{
//     const body = req.body
//     if(!body){
//       res.status(400).json({
//         message:"Request body missing"
//       })
//     }

//     const{
//       customerName,
//       email,
//       mobileNum,
//     proName,
//     proCatogory,
//     proSrNo,
//     proModNum,
//      warrStartDate,
//      warrEndDate
//   } = body

//   if(!customerName||
//       !email||
//       !mobileNum||
//     !proName||
//     !proCatogory||
//     !proSrNo||
//     !proModNum||warrStartDate
//      ||warrEndDate){
//       res.status(400).json({message:"All Fields is Required"})
//     }

//     const existingCus = await Customer.findOne({email});
//     if(existingCus){
//       return res.status(400).json({message:"Customer Already Exist"})
//     }

//     const plainPassword = generateSecurePassword();
//     const hashedPassword = await bcrypt.hash(plainPassword, 10);
//     const customer = new Customer({
//       customerName,
//       email,
//       mobileNum,
//     proName,
//     proCatogory,
//     proSrNo,
//     proModNum,
//     warrStartDate,
//      warrEndDate,
//     password: hashedPassword
//     });



//     await customer.save();

//    return res.status(201).json({
//       message: "Product registered successfully",
//       // ticketNumber: product.TicketNumber,
//       password: plainPassword
//     });


//   }catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: error.message });
//   }
  
// };
import Admin from "../../models/admin.model.js"
import Customer from "../../models/Customer.js";
import Admin from "../../models/Admin.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const generateSecurePassword = (length = 12) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString("hex").slice(0, length);
};

export const registerCustomer = async(req, res) => {
  try {
    const body = req.body;
    
    if (!body) {
      return res.status(400).json({  
        message: "Request body missing"
      });
    }

    const {
      customerName,
      email,
      mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      warrStartDate,
      warrEndDate
    } = body;

    // Validate all required fields
    if (!customerName || !email || !mobileNum || !proName || 
        !proCatogory || !proSrNo || !proModNum || 
        !warrStartDate || !warrEndDate) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if customer already exists
    const existingCus = await Customer.findOne({ email });
    if (existingCus) {
      return res.status(400).json({
        message: "Customer already exists"
      });
    }

    // Check if admin user already exists with this email
    const existingAdmin = await Admin.findOne({ username: email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "User already exists in the system"
      });
    }

    // Generate password
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Create customer record
    const customer = new Customer({
      customerName,
      email,
      mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      warrStartDate,
      warrEndDate,
      password: hashedPassword
      ticketNumber
    });

    await customer.save();

    // Create admin/user record for login
    const newAdminUser = new Admin({
      username: customerName,  
      password: hashedPassword,
      role: "user"  
    });

    await newAdminUser.save();

    
    return res.status(201).json({  
      success: true,
      message: "Customer registered successfully",
      password: plainPassword,
      username: customerName
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field} already exists` 
      });
    }
    
    return res.status(500).json({ 
      message: error.message || "Internal server error"
    });
  }
};