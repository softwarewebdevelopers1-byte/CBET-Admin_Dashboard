import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/error.module.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.errorTitle}>Page Not Found</h1>

        <p className={styles.errorMessage}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.errorActions}>
          <button onClick={() => navigate(-1)} className={styles.secondaryBtn}>
            ← Go Back
          </button>

          <button onClick={() => navigate("/")} className={styles.primaryBtn}>
            Go to Dashboard
          </button>
        </div>

        <div className={styles.errorHelp}>
          <p>
            Need assistance? <a href="/support">Contact Support</a>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.errorDecoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
}

export default ErrorPage;
