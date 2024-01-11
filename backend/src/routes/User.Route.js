import express from "express";
const route = express.Router();

// custom modules
import {
  createUserValidator,
  loginValidator,
} from "../middlewares/Validators/User.Validator.js";
import { createUser, login } from "../controllers/Auth.Controller.js";

// routes
route.post("/signup", createUserValidator, createUser);
route.post("/login", loginValidator, login);

export default route;
