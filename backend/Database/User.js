import mongoose from "mongoose";
import "../Database/Config.js";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("users", userSchema);
export default User;
