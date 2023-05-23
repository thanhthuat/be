import { userRepositories } from "../repositories/index.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
   let existingUser = await userRepositories.login({ email, password });
   return res.status(200).json({
      success: true,
      message: "login successful",
      data: existingUser,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "login fail",
      data: error.toString(),
    });
  }
};
export const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const user = await userRepositories.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
   return res.status(200).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};
export const getDetaiUser = async (req, res) => {};
