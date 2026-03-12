// SideBar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/sidebar.module.css";

// You'll need to install react-icons if you haven't already:
// npm install react-icons

import {
  FiHome,
  FiUsers,
  FiBook,
  FiAward,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiChevronLeft,
  FiFileText,
  FiCalendar,
  FiHelpCircle,
} from "react-icons/fi";

function SideBar({ isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { path: "/admin", icon: FiHome, label: "Dashboard" },
    { path: "/users", icon: FiUsers, label: "Users" },
    { path: "/courses", icon: FiBook, label: "Courses" },
    { path: "/admin/competencies", icon: FiAward, label: "Competencies" },
    { path: "/admin/assessments", icon: FiFileText, label: "Assessments" },
    { path: "/admin/schedule", icon: FiCalendar, label: "Schedule" },
    { path: "/admin/reports", icon: FiBarChart2, label: "Reports" },
    { path: "/admin/settings", icon: FiSettings, label: "Settings" },
    { path: "/help", icon: FiHelpCircle, label: "Help" },
  ];
  let navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };
  async function logOut() {
    let res = await fetch("http://localhost:8000/auth/all/admin/logout/all", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      navigate("/");
    }
  }
  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          {!isCollapsed && (
            <>
              <span className={styles.logoText}>CBET Admin</span>
              <span className={styles.logoBadge}>v2.0</span>
            </>
          )}
          {isCollapsed && <span className={styles.logoMini}>C</span>}
        </div>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isCollapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            title={isCollapsed ? item.label : ""}
          >
            <item.icon className={styles.navIcon} />
            {!isCollapsed && (
              <span className={styles.navLabel}>{item.label}</span>
            )}
            {!isCollapsed && item.label === "Competencies" && (
              <span className={styles.navBadge}>12</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>A</div>
          {!isCollapsed && (
            <div className={styles.userDetails}>
              <span className={styles.userName}>Admin User</span>
              <span className={styles.userRole}>Super Admin</span>
            </div>
          )}
        </div>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            logOut();
          }}
          title="Logout"
        >
          <FiLogOut className={styles.logoutIcon} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
