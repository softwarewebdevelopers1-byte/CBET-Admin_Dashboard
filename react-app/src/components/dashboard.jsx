import { useState } from "react";
import SideBar from "./sidebar.jsx";

function Dashboard({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`dashboard-layout ${isCollapsed ? "collapsed" : ""}`}>
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="dashboard-content">{children}</div>
    </div>
  );
}

export default Dashboard;
