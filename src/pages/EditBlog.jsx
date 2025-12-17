import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // 🔹 Load blog from localStorage
  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blog = blogs.find(
      (b) => String(b.id) === String(id) && !b.deletedAt
    );

    if (!blog) {
      setNotFound(true);
      return;
    }

    setOriginalData(blog);
    setFormData(blog);
  }, [id]);

  // ⚠️ Warn on refresh / tab close if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // 🚨 Blog not found
  if (notFound) {
    return (
      <AdminLayout>
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back to Blogs
          </button>
        </div>
      </AdminLayout>
    );
  }

  // ⏳ Loading
  if (!formData) return null;

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setIsDirty(JSON.stringify(updated) !== JSON.stringify(originalData));
  };

  // 🖼️ Handle image replace
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG or PNG images are allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image size must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...formData, image: reader.result };
      setFormData(updated);
      setIsDirty(JSON.stringify(updated) !== JSON.stringify(originalData));
    };
    reader.readAsDataURL(file);
  };

  // 🔙 Handle back navigation safely
  const handleBack = () => {
    if (isDirty && !window.confirm("You have unsaved changes. Leave anyway?")) {
      return;
    }
    navigate("/blogs");
  };

  // 💾 Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = blogs.map((b) =>
      String(b.id) === String(id) ? formData : b
    );

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    navigate("/blogs");
  };

  return (
    <AdminLayout>
      {/* Back Button */}
      {/* <button
        type="button"
        onClick={handleBack}
        className="text-blue-600 underline mb-4"
      >
        ← Back to Blogs
      </button> */}
      <button
  type="button"
  onClick={handleBack}
  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
>
  <span className="text-lg">←</span>
  <span>Back to Blogs</span>
</button>


      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Author */}
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Publish Date */}
        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        {/* Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-40 h-40 object-cover border rounded"
          />
        )}

        {/* Replace Image */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />

        {/* Update Button */}
        <button
          disabled={!isDirty}
          className={`px-4 py-2 rounded text-white ${
            isDirty
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Update Blog
        </button>
      </form>
    </AdminLayout>
  );
}