import React from "react";
import styles from "./Button.module.css";

export default function Button({ children }) {
  return (
    <button className={styles["submit-btn-style"]} type="submit">
      {children}
    </button>
  );
}
