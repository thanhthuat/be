import Exception from "../errors/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  // validation already done
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    const isMatche = await bcrypt.compare(password, existingUser.password);
    if (!!isMatche) {
      // create Jav web Token
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: "60", //1 minute
          expiresIn: "1 days",
        }
      );
      //clone an ad more properties
      return { ...existingUser.toObject(), token: token };
    } else {
      throw new Exception(Exception.WRONG_PASSWORD_EMAIL);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
  }
  print("login user in user repository", OutputType.INFORMATION);
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    // encrypt password ma hoa password
    // const isMatche = await bcrypt.compare(password, existingUser.password);

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    let newUserFormat = { ...newUser._doc };
    delete newUserFormat?.password;
    return newUserFormat;
  } catch (error) {
    // check modal validation
    throw new Exception(Exception.CANNOT_rEGISTER_USER);
  }
  // print("register user with :name" +name +"email:"+email+"password:"+ password,OutputType.INFORMATION)
};

export default {
  login,
  register,
};
