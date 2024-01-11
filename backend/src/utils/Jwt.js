import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Secret key to sign the token
const secretKey = process.env.JWT_SECRET_KEY || "secret";

// Function to generate a JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
