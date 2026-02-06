import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from '../models/admin.model.js';
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // STEP 1: Validate input FIRST (before doing anything else)
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // STEP 2: Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // STEP 3: Hash password (only after validation passes)
    const hashedPassword = await bcrypt.hash(password, 10);

    // STEP 4: Create and save new user
    const newUser = new Admin({ username, password: hashedPassword, role });
    await newUser.save();

    // STEP 5: Send success response
    res
      .status(201)
      .json({ message: `User Registered With username ${username}` });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong" });
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