import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

import { initialBlogs } from "./data/blogs";
import { getBlogs, saveBlogs } from "./utils/blogStorage";

export default function App() {
  // Initialize blogs in LocalStorage on first load
  useEffect(() => {
    const existingBlogs = getBlogs();
    if (!existingBlogs || existingBlogs.length === 0) {
      saveBlogs(initialBlogs);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/new" element={<CreateBlog />} />
      <Route path="/blogs/edit/:id" element={<EditBlog />} />
    </Routes>
  );
}