// UsersPage.jsx
import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiPhone,
  FiAward,
  FiBook,
  FiClock,
  FiDownload,
  FiUpload,
  FiX,
  FiEye,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import styles from "../styles/usersPage.module.css";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Changed to single selection
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8000/auth/find/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      // Handle different response structures
      const usersArray = data.Users || data.users || data || [];

      // Map backend data to frontend structure
      const mappedUsers = usersArray.map((user, index) => ({
        id: user.id || user._id || index + 1,
        name: user.name || user.email || "Unknown User",
        email: user.email || "",
        phone: user.phone || user.mobile || "N/A",
        role: user.role || "student",
        status: user.status || "active",
        avatar: user.name ? user.name.charAt(0).toUpperCase() : "U",
        enrolledCourses: user.enrolledCourses || user.courses?.length || 0,
        competencies: user.competencies || user.skills?.length || 0,
        lastActive:
          user.lastActive || user.lastLogin || new Date().toISOString(),
      }));

      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search only
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.name?.toLowerCase() || "").includes(searchLower) ||
      (user.email?.toLowerCase() || "").includes(searchLower) ||
      (user.role?.toLowerCase() || "").includes(searchLower) ||
      (user.status?.toLowerCase() || "").includes(searchLower)
    );
  });

  // Pagination
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  // Handle user selection (single only)
  const toggleUserSelection = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  // Handle user actions
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddModal(true);
    setSelectedUserId(null); // Clear selection when editing
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Call API to delete user
        await fetch(`http://localhost:8000/auth/users/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });

        setUsers(users.filter((user) => user.id !== userId));
        if (selectedUserId === userId) {
          setSelectedUserId(null); // Clear selection if deleted user was selected
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await fetch(`http://localhost:8000/auth/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user,
        ),
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  // Get role badge color
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "#f56565";
      case "instructor":
        return "#48bb78";
      case "student":
        return "#4299e1";
      default:
        return "#a0aec0";
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "#48bb78";
      case "inactive":
        return "#a0aec0";
      case "suspended":
        return "#f56565";
      default:
        return "#a0aec0";
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.usersPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>User Management</h1>
          <p className={styles.pageSubtitle}>
            Manage your users, their roles, and permissions
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportBtn}>
            <FiDownload />
            Export
          </button>
          <button className={styles.importBtn}>
            <FiUpload />
            Import
          </button>
          <button
            className={styles.addBtn}
            onClick={() => {
              setEditingUser(null);
              setShowAddModal(true);
            }}
          >
            <FiPlus />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(66, 153, 225, 0.1)", color: "#4299e1" }}
          >
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Users</span>
            <span className={styles.statValue}>{users.length}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(72, 187, 120, 0.1)", color: "#48bb78" }}
          >
            <FiUserCheck />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Active Users</span>
            <span className={styles.statValue}>
              {users.filter((u) => u.status === "active").length}
            </span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(245, 101, 101, 0.1)", color: "#f56565" }}
          >
            <FiUserX />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Inactive/Suspended</span>
            <span className={styles.statValue}>
              {users.filter((u) => u.status !== "active").length}
            </span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(246, 173, 85, 0.1)", color: "#f6ad55" }}
          >
            <FiAward />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Competencies</span>
            <span className={styles.statValue}>
              {users.reduce((acc, user) => acc + (user.competencies || 0), 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Search Only */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name, email, role, or status..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
              setSelectedUserId(null); // Clear selection on search
            }}
          />
        </div>
      </div>

      {/* Selected User Actions - Shows only when a user is selected */}
      {selectedUserId && (
        <div className={styles.selectedActions}>
          <span className={styles.selectedCount}>1 user selected</span>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDeleteUser(selectedUserId)}
          >
            <FiTrash2 />
            Delete
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleStatusChange(selectedUserId, "suspended")}
          >
            <FiLock />
            Suspend
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => handleStatusChange(selectedUserId, "active")}
          >
            <FiUnlock />
            Activate
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>Select</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Last Active</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className={`${styles.tableRow} ${selectedUserId === user.id ? styles.selectedRow : ""}`}
                onClick={() => toggleUserSelection(user.id)}
                style={{ cursor: "pointer" }}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="radio"
                    name="userSelection"
                    checked={selectedUserId === user.id}
                    onChange={() => toggleUserSelection(user.id)}
                    className={styles.radio}
                  />
                </td>
                <td>
                  <div className={styles.userCell}>
                    <div
                      className={styles.userAvatar}
                      style={{
                        background: `linear-gradient(135deg, ${getRoleColor(user.role)} 0%, ${getRoleColor(user.role)}80 100%)`,
                      }}
                    >
                      {user.avatar || user.name?.charAt(0) || "U"}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={styles.roleBadge}
                    style={{
                      background: `${getRoleColor(user.role)}20`,
                      color: getRoleColor(user.role),
                      border: `1px solid ${getRoleColor(user.role)}40`,
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: `${getStatusColor(user.status)}20`,
                      color: getStatusColor(user.status),
                      border: `1px solid ${getStatusColor(user.status)}40`,
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.progressInfo}>
                    <div className={styles.progressItem}>
                      <FiBook />
                      <span>{user.enrolledCourses || 0} enrolled</span>
                    </div>
                    <div className={styles.progressItem}>
                      <FiAward />
                      <span>{user.competencies || 0} competencies</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.lastActive}>
                    <FiClock />
                    <span>
                      {user.lastActive
                        ? new Date(user.lastActive).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEditUser(user)}
                      title="Edit user"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete user"
                    >
                      <FiTrash2 />
                    </button>
                    <div className={styles.moreActions}>
                      <button className={styles.moreBtn}>
                        <FiMoreVertical />
                      </button>
                      <div className={styles.moreDropdown}>
                        <button
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          <FiUserCheck /> Activate
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(user.id, "suspended")
                          }
                        >
                          <FiUserX /> Suspend
                        </button>
                        <button>
                          <FiEye /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>
            <FiUsers className={styles.emptyIcon} />
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setSelectedUserId(null); // Clear selection on page change
            }}
          >
            Previous
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ""}`}
                onClick={() => {
                  setCurrentPage(page);
                  setSelectedUserId(null); // Clear selection on page change
                }}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setSelectedUserId(null); // Clear selection on page change
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <AddEditUserModal
          user={editingUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingUser(null);
          }}
          onSave={async (userData) => {
            try {
              if (editingUser) {
                // Edit existing user
                const response = await fetch(
                  `http://localhost:8000/auth/users/${editingUser.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(userData),
                  },
                );

                if (response.ok) {
                  const updatedUser = await response.json();
                  setUsers(
                    users.map((u) =>
                      u.id === editingUser.id ? { ...u, ...updatedUser } : u,
                    ),
                  );
                }
              } else {
                // Add new user
                const response = await fetch(
                  "http://localhost:8000/auth/users",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(userData),
                  },
                );

                if (response.ok) {
                  const newUser = await response.json();
                  setUsers([
                    ...users,
                    {
                      ...newUser,
                      id: newUser.id || newUser._id || users.length + 1,
                      avatar: newUser.name?.charAt(0) || "U",
                      enrolledCourses: 0,
                      competencies: 0,
                      lastActive: new Date().toISOString(),
                    },
                  ]);
                }
              }
              setShowAddModal(false);
              setEditingUser(null);
              setSelectedUserId(null); // Clear selection after save
            } catch (error) {
              console.error("Error saving user:", error);
              alert("Failed to save user. Please try again.");
            }
          }}
        />
      )}
    </div>
  );
}

// Add/Edit User Modal Component
function AddEditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "student",
    status: user?.status || "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{user ? "Edit User" : "Add New User"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="Enter email address"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {user ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersPage;
