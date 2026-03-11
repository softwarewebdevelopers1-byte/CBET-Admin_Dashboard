// AdminDashboard.jsx
import React, { useState } from "react";
import {
  FiUsers,
  FiBook,
  FiAward,
  FiFileText,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMoreVertical,
  FiDownload,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");

  // Sample data for statistics
  const statsData = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      trend: "up",
      icon: FiUsers,
      color: "#667eea",
      bgColor: "rgba(102, 126, 234, 0.1)",
    },
    {
      title: "Active Courses",
      value: "48",
      change: "+5.2%",
      trend: "up",
      icon: FiBook,
      color: "#38b2ac",
      bgColor: "rgba(56, 178, 172, 0.1)",
    },
    {
      title: "Competencies",
      value: "156",
      change: "+23",
      trend: "up",
      icon: FiAward,
      color: "#f6ad55",
      bgColor: "rgba(246, 173, 85, 0.1)",
    },
    {
      title: "Pending Assessments",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: FiFileText,
      color: "#fc8181",
      bgColor: "rgba(252, 129, 129, 0.1)",
    },
  ];

  // Sample recent activities
  const recentActivities = [
    {
      user: "John Doe",
      action: "completed assessment",
      item: "JavaScript Fundamentals",
      time: "5 minutes ago",
      avatar: "JD",
      type: "completion",
    },
    {
      user: "Sarah Smith",
      action: "enrolled in",
      item: "Advanced React",
      time: "25 minutes ago",
      avatar: "SS",
      type: "enrollment",
    },
    {
      user: "Mike Johnson",
      action: "submitted",
      item: "Final Project",
      time: "1 hour ago",
      avatar: "MJ",
      type: "submission",
    },
    {
      user: "Emily Brown",
      action: "earned competency",
      item: "Data Structures",
      time: "2 hours ago",
      avatar: "EB",
      type: "achievement",
    },
    {
      user: "David Wilson",
      action: "started course",
      item: "Python Basics",
      time: "3 hours ago",
      avatar: "DW",
      type: "enrollment",
    },
  ];

  // Sample upcoming deadlines
  const upcomingDeadlines = [
    {
      course: "Web Development",
      assessment: "Final Project",
      dueDate: "2024-01-25",
      submissions: 18,
      total: 32,
      status: "urgent",
    },
    {
      course: "Data Science",
      assessment: "Midterm Exam",
      dueDate: "2024-01-28",
      submissions: 12,
      total: 28,
      status: "pending",
    },
    {
      course: "UI/UX Design",
      assessment: "Portfolio Review",
      dueDate: "2024-02-01",
      submissions: 8,
      total: 21,
      status: "normal",
    },
  ];

  // Sample course progress data
  const courseProgress = [
    { name: "Web Development", progress: 75, students: 32, color: "#667eea" },
    { name: "Data Science", progress: 45, students: 28, color: "#38b2ac" },
    {
      name: "Mobile Development",
      progress: 60,
      students: 21,
      color: "#f6ad55",
    },
    { name: "UI/UX Design", progress: 30, students: 18, color: "#fc8181" },
  ];

  // Sample competency distribution
  const competencyDistribution = [
    { level: "Beginner", count: 45, color: "#fc8181" },
    { level: "Intermediate", count: 68, color: "#f6ad55" },
    { level: "Advanced", count: 32, color: "#38b2ac" },
    { level: "Expert", count: 11, color: "#667eea" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Welcome back, Admin! Here's what's happening with your CBET
            platform.
          </p>
        </div>

        <div className="header-actions">
          <div className="date-range">
            <FiCalendar className="date-icon" />
            <select
              className="date-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <button className="export-btn">
            <FiDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                <span className={`stat-change ${stat.trend}`}>
                  {stat.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Course Progress Section */}
        <div className="dashboard-card course-progress-card">
          <div className="card-header">
            <h2>Course Progress Overview</h2>
            <button className="more-btn">
              <FiMoreVertical />
            </button>
          </div>

          <div className="progress-list">
            {courseProgress.map((course, index) => (
              <div key={index} className="progress-item">
                <div className="progress-info">
                  <span className="progress-course">{course.name}</span>
                  <span className="progress-students">
                    {course.students} students
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.color,
                    }}
                  />
                  <span className="progress-percentage">
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <a href="/admin/courses" className="view-all-link">
              View all courses →
            </a>
          </div>
        </div>

        {/* Competency Distribution */}
        <div className="dashboard-card competency-card">
          <div className="card-header">
            <h2>Competency Distribution</h2>
            <button className="more-btn">
              <FiMoreVertical />
            </button>
          </div>

          <div className="competency-chart">
            {competencyDistribution.map((item, index) => (
              <div key={index} className="competency-bar-item">
                <div className="competency-bar-label">
                  <span>{item.level}</span>
                  <span className="competency-count">{item.count}</span>
                </div>
                <div className="competency-bar-container">
                  <div
                    className="competency-bar"
                    style={{
                      width: `${(item.count / 156) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="competency-stats">
            <div className="stat-item">
              <span className="stat-label">Total Competencies</span>
              <span className="stat-number">156</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Assessed</span>
              <span className="stat-number">89</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">In Progress</span>
              <span className="stat-number">45</span>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="dashboard-card deadlines-card">
          <div className="card-header">
            <h2>Upcoming Deadlines</h2>
            <span className="badge">{upcomingDeadlines.length} pending</span>
          </div>

          <div className="deadlines-list">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className={`deadline-item ${deadline.status}`}>
                <div className="deadline-header">
                  <h3>{deadline.assessment}</h3>
                  <span className={`status-badge ${deadline.status}`}>
                    {deadline.status}
                  </span>
                </div>
                <p className="deadline-course">{deadline.course}</p>
                <div className="deadline-meta">
                  <div className="deadline-date">
                    <FiClock />
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </div>
                  <div className="deadline-submissions">
                    Submissions: {deadline.submissions}/{deadline.total}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <a href="/admin/assessments" className="view-all-link">
              Manage assessments →
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search activities..." />
            </div>
          </div>

          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div
                  className="activity-avatar"
                  style={{
                    background: `linear-gradient(135deg, ${getAvatarColor(activity.type)} 0%, ${getAvatarColor(activity.type, true)} 100%)`,
                  }}
                >
                  {activity.avatar}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}{" "}
                    <span className="activity-item-highlight">
                      {activity.item}
                    </span>
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <a href="/admin/analytics" className="view-all-link">
              View all activity →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn">
            <FiUsers />
            Add New User
          </button>
          <button className="action-btn">
            <FiBook />
            Create Course
          </button>
          <button className="action-btn">
            <FiAward />
            Add Competency
          </button>
          <button className="action-btn">
            <FiFileText />
            Create Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function for avatar colors
function getAvatarColor(type, isLighter = false) {
  const colors = {
    completion: isLighter ? "#9f7aea" : "#805ad5",
    enrollment: isLighter ? "#4fd1c5" : "#319795",
    submission: isLighter ? "#f6ad55" : "#dd6b20",
    achievement: isLighter ? "#f687b3" : "#d53f8c",
  };
  return colors[type] || (isLighter ? "#a0aec0" : "#718096");
}

export default AdminDashboard;
