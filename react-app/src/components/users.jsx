// UsersPage.jsx
import React, { useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiAward,
  FiBook,
  FiClock,
  FiDownload,
  FiUpload,
  FiX,
  FiCheck,
  FiEye,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import styles from "../styles/usersPage.module.css";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234-567-8901",
      role: "student",
      status: "active",
      avatar: "JD",
      enrolledCourses: 4,
      completedCourses: 2,
      competencies: 8,
      lastActive: "2024-01-15T10:30:00",
      joinDate: "2023-09-01",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@example.com",
      phone: "+1 234-567-8902",
      role: "instructor",
      status: "active",
      avatar: "SS",
      enrolledCourses: 0,
      completedCourses: 0,
      competencies: 15,
      lastActive: "2024-01-16T09:15:00",
      joinDate: "2023-08-15",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 234-567-8903",
      role: "student",
      status: "inactive",
      avatar: "MJ",
      enrolledCourses: 2,
      completedCourses: 1,
      competencies: 3,
      lastActive: "2024-01-10T14:20:00",
      joinDate: "2023-10-10",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      phone: "+1 234-567-8904",
      role: "student",
      status: "active",
      avatar: "EB",
      enrolledCourses: 3,
      completedCourses: 3,
      competencies: 12,
      lastActive: "2024-01-16T11:45:00",
      joinDate: "2023-07-22",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 234-567-8905",
      role: "admin",
      status: "active",
      avatar: "DW",
      enrolledCourses: 0,
      completedCourses: 0,
      competencies: 20,
      lastActive: "2024-01-16T08:30:00",
      joinDate: "2023-06-05",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "+1 234-567-8906",
      role: "instructor",
      status: "active",
      avatar: "LA",
      enrolledCourses: 0,
      completedCourses: 0,
      competencies: 18,
      lastActive: "2024-01-15T16:20:00",
      joinDate: "2023-08-30",
    },
    {
      id: 7,
      name: "Tom Martinez",
      email: "tom.martinez@example.com",
      phone: "+1 234-567-8907",
      role: "student",
      status: "suspended",
      avatar: "TM",
      enrolledCourses: 1,
      completedCourses: 0,
      competencies: 2,
      lastActive: "2024-01-05T13:10:00",
      joinDate: "2023-11-15",
    },
    {
      id: 8,
      name: "Rachel Lee",
      email: "rachel.lee@example.com",
      phone: "+1 234-567-8908",
      role: "student",
      status: "active",
      avatar: "RL",
      enrolledCourses: 5,
      completedCourses: 2,
      competencies: 6,
      lastActive: "2024-01-16T10:00:00",
      joinDate: "2023-09-20",
    },
  ]);

  // Filter options
  const roles = ["all", "student", "instructor", "admin"];
  const statuses = ["all", "active", "inactive", "suspended"];

  // Filter users based on search, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  // Handle user selection
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    }
  };

  // Handle user actions
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} users?`,
      )
    ) {
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  // Get role badge color
  const getRoleColor = (role) => {
    switch (role) {
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
    switch (status) {
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
            <span className={styles.statValue}>{JSON.parse(localStorage.getItem("userCount")) || 0}</span>
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
              {users.reduce((acc, user) => acc + user.competencies, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <FiFilter className={styles.filterIcon} />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className={styles.filterSelect}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role === "all"
                  ? "All Roles"
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.filterSelect}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.selectedCount}>
            {selectedUsers.length} user(s) selected
          </span>
          <button className={styles.bulkDeleteBtn} onClick={handleBulkDelete}>
            <FiTrash2 />
            Delete Selected
          </button>
          <button className={styles.bulkActionBtn}>
            <FiLock />
            Suspend
          </button>
          <button className={styles.bulkActionBtn}>
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
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length === paginatedUsers.length &&
                    paginatedUsers.length > 0
                  }
                  onChange={toggleAllUsers}
                  className={styles.checkbox}
                />
              </th>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className={styles.checkbox}
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
                      {user.avatar}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactItem}>
                      <FiMail /> {user.email}
                    </span>
                    <span className={styles.contactItem}>
                      <FiPhone /> {user.phone}
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    className={styles.roleBadge}
                    style={{
                      background: `${getRoleColor(user.role)}20`,
                      color: getRoleColor(user.role),
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
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.progressInfo}>
                    <div className={styles.progressItem}>
                      <FiBook />
                      <span>{user.enrolledCourses} enrolled</span>
                    </div>
                    <div className={styles.progressItem}>
                      <FiAward />
                      <span>{user.competencies} competencies</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.lastActive}>
                    <FiClock />
                    <span>
                      {new Date(user.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td>
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
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
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
          onSave={(userData) => {
            if (editingUser) {
              // Edit existing user
              setUsers(
                users.map((u) =>
                  u.id === editingUser.id ? { ...u, ...userData } : u,
                ),
              );
            } else {
              // Add new user
              const newUser = {
                id: users.length + 1,
                ...userData,
                avatar: userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join(""),
                enrolledCourses: 0,
                completedCourses: 0,
                competencies: 0,
                lastActive: new Date().toISOString(),
                joinDate: new Date().toISOString().split("T")[0],
              };
              setUsers([...users, newUser]);
            }
            setShowAddModal(false);
            setEditingUser(null);
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
