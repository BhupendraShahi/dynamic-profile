import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token, "cookie passed inside verify token")
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
        
        req.userId = user._id;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error inside verify token" });
      }
    }
  });
};

export const verifyCookie = async (req, res) => {
  const token = req.cookies.token;
  // console.log(verifyCookie, "cooke inside verify cookie");
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
