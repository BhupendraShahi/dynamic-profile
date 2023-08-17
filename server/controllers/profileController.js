import { response } from "express";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, bio, skills, experience, education, profilePicture, connections } = req.body.user;
  console.log(req.body, "res");
  try {
    console.log(profilePicture, "response");
    console.log(username, "response");
    console.log(req.userId, "userID");
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username, bio, skills, experience, education, profilePicture, connections
      },
      { new: true }
    ).select('-password');

    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user, "after update");

    // Return the updated user profile
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
