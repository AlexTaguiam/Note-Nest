import User from "../models/authModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const loginUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.error("Error in login ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.error("Error in signing up ", error.message);
    res.status(400).json({ error: error.message });
  }
};
