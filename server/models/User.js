import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  profilePicture: {
    type: String,
    default:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
  },
  bio: {
    type: String,
    required: [true, "Your bio is required"],
  },
  experience: {
    type: [String],
    default: []
  },
  education: {
    type: [String],
    default: []
  },
  skills:{
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  connections: { 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model('DynamicUsers', userSchema);