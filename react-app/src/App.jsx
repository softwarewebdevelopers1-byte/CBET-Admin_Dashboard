import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./others/error.jsx";
import Dashboard from "./components/dashboard.jsx";
import AdminDashboard from "./components/homepage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <AdminDashboard />
            </Dashboard>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
