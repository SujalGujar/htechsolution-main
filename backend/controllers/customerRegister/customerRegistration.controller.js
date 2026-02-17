// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import crypto from "crypto";
// // import Admin from "../models/admin.model.js"
// // import Customer from "../models/customerDetails.model.js";
// // import Product from "../models/productDetails.model.js";
// import Customer from "../../models/customerDetails.model.js";

// dotenv.config();



// const generateSecurePassword = (length = 12) => {
//   const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
//   return randomBytes.toString("hex").slice(0, length);
// };
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
// import Admin from "../../models/admin.model.js"
// import Customer from "../../models/customerDetails.model.js";
// import Admin from "../../models/admin.model.js";
// import Product from  "../../models/productDetails.model.js";
// import bcrypt from "bcrypt";
// import crypto from "crypto";

// const generateSecurePassword = (length = 12) => {
//   const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
//   return randomBytes.toString("hex").slice(0, length);
// };

// export const registerCustomer = async(req, res) => {
//   try {
//     const body = req.body;
    
//     if (!body) {
//       return res.status(400).json({  
//         message: "Request body missing"
//       });
//     }

//     const {
//       customerName,
//       email,
//       mobileNum,
//       proName,
//       proCatogory,
//       proSrNo,
//       proModNum,
//       warrStartDate,
//       warrEndDate,
//       ticketNumber
//     } = body;

//     // Validate all required fields
//     if (!customerName || !email || !mobileNum || !proName || 
//         !proCatogory || !proSrNo || !proModNum || 
//         !warrStartDate || !warrEndDate || !ticketNumber) {
//       return res.status(400).json({
//         message: "All fields are required"
//       });
//     }

//     // Check if customer already exists
//     const existingCus = await Customer.findOne({ email });
//     if (existingCus) {
//       return res.status(400).json({
//         message: "Customer already exists"
//       });
//     }

//     // Check if admin user already exists with this email
//     const existingAdmin = await Admin.findOne({ username: email });
//     if (existingAdmin) {
//       return res.status(400).json({
//         message: "User already exists in the system"
//       });
//     }

//     // Generate password
//     const plainPassword = generateSecurePassword();
//     const hashedPassword = await bcrypt.hash(plainPassword, 4);
    
//     // Create customer record
//     const customer = new Customer({
//       customerName,
//       email,
//       mobileNum,
//       proName,
//       proCatogory,
//       proSrNo,
//       proModNum,
//       warrStartDate,
//       warrEndDate,
//       password: hashedPassword,
//       ticketNumber: ticketNumber
//     });

//     await customer.save();

    
//     const newAdminUser = new Admin({
//       username: customerName,  
//       password: hashedPassword,
//       role: "user"  
//     });

//     await newAdminUser.save();

    
//     return res.status(201).json({  
//       success: true,
//       message: "Customer registered successfully",
//       password: plainPassword,
//       username: customerName
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
    
//     // Handle specific MongoDB errors
//     if (error.code === 11000) {
//       const field = Object.keys(error.keyPattern)[0];
//       return res.status(400).json({ 
//         message: `${field} already exists` 
//       });
//     }
    
//     return res.status(500).json({ 
//       message: error.message || "Internal server error"
//     });
//   }
// };

import bcrypt from "bcrypt";
import Customer from "../../models/customerDetails.model.js";
import Admin from "../../models/admin.model.js";

// Function to generate secure password
// const generateSecurePassword = () => {
//     const length = 5;
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
//     let password = "";
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         password += charset[randomIndex];
//     }
//     return password;
// };

// export const registerCustomer = async(req, res) => {
//   try {
//     const body = req.body;
    
//     if (!body) {
//       return res.status(400).json({  
//         message: "Request body missing"
//       });
//     }

//     const {
//       customerName,
//       email,
//       mobileNum,
//       proName,
//       proCatogory,
//       proSrNo,
//       proModNum,
//       warrStartDate,
//       warrEndDate,
//       ticketNumber  // ✅ From form
//     } = body;

//     // Validate all required fields including ticketNumber
//     if (!customerName || !email || !mobileNum ) {
//       return res.status(400).json({
//         message: "All fields are required"
//       });
//     }

//     // Check if customer already exists by email
//     const existingCus = await Customer.findOne({ email });
//     if (existingCus) {
//       return res.status(400).json({
//         message: "Customer with this email already exists"
//       });
//     }

   
//     const existingAdmin = await Admin.findOne({ username: customerName });
//     if (existingAdmin) {
//       return res.status(400).json({
//         message: "Username already exists in the system"
//       });
//     }

