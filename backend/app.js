import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

// custom modules
import { dbConnetion } from "./src/utils/db.connection.js";

// constants
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// routes
import UserRoute from "./src/routes/User.Route.js";
import PostRoute from "./src/routes/Post.Route.js";

app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);

// database connection
await dbConnetion();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
