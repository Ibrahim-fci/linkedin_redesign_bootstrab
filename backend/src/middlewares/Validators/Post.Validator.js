import { check } from "express-validator";
import validatorResultMiddeleware from "./Validation.Result.js";

export const createPostValidator = [
  check("content").notEmpty().withMessage("content is required"),

  validatorResultMiddeleware,
];
