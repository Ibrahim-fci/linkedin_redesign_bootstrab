import expressAsyncHandelar from "express-async-handler";

// custom modules
import { verifyToken } from "../../utils/Jwt.js";
import User from "../../models/User.models.js";

export const authorize = expressAsyncHandelar(async (req, res, next) => {
  try {
    //CHECK IF THERE IS TOKEN IN THE HEADER
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    }

    const token = req.headers.authorization.split(" ")[1]; //GET TOKEN FROM REQUEST HEADER
    const { _id } = await verifyToken(token, res); //GET USER DATA FROM TOKEN

    //CHECK IF USER  EXISTED
    const user = await User.findOne({ _id: _id });
    if (!user) return res.status(400).json({ msg: "user does not exist" });

    //RETURN USER DATA IN REQUEST.USER
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
