import mongoose from "mongoose";
import Exception from "../errors/Exception.js";
import { print, OutputType } from "../helpers/print.js";
const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", true);

    let connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    print("connect mongoose successfull", OutputType.SUCCESS);
  } catch (error) {
    print("connect mongoose error", OutputType.ERROR);
    const { code } = error;
    if (error.code === 8000) {
      throw new Exception("Cannot connect to MongoDB");
    }else if(code == 'ENOTFOUND'){
        throw new Exception("Wrong server name/connection string")
    }
    throw new Exception("Cant connect to Mongoose")
  }
};

export default connectDB;
