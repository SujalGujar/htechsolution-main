import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import Admin from "../models/admin.model.js"
// import Customer from "../models/customerDetails.model.js";
import Product from "../models/productDetails.model.js";
import Customer from "../models/customerDetails.model.js";

dotenv.config();


// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import Customer from "../models/customerDetails.model.js";

// 🔐 Password generator
const generateSecurePassword = (length = 12) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString("hex").slice(0, length);
};

export const register = async (req, res) => {
  try {
    
    const body = req.body;
    if (!body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const {
      // customerName,
      // email,
      // mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      
      brandName,
      purDate,
      invoiceNum,
      // warrStartDate,
      // warrEndDate
    } = body;

    // ✅ STEP 4: Validation
    if (
      
      !proName || !proCatogory || !proSrNo ||
      !proModNum || !brandName || !purDate ||
      !invoiceNum 
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ STEP 5: Duplicate checks (REALISTIC)
    const existingProduct = await Product.findOne({ proSrNo });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already registered" });
    }

    // ✅ STEP 6: Password generation
    // const plainPassword = generateSecurePassword();
    // const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ✅ STEP 7: Create document using save()
    const product = new Product({
      // customerName,
      // email,
      // mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      brandName,
      purDate,
      invoiceNum,
      // warrStartDate,
      // warrEndDate,
      // password: hashedPassword
    });

    await product.save(); // 🔥 pre("save") runs here

    // ✅ STEP 8: Response
    res.status(201).json({
      message: "Product registered successfully",
      ticketNumber: product.TicketNumber,
      // password: plainPassword
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};
// export const registerCustomer = async(req,res) => {
//   // res.json({message:"registercustomer route is working"};
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
//   } = body

//   if(!customerName||
//       !email||
//       !mobileNum||
//     !proName||
//     !proCatogory||
//     !proSrNo||
//     !proModNum){
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
//     password: hashedPassword
//     });



//     await customer.save();

//    res.status(201).json({
//       message: "Product registered successfully",
//       // ticketNumber: product.TicketNumber,
//       password: plainPassword
//     });


//   }catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: error.message });
//   }
  
// };



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // STEP 1: Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // STEP 2: Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // STEP 3: Compare password - FIXED: Changed user.password to admin.password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // STEP 4: Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // STEP 5: Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      username: admin.username,  
      role: admin.role 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};