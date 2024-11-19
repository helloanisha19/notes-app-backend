import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 });
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while retrieving users",
      status: 0,
    });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: 0,
    });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        status: 0,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password",
        status: 0,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "3m",
    });
    res.status(200).json({
      message: "User logged in successfully",
      token,
      status: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: 0,
    });
  }
};
