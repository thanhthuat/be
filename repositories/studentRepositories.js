import Exception from "../errors/Exception.js";
import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";
import { OutputType, print } from "../helpers/print.js";

const getAllStudents = async ({ page, size, searchString }) => {
  // aggregate data for all students
  page = parseInt(page);
  size = parseInt(size);
  // searchString ? name ,email, addres contains ,searchString
  let filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
        ],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredStudents;
};

const insertStudents = async ({ name, email, languages, gender, phoneNumber, address }) => {
  try {
    const student = await Student.create({ name, email, languages, gender, phoneNumber, address });
  } catch (error) {
    if (error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
};

const updateStudents = async ({ id, name, email, languages, gender, phoneNumber, address }) => {
  try {
    const student = await Student.findById(id);
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender;
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;
    await student.save();
    return student;
  } catch (error) {
    if (error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
};

const deleteStudents = async (id) => {
  try {
    const student = await Student.findById(id);

    await student.remove();
    return student;
  } catch (error) {
    if (error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
};
const getDetailStudent = async (studentId) => {
  const studetn = await Student.findById(studentId);
  if (!!studetn) {
    throw new Exception("Cant find Student with id " + studentId);
  }
  return studetn;
};
async function generateFakeStudents() {
  let fakeStudents = [];
  for (let i = 0; i < 100; i++) {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [faker.helpers.arrayElement(["English", "Vietnamese"])],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.address.country(),
    };
    fakeStudents.push(fakeStudent);
  }

  //
  await Student.insertMany(fakeStudents);
}

export default {
  getAllStudents,
  insertStudents,
  generateFakeStudents,
  getDetailStudent,
  updateStudents,
  deleteStudents,
};
