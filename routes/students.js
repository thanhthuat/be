import express from "express";
import { studentController } from "../controllers/index.js";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentsById);
router.put("/", studentController.updateStudents);
router.post("/", studentController.insertStudents);
// router.post("/fake", studentController.fakeStudents);
// router.get('/',studentController.getAllStudents);
export default router;
