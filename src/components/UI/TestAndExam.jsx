import React, { useState, Fragment } from "react";

import styles from "./TestAndExam.module.css";
import Button from "../Button";

export default function TestAndExam({ userMail }) {
  const [typeOfStudent, setTypeOfStudent] = useState("ownStudent");
  const handleOptionChange = (event) => {
    setTypeOfStudent(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(typeOfStudent);
  };
  return (
    <Fragment>
      {!userMail && (
        <p className={styles["auth-msg"]}>
          Vueillez vous identifer avant toute soubscription
        </p>
      )}
      <form method="post" onSubmit={submitHandler}>
        <br />
        <br />
        <label className={styles["la-label"]}>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="ownStudent"
            checked={typeOfStudent === "ownStudent"}
            onChange={handleOptionChange}
          />
          &nbsp;&nbsp;Etudiant(e) à Lci-coaching
        </label>
        <br />
        <br />
        <label className={styles["la-label"]}>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="externStudent"
            checked={typeOfStudent === "externStudent"}
            onChange={handleOptionChange}
          />
          &nbsp;&nbsp;Etudiant(e) externe
        </label>
        <div className={styles["btn-content"]}>
          <Button activity={userMail ? false : true}>Valider</Button>
        </div>
      </form>
    </Fragment>
  );
}
