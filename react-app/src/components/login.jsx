import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Check credentials based on selected role
    console.log(role);
    if (role === "admin") {
      let res = await fetch("http://localhost:8000/auth/verify/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        navigate("/admin");
      } else {
        setError("Invalid admin credentials");
      }
    } else if (role === "") {
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logoSection}>
          <h1>CBET Simulator</h1>
          <p>Competency-Based Education and Training</p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p className={styles.subtitle}>Please login to your account</p>

          {/* Role Selection */}
          <div className={styles.roleSelector}>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "admin" ? styles.active : ""}`}
              onClick={() => {
                setRole("admin");
              }}
            >
              <i className="fas fa-user-shield"></i>
              <span>Admin</span>
            </button>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "trainer" ? styles.active : ""}`}
              onClick={() => {
                setRole("trainer");
              }}
            >
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Trainer</span>
            </button>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          <div className={styles.registerLink}>
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </form>

        <div className={styles.demoCredentials}>
          <p className={styles.demoTitle}>Quick Login:</p>
          <div className={styles.demoButtons}>
            <button
              className={styles.demoBtn}
              onClick={() => setDemoCredentials("admin")}
            >
              <i className="fas fa-user-shield"></i>
              Admin
            </button>
            <button
              className={styles.demoBtn}
              onClick={() => setDemoCredentials("trainer")}
            >
              <i className="fas fa-chalkboard-teacher"></i>
              Trainer
            </button>
            <button
              className={styles.demoBtn}
              onClick={() => setDemoCredentials("student")}
            >
              <i className="fas fa-user-graduate"></i>
              Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
