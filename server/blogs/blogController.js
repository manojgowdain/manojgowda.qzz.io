import { Blog } from "./blogModel.js";

// Create
export const createBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blog = await Blog.create({ title, content, imageUrl });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    blog.imageUrl = imageUrl ?? blog.imageUrl;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    await blog.destroy();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
