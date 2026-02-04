import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from '../models/admin.model.js';
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Fixed: was "passsword" (3 s's)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fixed: was "User", should be "Admin"
    const newUser = new Admin({ username, password: hashedPassword, role });
    await newUser.save();
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

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

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
