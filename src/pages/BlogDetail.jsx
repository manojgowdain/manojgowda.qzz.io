import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const COUCHDB_URL = "http://52.66.43.15:5984/blogs";
const AUTH = { username: "admin", password: "admin" };

const BlogDetailSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
    <div className="w-32 h-6 bg-gray-300 rounded"></div>
    <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-300 rounded-lg"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${COUCHDB_URL}/${id}`, { auth: AUTH });
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <BlogDetailSkeleton />;
  if (!blog) return <p className="text-center mt-10 text-gray-500 text-lg">Blog not found</p>;

  const description = blog.content.length > 160 ? blog.content.slice(0, 157) + "..." : blog.content;
  const keywords = blog.title.split(" ").concat(blog.content.split(" ").slice(0, 10)).join(", ");
  const canonicalUrl = `https://manojgowda.in/blogs/${blog._id}`;

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
      <Helmet>
        <title>{blog.title} | Manoj Gowda</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Manoj Gowda" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={description} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={description} />
        {blog.image && <meta name="twitter:image" content={blog.image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link
        to="/blogs"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back to Blogs
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(blog.createdAt).toLocaleDateString()}</p>

      {blog.image && (
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg mb-6 shadow-lg">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
