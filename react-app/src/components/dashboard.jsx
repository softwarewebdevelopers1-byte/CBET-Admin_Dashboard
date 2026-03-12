// Dashboard.jsx
import { useState } from "react";
import SideBar from "./sidebar.jsx";
import styles from "../styles/dashboard.module.css";

function Dashboard({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${styles.dashboardLayout} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={styles.dashboardContent}>{children}</div>
    </div>
  );
}

export default Dashboard;
