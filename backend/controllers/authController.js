import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import Admin from "../models/admin.model.js"
import Customer from "../models/customerDetails.model.js";

dotenv.config();

// 🔐 password generator (this is OK)
const generateSecurePassword = (length = 12) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString("hex").slice(0, length);
};

export const register = async (req, res) => {
  try {
    // STEP 1️⃣ Destructure request body
    const {
      customerName,
      email,
      mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      brandName,
      purDate,
      invoiceNum,
      warrStartDate,
      warrEndDate
    } = req.body;

    // STEP 2️⃣ Validation
    if (
      !customerName || !email || !mobileNum ||
      !proName || !proCatogory || !proSrNo ||
      !proModNum || !brandName || !purDate ||
      !invoiceNum || !warrStartDate || !warrEndDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // STEP 3️⃣ Duplicate check
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { mobileNum }, { proSrNo }]
    });

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // STEP 4️⃣ Generate & hash password
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // STEP 5️⃣ Create customer
    // ⚠️ TicketNumber is NOT passed here
    const newCustomer = await Customer.create({
      customerName,
      email,
      mobileNum,
      proName,
      proCatogory,
      proSrNo,
      proModNum,
      brandName,
      purDate,
      invoiceNum,
      warrStartDate,
      warrEndDate,
      password: hashedPassword
    });

    // STEP 6️⃣ Response
    res.status(201).json({
      message: "Customer registered successfully",
      ticketNumber: newCustomer.TicketNumber,
      password: plainPassword
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



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
      { expiresIn: "1h" }
    );

    // STEP 5: Send success response
    res.status(200).json({
      message: "Login successful",
      token,
       username: admin.username,  // ✅ Added this
      role: admin.role 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};