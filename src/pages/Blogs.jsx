import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

const ITEMS_PER_PAGE = 5;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Load blogs + Auto purge after 7 days
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const now = Date.now();

    const purgedBlogs = storedBlogs.filter(
      (blog) => !blog.deletedAt || now - blog.deletedAt < SEVEN_DAYS
    );

    setBlogs(purgedBlogs);

    if (purgedBlogs.length !== storedBlogs.length) {
      localStorage.setItem("blogs", JSON.stringify(purgedBlogs));
    }
  }, []);

  // ✅ Soft Delete
  const handleDelete = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id
        ? { ...blog, deletedAt: Date.now() }
        : blog
    );

    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  // 🔍 Search + Filters (exclude deleted)
  const filteredBlogs = blogs
    .filter((blog) => !blog.deletedAt)
    .filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((blog) =>
      categoryFilter ? blog.category === categoryFilter : true
    )
    .filter((blog) =>
      statusFilter ? blog.status === statusFilter : true
    );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <Link
          to="/blogs/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Blog
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full max-w-sm border rounded px-3 py-2"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {currentBlogs.map((blog) => (
              <li
                key={blog.id}
                className="border rounded p-4 bg-white shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">{blog.title}</h2>
                  <p className="text-sm text-gray-500">
                    Category: {blog.category} • Status: {blog.status}
                  </p>
                  <p className="text-xs text-gray-400">Blog ID: {blog.id}</p>
                </div>

                <div className="flex gap-4">
                  <Link
                    to={`/blogs/edit/${blog.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}