import path from "path";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import emailRoutes from "./email/emailRoutes.js";
import blogRoutes from "./blogs/blogRoutes.js";
import { initDB, Blog } from "./blogs/blogModel.js";
import { adminAuth } from "./middlewares/adminAuth.js";

dotenv.config();
const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pug setup
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));

const allowedOrigins = [
  "https://manojgowda.in",
  "https://www.manojgowda.in",
  "https://profile.manojgowda.in",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://api-email.manojgowda.in"

];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  }
}));

// API routes
app.use("/api", emailRoutes);
app.use("/api/blogs", blogRoutes);

// --- Admin Dashboard Routes ---
app.use("/admin", adminAuth); // Protect all /admin routes

// Dashboard
app.get("/admin", async (req, res) => {
  const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard", { blogs });
});

// New blog
app.get("/admin/new", (req, res) => {
  res.render("blogForm", { blog: {}, action: "/admin/new", method: "POST" });
});
app.post("/admin/new", async (req, res) => {
  const { title, content, imageUrl } = req.body;
  await Blog.create({ title, content, imageUrl });
  res.redirect("/admin");
});

// Edit blog
app.get("/admin/edit/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  res.render("blogForm", { blog, action: `/admin/edit/${blog.id}`, method: "POST" });
});
app.post("/admin/edit/:id", async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const blog = await Blog.findByPk(req.params.id);
  blog.title = title;
  blog.content = content;
  blog.imageUrl = imageUrl;
  await blog.save();
  res.redirect("/admin");
});

// Delete blog
app.post("/admin/delete/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  await blog.destroy();
  res.redirect("/admin");
});

// Start server
const PORT = process.env.PORT || 5000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error("DB connection error:", err));
