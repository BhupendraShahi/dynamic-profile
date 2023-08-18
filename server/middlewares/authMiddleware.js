import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, secretKey, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (!user) {
          return res.json({ status: false });
        }
        
        req.userId = user._id;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  });
};

export const verifyCookie = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "no token found" });
  }

  jwt.verify(token, secretKey, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "error" });
    } else {
      try {
        const user = await User.findById(data.id);
        if (!user) {
          return res.json({ status: false, message: "No user Found"  });
        }
        
        return res.json({ status:true, name:user.username});
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  });
};
