import React from "react";
import styles from "./SubscriptionType.module.css";

export default function SubscriptionType({ subject, active, onSubClick }) {
  const onClickHandler = () => {
    onSubClick(subject);
  };

  return (
    <div
      className={`${styles["item-block"]} ${
        active ? styles["active-status"] : ""
      }`}
      onClick={onClickHandler}
    >
      {subject}
    </div>
  );
}
