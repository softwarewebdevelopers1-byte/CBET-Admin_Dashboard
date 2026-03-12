import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiTrash2,
  FiUserCheck,
  FiUserX,
  FiAward,
  FiBook,
  FiClock,
} from "react-icons/fi";
import styles from "../styles/usersPage.module.css";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStudents, setActiveStudents] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/find/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const usersArray = data.Users || data.users || data || [];

      // Calculate stats
      let active = 0;
      let inactive = 0;

      usersArray.forEach((user) => {
        if (user.role === "Student") {
          if (user.account_state === "Active") active++;
          else if (user.account_state === "Inactive") inactive++;
        }
      });

      setActiveStudents(active);
      setInactiveUsers(inactive);

      // Map backend data to frontend structure
      const mappedUsers = usersArray.map((user, index) => ({
        email: user.email || "",
        name: user.name || user.email || "Unknown User",
        role: user.role || "student",
        status: user.account_state || user.status || "active",
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

  // Filter users based on search
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

  // DELETE FUNCTION - Only action available
  const handleDeleteUser = async (userEmail) => {
    if (
      window.confirm(
        `Are you sure you want to delete user with email: ${userEmail}?`,
      )
    ) {
      try {
        console.log("Deleting user with email:", userEmail);

        const response = await fetch(
          "http://localhost:8000/auth/admin/delete/user",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email: userEmail }),
          },
        );
        console.log(await response.json());

        if (response.ok) {
          setUsers(users.filter((user) => user.email !== userEmail));
          alert("User deleted successfully");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Delete failed");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
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
            View and manage users (Delete only)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Users</span>
            <span className={styles.statValue}>{users.length}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiUserCheck />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Active Students</span>
            <span className={styles.statValue}>{activeStudents}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiUserX />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Inactive Students</span>
            <span className={styles.statValue}>{inactiveUsers}</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search users by name, email, role, or status..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.email}>
                <td>
                  <div>
                    <strong>{user.name}</strong>
                    <br />
                    <small>{user.email}</small>
                  </div>
                </td>
                <td>
                  <span style={{ color: getRoleColor(user.role) }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span style={{ color: getStatusColor(user.status) }}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div>
                    <FiBook /> {user.enrolledCourses || 0} courses
                    <br />
                    <FiAward /> {user.competencies || 0} competencies
                  </div>
                </td>
                <td>
                  <FiClock />{" "}
                  {user.lastActive
                    ? new Date(user.lastActive).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {/* DELETE BUTTON - Only action */}
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    title="Delete user"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f56565",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fee2e2")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>
            <FiUsers />
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
