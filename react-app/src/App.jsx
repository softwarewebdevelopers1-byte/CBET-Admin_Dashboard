import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./others/error.jsx";
import UsersPage from "./components/users.jsx";
import Dashboard from "./components/dashboard.jsx";
import AdminDashboard from "./components/homepage.jsx";
import LoginPage from "./components/login.jsx";
import AdminCourses from "./components/courses.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <Dashboard>
              <AdminDashboard />
            </Dashboard>
          }
        />
        <Route
          path="/users"
          element={
            <Dashboard>
              <UsersPage />
            </Dashboard>
          }
        />
        <Route
          path="/courses"
          element={
            <Dashboard>
              <AdminCourses />
            </Dashboard>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
