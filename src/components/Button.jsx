import React from "react";
import styles from "./Button.module.css";

export default function Button({ activity, children }) {
  console.log(activity);
  return (
    <button
      className={` ${styles["submit-btn-style"]} ${
        activity ? styles["disabled-btn"] : ""
      }`}
      type="submit"
      disabled={activity}
    >
      {children}
    </button>
  );
}
