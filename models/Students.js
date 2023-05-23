import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const Student = mongoose.model(
  "Student",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (name) => name.length > 3,
        message: "Nmae must be at least 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: "Email is incorrect format",
      },
    },
    languages: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values:["Male","Female"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) => phoneNumber.length > 5 && phoneNumber.length <= 25,
        message: "phone number must be at least 5 character and 20",
      },
    },
    address: {
      type: String,
      required: true,
    },
  })
);

export default Student;
