// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
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
import styles from "../styles/adminDashboard.module.css";

function AdminDashboard() {
  const [count, resetCount] = useState(0);
  const [timeRange, setTimeRange] = useState("week");
  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:8000/api/count/log/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      resetCount(data.count);
    })();
  }, []);

  // Sample data for statistics
  const statsData = [
    {
      title: "Total Users",
      value: count.toString(),
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
    <div className={styles.adminDashboard}>
      {/* Header Section */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>
          <p className={styles.dashboardSubtitle}>
            Welcome back, Admin! Here's what's happening with your CBET
            platform.
          </p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.dateRange}>
            <FiCalendar className={styles.dateIcon} />
            <select
              className={styles.dateSelect}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <button className={styles.exportBtn}>
            <FiDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              <stat.icon />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <div className={styles.statValueRow}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={`${styles.statChange} ${styles[stat.trend]}`}>
                  {stat.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.dashboardGrid}>
        {/* Course Progress Section */}
        <div className={`${styles.dashboardCard} ${styles.courseProgressCard}`}>
          <div className={styles.cardHeader}>
            <h2>Course Progress Overview</h2>
            <button className={styles.moreBtn}>
              <FiMoreVertical />
            </button>
          </div>

          <div className={styles.progressList}>
            {courseProgress.map((course, index) => (
              <div key={index} className={styles.progressItem}>
                <div className={styles.progressInfo}>
                  <span className={styles.progressCourse}>{course.name}</span>
                  <span className={styles.progressStudents}>
                    {course.students} students
                  </span>
                </div>
                <div className={styles.progressBarContainer}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.color,
                    }}
                  />
                  <span className={styles.progressPercentage}>
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <a href="/admin/courses" className={styles.viewAllLink}>
              View all courses →
            </a>
          </div>
        </div>

        {/* Competency Distribution */}
        <div className={`${styles.dashboardCard} ${styles.competencyCard}`}>
          <div className={styles.cardHeader}>
            <h2>Competency Distribution</h2>
            <button className={styles.moreBtn}>
              <FiMoreVertical />
            </button>
          </div>

          <div className={styles.competencyChart}>
            {competencyDistribution.map((item, index) => (
              <div key={index} className={styles.competencyBarItem}>
                <div className={styles.competencyBarLabel}>
                  <span>{item.level}</span>
                  <span className={styles.competencyCount}>{item.count}</span>
                </div>
                <div className={styles.competencyBarContainer}>
                  <div
                    className={styles.competencyBar}
                    style={{
                      width: `${(item.count / 156) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.competencyStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Competencies</span>
              <span className={styles.statNumber}>156</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Assessed</span>
              <span className={styles.statNumber}>89</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>In Progress</span>
              <span className={styles.statNumber}>45</span>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={`${styles.dashboardCard} ${styles.deadlinesCard}`}>
          <div className={styles.cardHeader}>
            <h2>Upcoming Deadlines</h2>
            <span className={styles.badge}>
              {upcomingDeadlines.length} pending
            </span>
          </div>

          <div className={styles.deadlinesList}>
            {upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className={`${styles.deadlineItem} ${styles[deadline.status]}`}
              >
                <div className={styles.deadlineHeader}>
                  <h3>{deadline.assessment}</h3>
                  <span
                    className={`${styles.statusBadge} ${styles[deadline.status]}`}
                  >
                    {deadline.status}
                  </span>
                </div>
                <p className={styles.deadlineCourse}>{deadline.course}</p>
                <div className={styles.deadlineMeta}>
                  <div className={styles.deadlineDate}>
                    <FiClock />
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </div>
                  <div className={styles.deadlineSubmissions}>
                    Submissions: {deadline.submissions}/{deadline.total}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <a href="/admin/assessments" className={styles.viewAllLink}>
              Manage assessments →
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${styles.dashboardCard} ${styles.activityCard}`}>
          <div className={styles.cardHeader}>
            <h2>Recent Activity</h2>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search activities..." />
            </div>
          </div>

          <div className={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div
                  className={styles.activityAvatar}
                  style={{
                    background: `linear-gradient(135deg, ${getAvatarColor(activity.type)} 0%, ${getAvatarColor(activity.type, true)} 100%)`,
                  }}
                >
                  {activity.avatar}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <strong>{activity.user}</strong> {activity.action}{" "}
                    <span className={styles.activityItemHighlight}>
                      {activity.item}
                    </span>
                  </p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <a href="/admin/analytics" className={styles.viewAllLink}>
              View all activity →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <button className={styles.actionBtn}>
            <FiUsers />
            Add New User
          </button>
          <button className={styles.actionBtn}>
            <FiBook />
            Create Course
          </button>
          <button className={styles.actionBtn}>
            <FiAward />
            Add Competency
          </button>
          <button className={styles.actionBtn}>
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
