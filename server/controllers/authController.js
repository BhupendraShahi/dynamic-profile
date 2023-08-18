import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createSecretToken } from "../util/secretToken.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password, username, bio, experience, education, skills, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // // Upload the profile image to Cloudinary
    // const imageResponse = await cloudinary.uploader.upload(profileImage, {
    //   folder: "upload",
    // });
    // const imageUrl = imageResponse.secure_url;

    // Create the user record
    const user = await User.create({
      email,
      password,
      username,
      bio,
      experience,
      education,
      skills,
      profilePicture
    });
    // Generate and set token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error signing up", success: false });
  }
  next();
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('token'); 
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Failed to logout' });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
