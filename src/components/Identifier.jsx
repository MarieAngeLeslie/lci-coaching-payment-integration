import React, { Fragment, useState } from "react";
import styles from "./Identifier.module.css";

export default function Identifier({ sendMail }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    fetch(
      `http://localhost:3000/api/find-all-lci-students?email=${inputValue}`
    ).then((response) =>
      response
        .json()
        .then((res) => res.data)
        .then((res) => {
          //   console.log(res.email);
          sendMail(res.email);
        })
    );
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
          <input
            name="firstName"
            placeholder="Entrez votre mail"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className={styles["identifierBtn"]}>
          s'identifier
        </button>
      </form>
    </Fragment>
  );
}
