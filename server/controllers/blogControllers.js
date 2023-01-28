import Blog from "../models/blog.js";
import User from "../models/user.js";
import fs from "file-system";
import { CastError } from "mongoose";

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find().populate("author");
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
}

async function getABlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    if (!blog) {
      return res.status(400).json({ error: true, message: "Blog not found." });
    }
    return res.json(blog);
  } catch (error) {
    if (error instanceof CastError) {
      res
        .status(400)
        .send({ error: "Invalid id - please enter the correct id." });
    } else {
      next(error);
    }
  }
}

async function getUserBlog(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate("blogs");

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    if (error instanceof CastError) {
      res
        .status(400)
        .send({ error: "Invalid id - please enter the correct id." });
    } else {
      next(error);
    }
  }
}

async function createBlog(req, res, next) {
  console.time("Controller check");
  let userId = req.user._id;
  try {
    const data = req.body;
    console.timeLog("Controller check");
    let currentUser = await User.findById(userId);
    console.timeLog("Controller check");
    data.author = userId;
    const newBlog = await Blog.create(data);
    console.timeLog("Controller check");
    currentUser.blogs.push(newBlog._id);
    await currentUser.save();
    console.timeLog("Controller check");
    res.json(newBlog);
    console.timeEnd("Controller check");
  } catch (error) {
    res.status(400).json(error);
  }
}

async function updatedBlog(req, res, next) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: true, message: "Blog not found." });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default {
  createBlog,
  getAllBlogs,
  getABlog,
  getUserBlog,
  updatedBlog,
  deleteBlog,
};