//     // Generate password
//     const plainPassword = generateSecurePassword();
//     const hashedPassword = await bcrypt.hash(plainPassword, 10); 
//     // const encryptPass = encrypt(hashedPassword)// Increased salt rounds for better security
    
//     // Create customer record - NOW INCLUDING TICKET NUMBER
//     const customer = new Customer({
//       customerName,
//       email,
//       mobileNum,
//       proName,
//       proCatogory,
//       proSrNo,
//       proModNum,
//       warrStartDate: new Date(warrStartDate), // Convert to Date object
//       warrEndDate: new Date(warrEndDate),     // Convert to Date object
//       password: plainPassword,  // Store plain password for panel use (consider security implications)
//       ticketNumber: ticketNumber  // ✅ FIXED: Using ticketNumber from request
//     });

//     await customer.save();

//     // Create admin user record with customerName as username
//     const newAdminUser = new Admin({
//       username: customerName,  // ✅ Using customerName as username
//       password: plainPassword,  // Store plain password for panel use (consider security implications)
//       role: "user"  
//     });

//     await newAdminUser.save();

//     return res.status(201).json({  
//       success: true,
//       message: "Customer registered successfully",
//       password: plainPassword,  // Send plain password only once
//       username: customerName    // ✅ Return customerName as username
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
    
//     // Handle specific MongoDB errors
//     // if (error.code === 11000) {
//     //   const field = Object.keys(error.keyPattern)[0];
//     //   return res.status(400).json({ 
//     //     message: `${field} already exists. Please use a different ${field}.`
//     //   });
//     // }
    
//     return res.status(500).json({ 
//       message: error.message || "Internal server error"
//     });
//   }
// };

const generateSecurePassword = () => {
  const length  = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password  = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const registerCustomer = async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Request body missing" });
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
      warrEndDate,
      ticketNumber,
      // ── NEW FIELDS ───────────────────────────────────────────────────────
      invoiceNum,
      brandName,
      // ────────────────────────────────────────────────────────────────────
    } = body;

    if (!customerName || !email || !mobileNum) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCus = await Customer.findOne({ email });
    if (existingCus) {
      return res.status(400).json({ message: "Customer with this email already exists" });
    }

    const existingAdmin = await Admin.findOne({ username: customerName });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists in the system" });
    }

    // ── Passwords ───────────────────────────────────────────────────────
    const plainPassword  = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ── Customer collection ─────────────────────────────────────────────
    const customer = new Customer({
      customerName,
      email,
      mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      warrStartDate: new Date(warrStartDate),
      warrEndDate:   new Date(warrEndDate),
      ticketNumber,
      // ── NEW FIELDS ─────────────────────────────────────────────────────
      invoiceNum:    invoiceNum    || "",
      brandName:     brandName     || "",
      // ───────────────────────────────────────────────────────────────────
      password:      hashedPassword,
      plainPassword: plainPassword,
    });

    await customer.save();

    // ── Admin collection ────────────────────────────────────────────────
    const newAdminUser = new Admin({
      username: customerName,
      password: hashedPassword,
      role:     "user",
    });

    await newAdminUser.save();

    // ── Response ────────────────────────────────────────────────────────
    return res.status(201).json({
      success:  true,
      message:  "Customer registered successfully",
      username: customerName,
      password: plainPassword,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

// Optional: Get customer by ticket number (useful for panel)
// export const getCustomerByTicketNumber = async(req, res) => {
//   try {
//     const { ticketNumber } = req.params;
    
//     const customer = await Customer.findOne({ ticketNumber });
    
//     if (!customer) {
//       return res.status(404).json({
//         message: "Customer not found with this ticket number"
//       });
//     }

//     // Don't send password in response
//     const customerData = customer.toObject();
//     delete customerData.password;

//     return res.status(200).json({
//       success: true,
//       customer: customerData
//     });

//   } catch (error) {
//     console.error("Error fetching customer:", error);
//     return res.status(500).json({
//       message: error.message || "Failed to fetch customer"
//     });
//   }
// };

// Optional: Get all customers (for admin panel)
// export const getAllCustomers = async(req, res) => {
//   try {
//     const customers = await Customer.find({}, { password: 0 }); // Exclude password
    
//     return res.status(200).json({
//       success: true,
//       customers
//     });

//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     return res.status(500).json({
//       message: error.message || "Failed to fetch customers"
//     });
//   }
// };