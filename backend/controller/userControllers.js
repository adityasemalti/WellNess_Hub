import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({success:false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword, 
    });

    const token = generateToken(user._id);
    res.status(201).json({success:true, message: "User registered", userData:user,token });
  } catch (error) {
    res.status(500).json({success:false, message: "Server error", error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success:false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({success:false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({success:true ,message: "Login successful",userdata:user,token });
  } catch (error) {
    res.status(500).json({success:false, message: "Server error", error: error.message });
  }
};




export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({success:true, user: req.user });
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to fetch user", error: error.message });
  }
};