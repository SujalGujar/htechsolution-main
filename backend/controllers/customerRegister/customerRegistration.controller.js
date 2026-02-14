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
export const registerCustomer = async(req,res) => {
  
  try{
    const body = req.body
    if(!body){
      res.status(400).json({
        message:"Request body missing"
      })
    }

    const{
      customerName,
      email,
      mobileNum,
    proName,
    proCatogory,
    proSrNo,
    proModNum,
  } = body

  if(!customerName||
      !email||
      !mobileNum||
    !proName||
    !proCatogory||
    !proSrNo||
    !proModNum){
      res.status(400).json({message:"All Fields is Required"})
    }

    const existingCus = await Customer.findOne({email});
    if(existingCus){
      return res.status(400).json({message:"Customer Already Exist"})
    }

    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const customer = new Customer({
      customerName,
      email,
      mobileNum,
    proName,
    proCatogory,
    proSrNo,
    proModNum,
    password: hashedPassword
    });



    await customer.save();

   res.status(201).json({
      message: "Product registered successfully",
      // ticketNumber: product.TicketNumber,
      password: plainPassword
    });


  }catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
  
};