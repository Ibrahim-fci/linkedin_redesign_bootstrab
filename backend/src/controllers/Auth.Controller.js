import User from "../models/User.models.js";
import { decryptText, encryptText } from "../utils/bcrypt.js";
import { generateToken } from "../utils/Jwt.js";

// Function to create a new user
export const createUser = async (req, res) => {
  const data = req.body;

  try {
    // chek if user existes before with the same email
    const isExisted = await User.findOne({ email: data.email });
    if (isExisted) {
      return res.status(400).json({ message: "User already exists" });
    }

    // encrypt password
    let hash = encryptText(data.password);

    // create a new user
    const user = new User({
      ...data,
      password: hash,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Function to login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // chek if user existes before with the same email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // decrypt password
    let isMatch = decryptText(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    let token = generateToken({
      _id: user._id,
      email: user.email,
      username: user.username,
    });
    return res
      .status(200)
      .json({ message: "loged in successfully", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
