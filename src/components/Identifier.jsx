import React, { Fragment } from "react";
import styles from "./Identifier.module.css";

export default function Identifier() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const shadow = {
    background: "orange",
    boxShadow: "1px 1px 1px 1px #cccd",
  };
  return (
    <Fragment>
      <form
        method="post"
        onSubmit={handleSubmit}
        className={styles["form-block"]}
      >
        <label>
          {/* Identifier vous :&nbsp;&nbsp; */}
          <input name="firstName" placeholder="Entrez votre mail" />
        </label>
        <button type="submit" className={styles["identifierBtn"]}>
          s'identifier
        </button>
      </form>
    </Fragment>
  );
}
