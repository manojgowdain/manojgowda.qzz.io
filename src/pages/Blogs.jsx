import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const COUCHDB_URL = "http://52.66.43.15:5984/blogs";
const AUTH = { username: "admin", password: "admin" };

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${COUCHDB_URL}/_all_docs?include_docs=true`, { auth: AUTH });
      const docs = res.data.rows.map((row) => row.doc);
      setBlogs(docs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="section">
      <Helmet>
        <title>Blogs | Manoj Gowda</title>
        <meta
          name="description"
          content="Read Manoj Gowda's latest blog posts on web development, MERN stack, React, Node.js, DevOps, IoT, and more."
        />
        <meta name="keywords" content="Manoj Gowda blogs, web development, MERN stack, React, Node.js, DevOps, IoT" />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href="https://manojgowda.in/blogs" />
      </Helmet>

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
        <div className="text-center sm:text-left mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            📝 <span className="gradient-text">Blogs</span>
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse border rounded-lg shadow bg-gray-200 h-32 sm:h-36 md:h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog._id}`}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white"
              >
                {blog.image ? (
                  <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
