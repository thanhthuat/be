import mongoose from "mongoose";
import PostMessage from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // console.log("🚀 ~ file: posts.js:6 ~ getPosts ~ postMessages", postMessages)
  return  res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
  return  res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req?.params ?? '';
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO post with that id");

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

return  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO post with that id");
  await PostMessage.findByIdAndRemove(id);
 return res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO post with that id");

  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatePost);
};
