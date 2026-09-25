import { useState, useEffect, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

// 🔹 Lazy imports
const Home = lazy(() => import("./pages/Home"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
// const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Github = lazy(() => import("./pages/Links/Github"));
const Linkedin = lazy(() => import("./pages/Links/Linkedin"));
const Whatsapp = lazy(() => import("./pages/Links/Whatsapp"));
const Instagram = lazy(() => import("./pages/Links/Instagram"));
// const Mbqueue = lazy(() => import("./pages/Mbqueue"));
const AdminBlogs = lazy(() => import("./pages/AdminBlogs"));
// Component that downloads resume from /public
function ResumeDownload() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/manojgowda.in.pdf";
    link.download = "manojgowda.in.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>
        Downloading resume... <br />
        If it doesn’t start automatically,{" "}
        <a href="/manojgowda.in.pdf" download>
          click here
        </a>
        .
      </p>
    </div>
  );
}

// Layout wrapper with Navbar
function Layout({ theme, toggleTheme }) {
  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        {/* ✅ Use Suspense + Outlet */}
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout theme={theme} toggleTheme={toggleTheme} />,
      children: [
        { index: true, element: <Home /> }, // ✅ use index instead of "/"
        { path: "skills", element: <Skills /> },
        { path: "experience", element: <Experience /> },
        { path: "projects", element: <Projects /> },
        { path: "contact", element: <Contact /> },
        // { path: "blogs", element: <Blogs /> },
        // { path: "blogs/:id", element: <BlogDetail /> },
        { path: "github", element: <Github /> },
        { path: "linkedin", element: <Linkedin /> },
        { path: "whatsapp", element: <Whatsapp /> },
        { path: "instagram", element: <Instagram /> },
        { path: "resume", element: <ResumeDownload /> },
        // { path: "mbqueue", element: <Mbqueue /> }, // Temporary placeholder for mbqueue page
        // { path: "admin/blogs", element: <AdminBlogs /> },

        {
          path: "*",
          element: (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>404 - Page Not Found</h2>
              <a href="/">Go Home</a>
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
