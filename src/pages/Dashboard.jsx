import { Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

export default function Dashboard() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const total = blogs.length;
  const published = blogs.filter(b => b.status === "Published" && !b.deletedAt).length;
  const draft = blogs.filter(b => b.status === "Draft" && !b.deletedAt).length;
  const deleted = blogs.filter(b => b.deletedAt).length;

  const recentBlogs = blogs
    .filter(b => !b.deletedAt)
    .slice(-5)
    .reverse();

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Blogs" value={total} />
        <StatCard title="Published" value={published} />
        <StatCard title="Drafts" value={draft} />
        <StatCard title="Deleted" value={deleted} />
      </div>

      {/* Recent Blogs */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Recent Blogs</h2>

        {recentBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet</p>
        ) : (
          <ul className="space-y-2">
            {recentBlogs.map(blog => (
              <li key={blog.id} className="flex justify-between">
                <span>{blog.title}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    blog.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.status}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-4 mt-4">
          <Link to="/blogs" className="text-blue-600">View Blogs</Link>
          <Link to="/blogs/new" className="text-green-600">Create Blog</Link>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}