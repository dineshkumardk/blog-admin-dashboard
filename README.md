# Blog Admin Dashboard

A production-style Blog Admin Dashboard built using modern frontend engineering practices.  
This project demonstrates UI/UX design, component architecture, state management, local data persistence, and problem-solving skills as part of a Frontend Developer assessment.

---

## 🔗 Live Demo
**Deployed on Vercel:**  
👉 https://blog-admin-dashboard-navy.vercel.app/

---

## 🔗 GitHub Repository
👉 https://github.com/dineshkumardk/blog-admin-dashboard

---

## 🛠 Tech Stack
- **React** + **Vite**
- **Tailwind CSS**
- **React Router**
- **LocalStorage** (for persistence)

> No UI libraries (MUI, AntD, Bootstrap) were used, as per assessment requirements.

---

## ✨ Features

### ✅ Admin Layout
- Responsive Sidebar + Navbar + Content area
- Mobile, tablet, and desktop friendly
- Clean and consistent UI

---

### ✅ Blog CRUD Operations
- Create Blog
- Read Blog List
- Edit Blog
- Soft Delete Blog
- Auto Purge deleted blogs after 7 days

---

### ✅ Blog Fields
Each blog contains:
- Title
- Description
- Category
- Author
- Publish Date
- Status (Draft / Published)
- Image (JPG / PNG)

---

### ✅ Image Handling
- JPG / PNG validation
- Max size: **1MB**
- Error shown for invalid images
- Live image preview on create & edit

---

### ✅ Pagination
- 5 blogs per page
- Page numbers
- Prev / Next navigation
- Works seamlessly with search & filters

---

### ✅ Search & Filters
- Search blogs by title
- Filter by Category
- Filter by Status
- Combined filtering supported

---

### ✅ Dashboard
- Derived count display:
  - Total Blogs
  - Published Blogs
  - Draft Blogs
  - Deleted Blogs
- Recent blogs list
- Quick navigation actions

---

### ✅ Persistence
- All blog data stored in **LocalStorage**
- Data persists after page refresh
- Soft-deleted blogs remain hidden

---

### ✅ Error States
- Invalid image format
- Image size exceeds limit
- Empty required fields
- Blog not found handling
- Save / Update disabled unless form data changes

---

## 🧠 Brain Task Selected

### **Soft Delete + Auto Purge**

**Why this approach:**
- Reflects real-world production behavior
- Prevents accidental data loss
- Allows time-based cleanup without backend support

**How it works:**
- On delete, a `deletedAt` timestamp is added
- Deleted blogs are hidden from UI
- Blogs are permanently removed after 7 days on app load

---

## ⚡ Quick Logic Task Selected

### **Derived Count Display**

**Why this approach:**
- Common requirement in admin dashboards
- Demonstrates derived state handling
- Improves UX with meaningful insights

---

## 📁 Folder Architecture

src/
├─ components/
│ └─ layout/
│ ├─ AdminLayout.jsx
│ ├─ Sidebar.jsx
│ └─ Navbar.jsx
├─ pages/
│ ├─ Dashboard.jsx
│ ├─ Blogs.jsx
│ ├─ CreateBlog.jsx
│ └─ EditBlog.jsx
├─ App.jsx
├─ main.jsx
└─ index.css
---

## ▶️ How to Run Locally

```bash
git clone https://github.com/dineshkumardk/blog-admin-dashboard
cd blog-admin-dashboard
npm install
npm run dev