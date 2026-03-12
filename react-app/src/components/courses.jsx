import React, { useEffect, useState } from "react";
import {
  FiBook,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiClock,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import styles from "../styles/adminCourses.module.css";

function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/courses", {
        credentials: "include",
      });
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.title?.toLowerCase().includes(searchLower) ||
      course.code?.toLowerCase().includes(searchLower) ||
      course.department?.toLowerCase().includes(searchLower)
    );
  });

  // Stats
  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.status === "active").length;
  const totalStudents = courses.reduce(
    (acc, c) => acc + (c.enrolledStudents || 0),
    0,
  );

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await fetch(`http://localhost:8000/admin/courses/${courseId}`, {
          method: "DELETE",
          credentials: "include",
        });
        setCourses(courses.filter((c) => c.id !== courseId));
        alert("Course deleted successfully");
      } catch (error) {
        alert("Failed to delete course");
      }
    }
  };

  // Toggle course status
  const toggleCourseStatus = async (courseId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await fetch(`http://localhost:8000/admin/courses/${courseId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      setCourses(
        courses.map((c) =>
          c.id === courseId ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (error) {
      alert("Failed to update course status");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Course Management</h1>
        <button
          className={styles.addButton}
          onClick={() => {
            setEditingCourse(null);
            setShowModal(true);
          }}
        >
          <FiPlus /> Add Course
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <FiBook />
          <div>
            <span>Total Courses</span>
            <strong>{totalCourses}</strong>
          </div>
        </div>
        <div className={styles.statCard}>
          <FiCheckCircle />
          <div>
            <span>Active Courses</span>
            <strong>{activeCourses}</strong>
          </div>
        </div>
        <div className={styles.statCard}>
          <FiUsers />
          <div>
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchSection}>
        <FiSearch />
        <input
          type="text"
          placeholder="Search by title, code, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Courses Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  <strong>{course.code}</strong>
                </td>
                <td>{course.title}</td>
                <td>{course.department || "N/A"}</td>
                <td>{course.duration || 0} hrs</td>
                <td>{course.enrolledStudents || 0}</td>
                <td>
                  <span
                    className={`${styles.status} ${styles[course.status || "inactive"]}`}
                    onClick={() => toggleCourseStatus(course.id, course.status)}
                    style={{ cursor: "pointer" }}
                  >
                    {course.status === "active" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiXCircle />
                    )}
                    {course.status || "inactive"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setShowModal(true);
                    }}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    title="Delete"
                    style={{ marginLeft: "0.5rem", color: "#f56565" }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCourses.length === 0 && (
          <div className={styles.emptyState}>
            <FiBook />
            <h3>No courses found</h3>
            <p>Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Course Modal */}
      {showModal && (
        <CourseModal
          course={editingCourse}
          onClose={() => {
            setShowModal(false);
            setEditingCourse(null);
          }}
          onSave={async (courseData) => {
            try {
              if (editingCourse) {
                // Update
                const response = await fetch(
                  `http://localhost:8000/admin/courses/${editingCourse.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(courseData),
                  },
                );
                if (response.ok) {
                  fetchCourses();
                }
              } else {
                // Create
                const response = await fetch(
                  "http://localhost:8000/admin/courses",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(courseData),
                  },
                );
                if (response.ok) {
                  fetchCourses();
                }
              }
              setShowModal(false);
            } catch (error) {
              alert("Failed to save course");
            }
          }}
        />
      )}
    </div>
  );
}

// Simple Modal
function CourseModal({ course, onClose, onSave }) {
  const [formData, setFormData] = useState({
    code: course?.code || "",
    title: course?.title || "",
    description: course?.description || "",
    department: course?.department || "",
    duration: course?.duration || 40,
    status: course?.status || "draft",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{course ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Course Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Course Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Duration (hours)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              min="1"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{course ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCourses;
