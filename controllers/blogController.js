const Blog = require("../models/blogModel");

const blogList = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log({ blogs });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogCreate = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const blog = await Blog.create({ title, content });
    return res.status(201).json(blog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    return res.status(201).json(blog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const blogDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { blogList, blogCreate, blogDetail, blogUpdate, blogDelete };
