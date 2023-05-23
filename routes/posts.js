import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/index.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
  debugger;
  res.status(201).json({
    success: true,
    message: "signup successful",
    data: ''
});
});
router.post(
  "/",
  body("name").isEmail(),

  body("password").isLength({ min: 5 }),
  (req, res) => {

    const { name, password } = req.body;
    res.status(200).json(req.body);
  }
);
router.patch("/:id", updatePost);
router.delete("/", deletePost);
router.delete("/:id/likePost", likePost);

export default router;
