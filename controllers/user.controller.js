import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";

// Register
export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    // create & save both
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    // Creating a account with a random balance
    const userId = newUser._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email }); // return document or undefined
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        success: false,
      });
    }

    // return-> true or false
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Token generation

    // payload
    const tokenData = {
      userId: user._id,
    };

    // Not sending password/sensitive data to client
    user = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });

    return res.status(200).json({
      message: "Token generated successfully",
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { firstname, lastname, password } = req.body;

    // Check authentication using id send from the middleware

    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Updating
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    user = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filteredUser = async (req, res) => {
  const filterName = req.query.filterName || ""; // ?filterName='harkirat'

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filterName,
          $options: "i",
        },
      },
      {
        lastname: {
          $regex: filterName,
          $options: "i",
        },
      },
    ],
  });

  return res.status(200).json({
    message: "All users",
    success: true,
    user: users.map((user) => ({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
    })),
  });
};
