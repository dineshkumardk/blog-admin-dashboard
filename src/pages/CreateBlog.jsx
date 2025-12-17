import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Tech",
    status: "Draft",
    author: "",
    publishDate: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");

  // Track form changes
  const handleChange = (e) => {
    setIsDirty(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image validation + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPG or PNG images allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("Image size must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
      setIsDirty(true);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  // Save Blog
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now().toString(),
      ...form,
      createdAt: Date.now(),
    };

    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    localStorage.setItem(
      "blogs",
      JSON.stringify([newBlog, ...existingBlogs])
    );

    navigate("/blogs");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Blog description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Publish Date */}
        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="w-full"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border"
          />
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`px-4 py-2 rounded text-white ${
            isDirty
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Blog
        </button>
      </form>
    </AdminLayout>
  );
}