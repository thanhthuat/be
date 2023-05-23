import { MAX_RECORDS } from "../Global/constants.js";
import { studentRepositories } from "../repositories/index.js";

async function getAllStudents(req, res) {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredStudents = await studentRepositories.getAllStudents({
      size,
      page,
      searchString,
    });
   return res.status(200).json({
      message: " get all student success :",
      data: filteredStudents,
      size: filteredStudents.length,
      page,
      searchString,
    });
  } catch (error) {
    res.status(400).json({
      message: "Cant get student",
    });
  }
}
async function getStudentsById(req, res) {
  let studentId = req.params.id;
  try {
    const student = await studentRepositories.getStudentsById(studentId);
    return res.status(200).json({
      message: "Get detail Student successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function updateStudents(req, res) {
  try {
    const student = await studentRepositories.updateStudents(req.body);
  return  res.status(200).json({
      message: " Update Student successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function deleteStudents(req, res) {
  try {
    const student = await studentRepositories.deleteStudents(id);
  return  res.status(200).json({
      message: " delete Student successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function insertStudents(req, res) {
  try {
    const student = await studentRepositories.insertStudents(req.body);
  return  res.status(200).json({
      message: "Insert Student successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: " Cannot insert student :",
      validatorErrors: error.validationError,
    });
  }
}
// async function fakeStudents(req, res) {
//     await studentRepositories.generateFakeStudents(req.body)
//     res.status(200).json({
//         message: " Cinsert success :",

//       });
//   }
export default {
  getAllStudents,
  getStudentsById,
  updateStudents,
  insertStudents,
  deleteStudents,
};
