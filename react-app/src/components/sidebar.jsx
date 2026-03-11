import { Link } from "react-router-dom";
import "../styles/sidebar.css";

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
    { path: "/", icon: FiHome, label: "Dashboard" },
    { path: "/admin/users", icon: FiUsers, label: "Users" },
    { path: "/admin/courses", icon: FiBook, label: "Courses" },
    { path: "/admin/competencies", icon: FiAward, label: "Competencies" },
    { path: "/admin/assessments", icon: FiFileText, label: "Assessments" },
    { path: "/admin/schedule", icon: FiCalendar, label: "Schedule" },
    { path: "/admin/reports", icon: FiBarChart2, label: "Reports" },
    { path: "/admin/settings", icon: FiSettings, label: "Settings" },
    { path: "/help", icon: FiHelpCircle, label: "Help" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {!isCollapsed && (
            <>
              <span className="logo-text">CBET Admin</span>
              <span className="logo-badge">v2.0</span>
            </>
          )}
          {isCollapsed && <span className="logo-mini">C</span>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="nav-link"
            title={isCollapsed ? item.label : ""}
          >
            <item.icon className="nav-icon" />
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {!isCollapsed && item.label === "Competencies" && (
              <span className="nav-badge">12</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">A</div>
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">Admin User</span>
              <span className="user-role">Super Admin</span>
            </div>
          )}
        </div>
        <button className="logout-btn" title="Logout">
          <FiLogOut className="logout-icon" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
