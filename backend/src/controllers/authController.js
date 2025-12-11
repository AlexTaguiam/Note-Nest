import User from "../models/authModel.js";

export const loginController = async (req, res) => {
  try {
    res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.error("Error in login ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const registerController = async (req, res) => {
  try {
    res.status(200).json({ message: "Register successfull" });
  } catch (error) {
    console.error("Error in Registering ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
