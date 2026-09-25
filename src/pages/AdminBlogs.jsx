import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaSave } from "react-icons/fa";

const COUCHDB_URL = "http://52.66.43.15:5984/blogs";
const AUTH = { username: "admin", password: "admin" };

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [newBlog, setNewBlog] = useState({ 
    title: "", 
    content: "", 
    image: "",
    category: "",
    status: "published" 
  });
  
  const [updateBlogData, setUpdateBlogData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${COUCHDB_URL}/_all_docs?include_docs=true`, { auth: AUTH });
      const docs = res.data.rows.map((row) => row.doc);
      setBlogs(docs);
      toast.success("Blogs loaded successfully");
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle image upload
  const handleImageUpload = (e, setBlogState) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 1024 * 1024) {
      toast.warning("Image must be smaller than 1MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => setBlogState(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  // Create new blog
  const createBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      toast.error("Title and content are required");
      return;
    }
    
    try {
      const blog = { 
        ...newBlog, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await axios.post(COUCHDB_URL, blog, { auth: AUTH });
      setNewBlog({ title: "", content: "", image: "", category: "", status: "published" });
      setShowCreateForm(false);
      toast.success("Blog created successfully!");
      fetchBlogs();
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error("Failed to create blog");
    }
  };

  // Update blog with new values
  const updateBlog = async (e) => {
    e.preventDefault();
    if (!updateBlogData.title || !updateBlogData.content) {
      toast.error("Title and content are required");
      return;
    }
    
    try {
      const updatedBlog = {
        ...updateBlogData,
        updatedAt: new Date().toISOString()
      };
      
      await axios.put(`${COUCHDB_URL}/${updateBlogData._id}`, updatedBlog, {
        auth: AUTH,
        headers: { "If-Match": updateBlogData._rev },
      });
      
      setUpdateBlogData(null);
      toast.success("Blog updated successfully!");
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Failed to update blog");
    }
  };

  // Delete blog
  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    try {
      await axios.delete(`${COUCHDB_URL}/${deleteConfirm._id}?rev=${deleteConfirm._rev}`, { auth: AUTH });
      setDeleteConfirm(null);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog");
    }
  };

  // Get sorted and filtered blogs
  const getSortedBlogs = () => {
    const filteredBlogs = blogs.filter(blog => 
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return [...filteredBlogs].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Blog Management</h1>
          <div className="w-full md:w-auto">
            <button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors w-full md:w-auto justify-center"
            >
              <FaPlus size={14} /> New Blog
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-4 md:py-6">
        {/* Search */}
        <div className="mb-4 md:mb-6 bg-white rounded-lg shadow p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full flex-1">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={fetchBlogs}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors w-full sm:w-auto"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {/* Blogs Display - Card View */}
        <div className="bg-white rounded-lg shadow overflow-hidden p-3 md:p-4">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading blogs...</p>
            </div>
          ) : getSortedBlogs().length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No blogs found. Create a new blog to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getSortedBlogs().map((blog) => (
                <div key={blog._id} className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                  <div className="relative h-40 bg-gray-100">
                    {blog.image ? (
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                    {blog.status === "draft" && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">Draft</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{blog.content}</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        {blog.category && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{blog.category}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setUpdateBlogData(blog)}
                          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm flex-1"
                        >
                          <FaEdit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(blog)}
                          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex-1"
                        >
                          <FaTrash size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Create Blog Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-3 md:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b sticky top-0 z-10">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Create New Blog</h2>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 md:p-6 max-h-[calc(90vh-70px)]">
              <form onSubmit={createBlog}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Blog title"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      required
                      placeholder="Blog content"
                      value={newBlog.content}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="Blog category"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newBlog.status}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setNewBlog)} 
                        className="flex-1"
                      />
                      {newBlog.image && (
                        <div className="w-20 h-20 relative mt-2 sm:mt-0">
                          <img 
                            src={newBlog.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={() => setNewBlog(prev => ({ ...prev, image: "" }))}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto mb-2 sm:mb-0"
                  >
                    <FaPlus size={14} /> Create Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Update Blog Modal */}
      {updateBlogData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-3 md:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center bg-yellow-50 px-4 md:px-6 py-3 md:py-4 border-b border-yellow-200 sticky top-0 z-10">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-yellow-500" /> Update Blog
              </h2>
              <button 
                onClick={() => setUpdateBlogData(null)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 md:p-6 max-h-[calc(90vh-70px)]">
              <form onSubmit={updateBlog}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Blog title"
                      value={updateBlogData.title}
                      onChange={(e) => setUpdateBlogData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      required
                      placeholder="Blog content"
                      value={updateBlogData.content}
                      onChange={(e) => setUpdateBlogData(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="Blog category"
                      value={updateBlogData.category || ""}
                      onChange={(e) => setUpdateBlogData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={updateBlogData.status || "published"}
                      onChange={(e) => setUpdateBlogData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setUpdateBlogData)} 
                        className="flex-1"
                      />
                      {updateBlogData.image && (
                        <div className="w-20 h-20 relative mt-2 sm:mt-0">
                          <img 
                            src={updateBlogData.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={() => setUpdateBlogData(prev => ({ ...prev, image: "" }))}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setUpdateBlogData(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto mb-2 sm:mb-0"
                  >
                    <FaSave size={14} /> Update Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 md:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete the blog "{deleteConfirm.title}"? 
              This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto mb-2 sm:mb-0"
              >
                <FaTrash size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;