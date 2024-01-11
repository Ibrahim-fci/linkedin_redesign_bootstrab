import express from "express";
const route = express.Router();

// coustom Modules
import { createPostValidator } from "../middlewares/Validators/Post.Validator.js";
import { authorize } from "../middlewares/Auth/authorize.js";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
} from "../controllers/Post.Controller.js";

route.get("/", getAllPosts);
route.post("/", authorize, createPostValidator, createPost);
route.put("/update/:id", authorize, updatePost);
route.delete("/delete/:id", authorize, deletePost);

export default route;
